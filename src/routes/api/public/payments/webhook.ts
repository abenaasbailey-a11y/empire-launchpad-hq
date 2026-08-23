import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { verifyWebhook, type PaddleEnv } from "@/lib/paddle.server";

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
 * Transaction webhooks do not include the buyer's email, so look it up from the
 * Paddle customer record. Falls back to null rather than failing the webhook.
 */
async function lookupCustomerEmail(
  customerId: string | null | undefined,
  env: PaddleEnv,
): Promise<string | null> {
  if (!customerId) return null;
  try {
    const { paddleFetch } = await import("@/lib/paddle.server");
    const response = await paddleFetch(env, `/customers/${customerId}`);
    const result = (await response.json()) as { data?: { email?: string } };
    return result.data?.email ?? null;
  } catch (e) {
    console.error("Paddle webhook: customer email lookup failed", e);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleTransactionCompleted(data: any, env: PaddleEnv) {
  const item = data.items?.[0];
  const externalPriceId: string | undefined = item?.price?.import_meta?.external_id;
  const customData = data.custom_data ?? null;
  const email =
    data.customer?.email ??
    customData?.email ??
    (await lookupCustomerEmail(data.customer_id, env));

  await getSupabase()
    .from("orders")
    .upsert(
      {
        user_id: customData?.userId ?? null,
        email,
        paddle_transaction_id: data.id,
        paddle_customer_id: data.customer_id ?? null,
        product_id: item?.price?.product_id ?? null,
        price_id: externalPriceId ?? item?.price?.id ?? null,
        quantity: item?.quantity ?? 1,
        amount_cents: data.details?.totals?.total ? Number(data.details.totals.total) : null,
        currency: data.currency_code ?? "USD",
        status: "paid",
        environment: env,
        custom_data: customData,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "paddle_transaction_id" },
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionCreated(data: any, env: PaddleEnv) {
  const userId = data.custom_data?.userId;
  if (!userId) {
    console.error("Paddle webhook: no userId in custom_data, skipping subscription");
    return;
  }
  const item = data.items?.[0];
  const priceId = item?.price?.import_meta?.external_id;
  const productId = item?.product?.import_meta?.external_id;
  if (!priceId || !productId) {
    console.warn("Paddle webhook: missing importMeta.externalId, skipping subscription");
    return;
  }

  await getSupabase()
    .from("subscriptions")
    .upsert(
      {
        user_id: userId,
        paddle_subscription_id: data.id,
        paddle_customer_id: data.customer_id,
        product_id: productId,
        price_id: priceId,
        status: data.status,
        current_period_start: data.current_billing_period?.starts_at ?? null,
        current_period_end: data.current_billing_period?.ends_at ?? null,
        environment: env,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "paddle_subscription_id" },
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionUpdated(data: any, env: PaddleEnv) {
  await getSupabase()
    .from("subscriptions")
    .update({
      status: data.status,
      current_period_start: data.current_billing_period?.starts_at ?? null,
      current_period_end: data.current_billing_period?.ends_at ?? null,
      cancel_at_period_end: data.scheduled_change?.action === "cancel",
      updated_at: new Date().toISOString(),
    })
    .eq("paddle_subscription_id", data.id)
    .eq("environment", env);
}

// Business rule: access is cut off immediately on cancel, so we clear the
// period end instead of leaving a future date that would keep access alive.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionCanceled(data: any, env: PaddleEnv) {
  await getSupabase()
    .from("subscriptions")
    .update({
      status: "canceled",
      current_period_end: new Date().toISOString(),
      cancel_at_period_end: false,
      updated_at: new Date().toISOString(),
    })
    .eq("paddle_subscription_id", data.id)
    .eq("environment", env);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePaymentFailed(data: any, env: PaddleEnv) {
  if (!data.subscription_id) return;
  await getSupabase()
    .from("subscriptions")
    .update({ status: "past_due", updated_at: new Date().toISOString() })
    .eq("paddle_subscription_id", data.subscription_id)
    .eq("environment", env);
}

export const Route = createFileRoute("/api/public/payments/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const env = (url.searchParams.get("env") || "sandbox") as PaddleEnv;
        try {
          const event = await verifyWebhook(request, env);
          switch (event.event_type) {
            case "transaction.completed":
              await handleTransactionCompleted(event.data, env);
              break;
            case "subscription.created":
              await handleSubscriptionCreated(event.data, env);
              break;
            case "subscription.updated":
              await handleSubscriptionUpdated(event.data, env);
              break;
            case "subscription.canceled":
              await handleSubscriptionCanceled(event.data, env);
              break;
            case "transaction.payment_failed":
              await handlePaymentFailed(event.data, env);
              break;
            default:
              console.log("Unhandled Paddle event:", event.event_type);
          }
          return Response.json({ received: true });
        } catch (e) {
          console.error("Paddle webhook error:", e);
          return new Response("Webhook error", { status: 400 });
        }
      },
    },
  },
});
