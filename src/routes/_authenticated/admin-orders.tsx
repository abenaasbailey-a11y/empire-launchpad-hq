import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/landing/Section";
import { useIsAdmin } from "@/hooks/use-admin";
import { getPaddleEnvironment } from "@/lib/paddle";
import { getAllBilling } from "@/lib/billing.functions";

export const Route = createFileRoute("/_authenticated/admin-orders")({
  component: AdminOrders,
  head: () => ({
    meta: [
      { title: "Orders & Subscriptions — Her Empire Era Admin" },
      {
        name: "description",
        content: "Admin-only view of every paid order, subscription, and project intake request.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatMoney(cents: number | null, currency: string): string {
  if (cents === null || cents === undefined) return "—";
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(cents / 100);
}

function AdminOrders() {
  const { isAdmin, isLoading: adminLoading } = useIsAdmin();
  const environment = getPaddleEnvironment();
  const fetchAll = useServerFn(getAllBilling);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-billing", environment],
    queryFn: () => fetchAll({ data: { environment } }),
    enabled: isAdmin,
  });

  if (adminLoading) {
    return (
      <main className="bg-background min-h-screen">
        <Section>
          <p className="text-muted-foreground text-sm">Checking your access…</p>
        </Section>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="bg-background min-h-screen">
        <Section>
          <h1 className="font-display text-3xl font-light">Admins only</h1>
          <p className="text-muted-foreground mt-4 text-sm">
            This page is restricted to administrators.
          </p>
          <Button variant="lux" className="mt-8" asChild>
            <Link to="/dashboard">Back to dashboard</Link>
          </Button>
        </Section>
      </main>
    );
  }

  const orders = data?.orders ?? [];
  const subs = data?.subscriptions ?? [];
  const requests = data?.requests ?? [];
  const revenue = orders.reduce((sum, o) => sum + (o.amount_cents ?? 0), 0);
  const requestByOrder = new Map(requests.filter((r) => r.order_id).map((r) => [r.order_id, r]));

  return (
    <main className="bg-background min-h-screen">
      <Section>
        <p className="eyebrow eyebrow-blush">Admin only</p>
        <h1 className="font-display heading-glow mt-5 text-4xl leading-[1.08] font-light md:text-5xl">
          Orders & subscriptions
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-[0.95rem] leading-relaxed">
          Showing {environment === "sandbox" ? "test" : "live"} payments. The preview always shows
          test data; the published site shows live data.
        </p>

        {isLoading ? (
          <p className="text-muted-foreground mt-10 text-sm">Loading payments…</p>
        ) : (
          <>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Paid orders", value: String(orders.length) },
                { label: "Subscriptions", value: String(subs.length) },
                { label: "Revenue", value: formatMoney(revenue, orders[0]?.currency ?? "USD") },
              ].map((stat) => (
                <div key={stat.label} className="border-border bg-card/50 rounded-2xl border p-5">
                  <p className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                    {stat.label}
                  </p>
                  <p className="font-display text-gold mt-2 text-2xl font-light">{stat.value}</p>
                </div>
              ))}
            </div>

            <h2 className="font-display mt-14 text-2xl font-light">Orders</h2>
            {orders.length === 0 ? (
              <p className="text-muted-foreground mt-3 text-sm">No orders yet.</p>
            ) : (
              <ul className="border-border mt-4 divide-y rounded-2xl border">
                {orders.map((order) => {
                  const intake = order.id ? requestByOrder.get(order.id) : undefined;
                  return (
                    <li key={order.id} className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-card-foreground text-sm">
                            {order.price_id ?? "Unknown item"}
                          </p>
                          <p className="text-muted-foreground mt-1 text-xs break-all">
                            {order.email ?? "no email"} · {formatDate(order.created_at)}
                          </p>
                        </div>
                        <span className="text-gold text-sm">
                          {formatMoney(order.amount_cents, order.currency)}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-2 text-xs">
                        {order.user_id ? "Linked to a member account" : "Guest purchase"} ·{" "}
                        {intake ? "Project details received" : "Awaiting project details"}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}

            <h2 className="font-display mt-14 text-2xl font-light">Subscriptions</h2>
            {subs.length === 0 ? (
              <p className="text-muted-foreground mt-3 text-sm">No subscriptions yet.</p>
            ) : (
              <ul className="border-border mt-4 divide-y rounded-2xl border">
                {subs.map((sub) => (
                  <li key={sub.id} className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-card-foreground text-sm">{sub.price_id}</p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          Renews {formatDate(sub.current_period_end)}
                          {sub.cancel_at_period_end ? " · cancels at period end" : ""}
                        </p>
                      </div>
                      <span className="bg-gold/15 text-gold rounded-full px-3 py-1 text-[0.6rem] tracking-[0.14em] uppercase">
                        {sub.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <h2 className="font-display mt-14 text-2xl font-light">Project intake requests</h2>
            {requests.length === 0 ? (
              <p className="text-muted-foreground mt-3 text-sm">No requests yet.</p>
            ) : (
              <ul className="border-border mt-4 divide-y rounded-2xl border">
                {requests.map((req) => (
                  <li key={req.id} className="flex flex-wrap justify-between gap-3 p-5">
                    <div>
                      <p className="text-card-foreground text-sm">
                        {req.name} — {req.service_type}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs break-all">
                        {req.email} · {formatDate(req.created_at)}
                      </p>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {req.order_id ? "Paid" : "Enquiry"} · {req.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <Button variant="lux" className="mt-14" asChild>
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>
      </Section>
    </main>
  );
}
