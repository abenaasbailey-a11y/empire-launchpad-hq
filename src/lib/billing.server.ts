import { type StripeEnv, createStripeClient, getStripeErrorMessage } from "@/lib/stripe.server";

type AnySupabase = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from: (table: string) => any;
};

/**
 * Creates a hosted billing portal session for the member's most recent
 * subscription (or, failing that, their most recent one-time order's customer).
 * The `paddle_customer_id` columns now hold the Stripe customer ID.
 */
export async function openBillingPortal(
  supabase: AnySupabase,
  userId: string,
  environment: StripeEnv,
  returnUrl?: string,
): Promise<{ url: string }> {
  const { data: subs } = await supabase
    .from("subscriptions")
    .select("paddle_customer_id, created_at")
    .eq("user_id", userId)
    .eq("environment", environment)
    .order("created_at", { ascending: false })
    .limit(5);

  let customerId: string | null = subs?.[0]?.paddle_customer_id ?? null;

  if (!customerId) {
    const { data: orders } = await supabase
      .from("orders")
      .select("paddle_customer_id, created_at")
      .eq("user_id", userId)
      .eq("environment", environment)
      .not("paddle_customer_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(1);
    customerId = orders?.[0]?.paddle_customer_id ?? null;
  }

  if (!customerId) {
    throw new Error("We could not find a billing profile for your account yet.");
  }

  try {
    const stripe = createStripeClient(environment);
    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      ...(returnUrl ? { return_url: returnUrl } : {}),
    });
    return { url: portal.url };
  } catch (error) {
    throw new Error(getStripeErrorMessage(error));
  }
}
