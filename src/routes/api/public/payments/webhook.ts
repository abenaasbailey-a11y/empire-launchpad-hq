import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { verifyWebhook, type StripeEnv } from "@/lib/stripe.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _supabase: any = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env["SUPABASE_URL"]!,
      process.env["SUPABASE_SERVICE_ROLE_KEY"]!,
    );
  }
  return _supabase;
}

/**
 * Human-readable price ID. `lookup_key` is stable across test and live; the
 * metadata fallback covers prices created before lookup keys were set.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function externalPriceId(price: any): string | null {
  return price?.lookup_key ?? price?.metadata?.lovable_external_id ?? price?.id ?? null;
}

function isoFromUnix(seconds: number | null | undefined): string | null {
  return seconds ? new Date(seconds * 1000).toISOString() : null;
}

/** Records a paid checkout. Renewals are attributed via the subscription row. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCheckoutCompleted(session: any, env: StripeEnv) {
  if (session.payment_status === "unpaid") return;

  const metadata = session.metadata ?? null;
  let userId: string | null = metadata?.userId ?? null;

  if (!userId && session.subscription) {
    const { data: sub } = await getSupabase()
      .from("subscriptions")
      .select("user_id")
      .eq("paddle_subscription_id", session.subscription)
      .eq("environment", env)
      .maybeSingle();
    userId = sub?.user_id ?? null;
  }

  let priceId: string | null = null;
  let productId: string | null = null;
  let quantity = 1;
  try {
    const { createStripeClient } = await import("@/lib/stripe.server");
    const stripe = createStripeClient(env);
    const items = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 1,
      expand: ["data.price"],
    });
    const line = items.data[0];
    priceId = externalPriceId(line?.price);
    const product = line?.price?.product;
    productId = typeof product === "string" ? product : (product?.id ?? null);
    quantity = line?.quantity ?? 1;
  } catch (e) {
    console.error("Payments webhook: line item lookup failed", e);
  }

  await getSupabase()
    .from("orders")
    .upsert(
      {
        user_id: userId,
        email: session.customer_details?.email ?? session.customer_email ?? null,
        paddle_transaction_id: session.id,
        paddle_customer_id:
          typeof session.customer === "string" ? session.customer : (session.customer?.id ?? null),
        product_id: productId,
        price_id: priceId,
        quantity,
        amount_cents: typeof session.amount_total === "number" ? session.amount_total : null,
        currency: (session.currency ?? "usd").toUpperCase(),
        status: "paid",
        environment: env,
        custom_data: metadata,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "paddle_transaction_id" },
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function upsertSubscription(subscription: any, env: StripeEnv) {
  const userId = subscription.metadata?.userId;
  if (!userId) {
    console.error("Payments webhook: no userId in subscription metadata");
    return;
  }
  const item = subscription.items?.data?.[0];
  const priceId = externalPriceId(item?.price);
  const product = item?.price?.product;
  const productId = typeof product === "string" ? product : (product?.id ?? null);
  const periodStart = item?.current_period_start ?? subscription.current_period_start;
  const periodEnd = item?.current_period_end ?? subscription.current_period_end;

  await getSupabase()
    .from("subscriptions")
    .upsert(
      {
        user_id: userId,
        paddle_subscription_id: subscription.id,
        paddle_customer_id:
          typeof subscription.customer === "string"
            ? subscription.customer
            : (subscription.customer?.id ?? null),
        product_id: productId,
        price_id: priceId,
        status: subscription.status,
        current_period_start: isoFromUnix(periodStart),
        current_period_end: isoFromUnix(periodEnd),
        cancel_at_period_end: subscription.cancel_at_period_end ?? false,
        environment: env,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "paddle_subscription_id" },
    );
}

// Business rule: access is cut off immediately on cancel, so we clear the
// period end instead of leaving a future date that would keep access alive.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionDeleted(subscription: any, env: StripeEnv) {
  await getSupabase()
    .from("subscriptions")
    .update({
      status: "canceled",
      current_period_end: new Date().toISOString(),
      cancel_at_period_end: false,
      updated_at: new Date().toISOString(),
    })
    .eq("paddle_subscription_id", subscription.id)
    .eq("environment", env);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleInvoicePaymentFailed(invoice: any, env: StripeEnv) {
  const subscriptionId =
    typeof invoice.subscription === "string" ? invoice.subscription : invoice.subscription?.id;
  if (!subscriptionId) return;
  await getSupabase()
    .from("subscriptions")
    .update({ status: "past_due", updated_at: new Date().toISOString() })
    .eq("paddle_subscription_id", subscriptionId)
    .eq("environment", env);
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawEnv = new URL(request.url).searchParams.get("env");
        if (rawEnv !== "sandbox" && rawEnv !== "live") {
          console.error("Payments webhook: invalid env query parameter", rawEnv);
          return Response.json({ received: true, ignored: "invalid env" });
        }
        const env: StripeEnv = rawEnv;
        try {
          const event = await verifyWebhook(request, env);
          switch (event.type) {
            case "checkout.session.completed":
            case "checkout.session.async_payment_succeeded":
              await handleCheckoutCompleted(event.data.object, env);
              break;
            case "customer.subscription.created":
            case "customer.subscription.updated":
              await upsertSubscription(event.data.object, env);
              break;
            case "customer.subscription.deleted":
              await handleSubscriptionDeleted(event.data.object, env);
              break;
            case "invoice.payment_failed":
              await handleInvoicePaymentFailed(event.data.object, env);
              break;
            default:
              console.log("Unhandled payments event:", event.type);
          }
          return Response.json({ received: true });
        } catch (e) {
          console.error("Payments webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
