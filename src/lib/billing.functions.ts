import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Subscriptions + purchase history for the signed-in member, scoped to one environment. */
export const getMyBilling = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { environment: "sandbox" | "live" }) => ({
    environment: input?.environment === "live" ? ("live" as const) : ("sandbox" as const),
  }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const [subs, orders] = await Promise.all([
      supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .eq("environment", data.environment)
        .order("created_at", { ascending: false }),
      supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .eq("environment", data.environment)
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

    return {
      subscriptions: subs.data ?? [],
      orders: orders.data ?? [],
    };
  });

/** Creates a hosted billing portal link so the member can cancel or update their card. */
export const createBillingPortalLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { environment: "sandbox" | "live"; returnUrl?: string }) => ({
    environment: input?.environment === "live" ? ("live" as const) : ("sandbox" as const),
    returnUrl:
      typeof input?.returnUrl === "string" && /^https?:\/\//.test(input.returnUrl)
        ? input.returnUrl.slice(0, 500)
        : undefined,
  }))
  .handler(async ({ data, context }): Promise<{ url: string }> => {
    const { openBillingPortal } = await import("@/lib/billing.server");
    return openBillingPortal(
      context.supabase,
      context.userId,
      data.environment,
      data.returnUrl,
    );
  });

/** Looks up a just-completed order by its payment reference so the success page can prefill intake. */
export const getOrderByTransaction = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { transactionId: string }) => ({
    transactionId: String(input?.transactionId ?? "").trim().slice(0, 120),
  }))
  .handler(async ({ data, context }) => {
    if (!data.transactionId) return null;
    const { data: order } = await context.supabase
      .from("orders")
      .select("id, price_id, amount_cents, currency, custom_data, email, created_at")
      .eq("paddle_transaction_id", data.transactionId)
      .maybeSingle();
    return order ?? null;
  });

/** Admin-only view of every paid order and subscription in one environment. */
export const getAllBilling = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { environment: "sandbox" | "live" }) => ({
    environment: input?.environment === "live" ? ("live" as const) : ("sandbox" as const),
  }))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const [orders, subs, requests] = await Promise.all([
      supabase
        .from("orders")
        .select("*")
        .eq("environment", data.environment)
        .order("created_at", { ascending: false })
        .limit(200),
      supabase
        .from("subscriptions")
        .select("*")
        .eq("environment", data.environment)
        .order("created_at", { ascending: false })
        .limit(200),
      supabase
        .from("service_requests")
        .select("id, name, email, service_type, status, order_id, created_at")
        .order("created_at", { ascending: false })
        .limit(200),
    ]);

    return {
      orders: orders.data ?? [],
      subscriptions: subs.data ?? [],
      requests: requests.data ?? [],
    };
  });
