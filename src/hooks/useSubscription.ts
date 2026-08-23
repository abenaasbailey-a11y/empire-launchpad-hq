import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getPaddleEnvironment } from "@/lib/paddle";
import { getMyBilling } from "@/lib/billing.functions";

export type BillingSubscription = {
  id: string;
  paddle_subscription_id: string;
  product_id: string;
  price_id: string;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
};

export type BillingOrder = {
  id: string;
  paddle_transaction_id: string;
  price_id: string | null;
  amount_cents: number | null;
  currency: string;
  status: string;
  created_at: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom_data: any;
};

function isLive(sub: BillingSubscription | undefined): boolean {
  if (!sub) return false;
  const ends = sub.current_period_end ? new Date(sub.current_period_end).getTime() : null;
  if (sub.status === "active" || sub.status === "trialing" || sub.status === "past_due") {
    return ends === null || ends > Date.now();
  }
  return false;
}

/**
 * Reads the signed-in member's subscription + purchase history for the current
 * payment environment (test in preview, live in production).
 */
export function useSubscription() {
  const environment = getPaddleEnvironment();
  const fetchBilling = useServerFn(getMyBilling);

  const query = useQuery({
    queryKey: ["billing", environment],
    queryFn: () => fetchBilling({ data: { environment } }),
    staleTime: 30_000,
  });

  const subscriptions = (query.data?.subscriptions ?? []) as unknown as BillingSubscription[];
  const orders = (query.data?.orders ?? []) as unknown as BillingOrder[];
  const subscription = subscriptions[0];

  return {
    isLoading: query.isLoading,
    refetch: query.refetch,
    environment,
    subscription,
    subscriptions,
    orders,
    isActive: isLive(subscription),
    isPastDue: subscription?.status === "past_due",
    isCanceling: Boolean(subscription?.cancel_at_period_end),
  };
}
