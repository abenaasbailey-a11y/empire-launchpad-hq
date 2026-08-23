import { gatewayFetch, type PaddleEnv } from "@/lib/paddle.server";

type AnySupabase = {
  from: (table: string) => any;
};

/**
 * Creates a Paddle-hosted customer portal session for the member's most recent
 * subscription (or, failing that, their most recent one-time order's customer).
 */
export async function openBillingPortal(
  supabase: AnySupabase,
  userId: string,
  environment: PaddleEnv,
): Promise<{ url: string }> {
  const { data: subs } = await supabase
    .from("subscriptions")
    .select("paddle_customer_id, paddle_subscription_id, created_at")
    .eq("user_id", userId)
    .eq("environment", environment)
    .order("created_at", { ascending: false })
    .limit(5);

  let customerId: string | null = subs?.[0]?.paddle_customer_id ?? null;
  const subscriptionIds: string[] = (subs ?? [])
    .map((s: { paddle_subscription_id: string }) => s.paddle_subscription_id)
    .filter(Boolean);

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

  const response = await gatewayFetch(environment, `/customers/${customerId}/portal-sessions`, {
    method: "POST",
    body: JSON.stringify(subscriptionIds.length ? { subscription_ids: subscriptionIds } : {}),
  });

  if (!response.ok) {
    console.error("[billing] portal session failed", response.status, await response.text());
    throw new Error("We could not open your billing portal just now. Please try again.");
  }

  const result = (await response.json()) as {
    data?: { urls?: { general?: { overview?: string } } };
  };
  const url = result.data?.urls?.general?.overview;
  if (!url) throw new Error("We could not open your billing portal just now. Please try again.");
  return { url };
}
