import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Check, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getOrderByTransaction } from "@/lib/billing.functions";
import { captureServiceRequest, servicesList } from "@/lib/service-requests.functions";

const TITLE = "Payment Confirmed — Her Empire Era";
const DESCRIPTION =
  "Your payment is confirmed. Tell us about your project so we can start right away.";

const searchSchema = z.object({
  _ptxn: z.string().optional(),
});

export const Route = createFileRoute("/checkout/success")({
  validateSearch: (search) => searchSchema.parse(search),
  component: CheckoutSuccess,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
});

const inputClass =
  "border-input bg-card/60 text-foreground placeholder:text-muted-foreground focus:ring-ring mt-2 h-12 w-full rounded-xl border px-4 text-sm outline-none focus:ring-1";

const SERVICE_BY_PRICE: Record<string, string> = {
  business_plan_onetime: "Business Plan",
  resume_makeover_onetime: "Résumé & Cover Letter Makeover",
  social_content_monthly: "Social Media Content Package",
  email_sequence_onetime: "Email Marketing Sequence",
};

/** Membership purchases are self-serve software — no project brief needed. */
const MEMBERSHIP_PRICES = ["empire_membership_monthly", "empire_membership_annual"];

function CheckoutSuccess() {
  const search = Route.useSearch();
  const transactionId = search._ptxn ?? "";
  const lookupOrder = useServerFn(getOrderByTransaction);
  const submitRequest = useServerFn(captureServiceRequest);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service_type: "",
    business_name: "",
    details: "",
  });

  // The webhook writes the order a moment after checkout closes, so retry briefly.
  const { data: order } = useQuery({
    queryKey: ["checkout-order", transactionId],
    queryFn: () => lookupOrder({ data: { transactionId } }),
    enabled: Boolean(transactionId),
    refetchInterval: (query) => (query.state.data ? false : 2000),
    retry: 3,
  });

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data } = await supabase.auth.getUser();
      if (cancelled) return;
      const user = data.user;
      setForm((f) => ({
        ...f,
        email: f.email || order?.email || user?.email || "",
        name: f.name || (user?.user_metadata?.["full_name"] as string | undefined) || "",
      }));
    })();
    return () => {
      cancelled = true;
    };
  }, [order?.email]);

  useEffect(() => {
    const custom = (order?.custom_data ?? null) as { serviceTitle?: string } | null;
    const fromOrder =
      custom?.serviceTitle ??
      (order?.price_id ? SERVICE_BY_PRICE[order.price_id] : undefined);
    if (fromOrder) setForm((f) => (f.service_type ? f : { ...f, service_type: fromOrder }));
  }, [order?.price_id, order?.custom_data]);

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await submitRequest({
        data: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          service_type: form.service_type,
          business_name: form.business_name,
          details: form.details,
          paddle_transaction_id: transactionId || undefined,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const custom = (order?.custom_data ?? null) as { serviceTitle?: string } | null;
  const isMembership = Boolean(order?.price_id && MEMBERSHIP_PRICES.includes(order.price_id));
  // Only legacy one-off service orders need a project brief. Everything else —
  // including a membership, or an order the webhook hasn't written yet — gets
  // the membership welcome, which is the only thing sold today.
  const isServiceOrder =
    !isMembership &&
    Boolean(
      (order?.price_id && SERVICE_BY_PRICE[order.price_id]) ||
        (custom?.serviceTitle && !custom.serviceTitle.startsWith("Membership")),
    );

  if (!isServiceOrder) {
    return (
      <main className="bg-background flex min-h-screen items-center justify-center px-5 py-20">
        <div className="border-gold/30 bg-card/50 w-full max-w-xl rounded-2xl border p-8 text-center backdrop-blur-sm md:p-12">
          <div className="bg-gold/10 text-gold mx-auto flex h-14 w-14 items-center justify-center rounded-full">
            <Check className="h-7 w-7" />
          </div>
          <p className="text-gold mt-6 text-[0.65rem] tracking-[0.24em] uppercase">
            Membership active
          </p>
          <h1 className="font-display mt-3 text-3xl font-light md:text-4xl">
            Welcome to your <span className="text-gold">empire era</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            Your receipt is on its way. The full Prompt Vault, unlimited Empire Builder AI and
            Victoria's weekly picks are unlocked right now — no waiting.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="gold" asChild>
              <Link to="/prompt-vault">Open the Prompt Vault</Link>
            </Button>
            <Button variant="lux" asChild>
              <Link to="/dashboard">Go to my dashboard</Link>
            </Button>
          </div>
          <p className="text-muted-foreground mt-6 text-xs leading-relaxed">
            Manage or cancel anytime in Billing & account on your dashboard.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-5 py-20">
      <div className="border-gold/30 bg-card/50 w-full max-w-xl rounded-2xl border p-8 backdrop-blur-sm md:p-12">
        <div className="text-center">
          <div className="bg-gold/10 text-gold mx-auto flex h-14 w-14 items-center justify-center rounded-full">
            <Check className="h-7 w-7" />
          </div>
          <p className="text-gold mt-6 text-[0.65rem] tracking-[0.24em] uppercase">
            Payment confirmed
          </p>
          <h1 className="font-display mt-3 text-3xl font-light md:text-4xl">
            Welcome to your <span className="text-gold">empire era</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            Thank you — your payment went through and your receipt is on its way. One last step:
            tell us about your project so we can start writing today.
          </p>
        </div>

        {submitted ? (
          <div className="border-gold/30 bg-gold/5 mt-8 rounded-xl border p-6 text-center">
            <h2 className="font-display text-2xl font-light">Project details received</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              We have everything we need, {form.name.split(" ")[0] || "there"}. Your draft arrives
              within the turnaround listed for {form.service_type || "your service"}, and we'll
              email updates to {form.email}.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button variant="lux" asChild>
                <Link to="/dashboard">Go to my dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Back to home</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="s-name" className="text-card-foreground text-sm font-medium">
                    Name <span className="text-blush">*</span>
                  </label>
                  <input
                    id="s-name"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="s-email" className="text-card-foreground text-sm font-medium">
                    Email <span className="text-blush">*</span>
                  </label>
                  <input
                    id="s-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                    placeholder="jane@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="s-phone" className="text-card-foreground text-sm font-medium">
                    Phone <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="s-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="s-business" className="text-card-foreground text-sm font-medium">
                    Business <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="s-business"
                    value={form.business_name}
                    onChange={(e) => update("business_name", e.target.value)}
                    className={inputClass}
                    placeholder="Your business name"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="s-service" className="text-card-foreground text-sm font-medium">
                  Service you purchased <span className="text-blush">*</span>
                </label>
                <select
                  id="s-service"
                  required
                  value={form.service_type}
                  onChange={(e) => update("service_type", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Choose a service…</option>
                  {servicesList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label htmlFor="s-details" className="text-card-foreground text-sm font-medium">
                  Tell us about your project <span className="text-blush">*</span>
                </label>
                <textarea
                  id="s-details"
                  required
                  rows={5}
                  minLength={10}
                  value={form.details}
                  onChange={(e) => update("details", e.target.value)}
                  className="border-input bg-card/60 text-foreground placeholder:text-muted-foreground focus:ring-ring mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-1"
                  placeholder="Anything that helps us understand your goal and timeline."
                />
              </div>

              {error ? <p className="text-blush mt-4 text-sm">{error}</p> : null}

              <Button
                type="submit"
                variant="gold"
                size="xl"
                className="mt-6 w-full"
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send my project details"}
              </Button>
            </form>

            <div className="mt-8 space-y-4">
              <div className="border-border flex gap-3 rounded-xl border p-4">
                <Mail className="text-blush mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-card-foreground/80 text-sm leading-relaxed">
                  Prefer email? Skip this form and we'll reach out within 24 hours to collect what
                  we need.
                </p>
              </div>
              <div className="border-border flex gap-3 rounded-xl border p-4">
                <Clock className="text-blush mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-card-foreground/80 text-sm leading-relaxed">
                  Your draft arrives within the turnaround listed for your service, with one
                  revision round included.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
