import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, CreditCard, ExternalLink, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import { createBillingPortalLink } from "@/lib/billing.functions";
import { Link } from "@tanstack/react-router";

const PLAN_NAMES: Record<string, string> = {
  // Current plans.
  empire_member_monthly: "Empire Member — Monthly",
  empire_elite_monthly: "Empire Elite — Monthly",
  empire_vip_monthly: "Empire VIP — Monthly",
  // Retired plans, kept so existing subscription and order rows still label correctly.
  empire_membership_monthly: "Her Empire Era Membership — Monthly",
  empire_membership_annual: "Her Empire Era Membership — Annual",
};

function planName(priceId: string | null | undefined): string {
  if (!priceId) return "Purchase";
  return PLAN_NAMES[priceId] ?? priceId.replace(/_/g, " ");
}

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatMoney(cents: number | null, currency: string): string {
  if (cents === null || cents === undefined) return "—";
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(cents / 100);
}

const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  trialing: "Free trial",
  past_due: "Payment failed",
  paused: "Paused",
  canceled: "Canceled",
};

/** Member-facing billing and purchase history, with a link to the hosted billing portal. */
export function BillingPanel() {
  const { subscription, orders, isLoading, isActive, isPastDue, isCanceling, environment } =
    useSubscription();
  const createPortal = useServerFn(createBillingPortalLink);
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasBilling = Boolean(subscription) || orders.length > 0;

  const openPortal = async () => {
    setOpening(true);
    setError(null);
    try {
      const { url } = await createPortal({ data: { environment } });
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "We could not open your billing portal just now.",
      );
    } finally {
      setOpening(false);
    }
  };

  if (isLoading) {
    return (
      <div className="border-border bg-card/50 mt-12 rounded-2xl border p-6 backdrop-blur-sm md:mt-16 md:p-8">
        <p className="text-muted-foreground text-sm">Loading your billing…</p>
      </div>
    );
  }

  if (!hasBilling) {
    return (
      <div className="border-border bg-card/50 mt-12 rounded-2xl border p-6 backdrop-blur-sm md:mt-16 md:p-8">
        <p className="eyebrow eyebrow-blush">Billing & account</p>
        <h2 className="font-display mt-4 text-2xl font-light">You're on the free plan</h2>
        <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
          No card on file and nothing to manage yet. Become a member for the full Prompt Vault,
          unlimited Empire Builder AI and Victoria's weekly picks — cancel anytime from this panel.
        </p>
        <div className="mt-6">
          <Button variant="gold" asChild>
            <Link to="/membership">See membership — $19.99/mo</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-border bg-card/50 mt-12 rounded-2xl border p-6 backdrop-blur-sm md:mt-16 md:p-8">
      <p className="eyebrow eyebrow-blush">Billing & account</p>
      <h2 className="font-display mt-4 text-2xl font-light">Your plan and purchases</h2>

      {isPastDue ? (
        <div className="border-blush/40 bg-blush/10 mt-6 flex gap-3 rounded-xl border p-4">
          <AlertTriangle className="text-blush mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-card-foreground/90 text-sm leading-relaxed">
            Your last payment did not go through. Update your card in the billing portal to keep
            your subscription running — we retry automatically for a few days.
          </p>
        </div>
      ) : null}

      {subscription ? (
        <div className="border-border mt-6 rounded-xl border p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-card-foreground text-sm font-medium">
                {planName(subscription.price_id)}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                {STATUS_LABEL[subscription.status] ?? subscription.status}
                {isCanceling ? " — ends at period end" : ""}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-[0.6rem] tracking-[0.14em] uppercase ${
                isActive ? "bg-gold/15 text-gold" : "bg-muted text-muted-foreground"
              }`}
            >
              {isActive ? "Access on" : "Access off"}
            </span>
          </div>
          <div className="text-muted-foreground mt-4 grid gap-2 text-xs sm:grid-cols-2">
            <p>Current period started {formatDate(subscription.current_period_start)}</p>
            <p>
              {isCanceling ? "Access ends" : "Renews"}{" "}
              {formatDate(subscription.current_period_end)}
            </p>
          </div>
        </div>
      ) : null}

      {orders.length ? (
        <div className="mt-6">
          <p className="text-card-foreground flex items-center gap-2 text-sm font-medium">
            <Receipt className="text-blush h-4 w-4" /> Purchase history
          </p>
          <ul className="border-border mt-3 divide-y rounded-xl border">
            {orders.map((order) => (
              <li key={order.id} className="flex flex-wrap items-center justify-between gap-2 p-4">
                <div>
                  <p className="text-card-foreground text-sm">{planName(order.price_id)}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    {formatDate(order.created_at)} · {order.status}
                  </p>
                </div>
                <span className="text-gold text-sm">
                  {formatMoney(order.amount_cents, order.currency)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button variant="lux" size="sm" onClick={openPortal} disabled={opening}>
          <CreditCard className="mr-2 h-4 w-4" />
          {opening ? "Opening…" : "Manage billing"}
          <ExternalLink className="ml-2 h-3.5 w-3.5" />
        </Button>
        <p className="text-muted-foreground text-xs">
          Cancel, update your card, or download invoices. Opens in a new tab.
        </p>
      </div>
      {error ? <p className="text-blush mt-3 text-xs">{error}</p> : null}
    </div>
  );
}
