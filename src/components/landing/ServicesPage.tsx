import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoldRule, Section, SectionHeading } from "@/components/landing/Section";
import { captureServiceRequest } from "@/lib/service-requests.functions";
import {
  SERVICES,
  SERVICES_FAQ,
  SERVICE_NAMES,
  type ServiceOffer,
} from "@/lib/services-catalog";

const inputClass =
  "border-input bg-card/60 text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-1";

function ServiceCard({
  offer,
  onSelect,
}: {
  offer: ServiceOffer;
  onSelect: (name: string) => void;
}) {
  return (
    <article
      className={
        offer.featured
          ? "border-gold/50 bg-card/60 relative flex flex-col rounded-2xl border p-6 md:p-7"
          : "border-border/60 bg-card/40 relative flex flex-col rounded-2xl border p-6 md:p-7"
      }
    >
      {offer.featured ? (
        <span className="border-gold/50 text-gold absolute -top-3 left-6 rounded-full border bg-background px-3 py-1 text-[0.6rem] tracking-[0.2em] uppercase">
          Most requested
        </span>
      ) : null}

      <h3 className="font-display text-xl leading-snug font-light md:text-2xl">
        {offer.name}
      </h3>
      <p className="text-gold font-display mt-3 text-2xl font-light">{offer.price}</p>
      <p className="text-muted-foreground mt-1 text-[0.7rem] tracking-[0.14em] uppercase">
        {offer.turnaround}
      </p>

      <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{offer.summary}</p>

      <ul className="mt-5 space-y-2.5">
        {offer.includes.map((item) => (
          <li key={item} className="text-foreground/80 flex gap-2.5 text-sm leading-relaxed">
            <Check className="text-gold mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-5 border-t border-border/40">
        <Button
          variant={offer.featured ? "gold" : "lux"}
          className="w-full"
          onClick={() => onSelect(offer.name)}
        >
          Request this service
        </Button>
      </div>
    </article>
  );
}

export function ServicesPage() {
  const navigate = useNavigate();
  const [service, setService] = useState<string>(SERVICES[0]!.name);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState<string | null>(null);

  const selectService = (name: string) => {
    setService(name);
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    setError(null);
    try {
      await captureServiceRequest({
        data: {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("phone") ?? "") || undefined,
          service_type: service,
          business_name: String(form.get("business_name") ?? "") || undefined,
          details: String(form.get("details") ?? ""),
          budget: String(form.get("budget") ?? "") || undefined,
        },
      });
      await navigate({ to: "/services/thank-you" });
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <main>
      <header className="border-border/60 bg-background/85 fixed top-0 z-50 w-full border-b backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3.5 md:px-10 md:py-4">
          <Link
            to="/join"
            className="font-display text-sm tracking-[0.18em] uppercase sm:text-lg sm:tracking-[0.22em]"
          >
            Her Empire <span className="text-gold">Era</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/membership"
              className="text-gold text-[0.65rem] tracking-[0.2em] uppercase transition-colors hover:text-gold/80"
            >
              Membership
            </Link>
            <Button variant="lux" size="sm" asChild>
              <a href="#request">Request</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-32 pb-12 md:px-10 md:pt-40 md:pb-16">
        <div
          className="absolute inset-x-0 top-0 h-full opacity-70"
          style={{ backgroundImage: "var(--gradient-blush-veil)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-3xl text-center">
          <p className="eyebrow eyebrow-blush">Done-for-you · Her Empire Era</p>
          <h1 className="font-display mt-4 text-[2.3rem] leading-[1.07] font-light md:mt-6 md:text-6xl md:leading-[1.03]">
            Grant applications and business documents, written for you
          </h1>
          <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-[0.95rem] leading-relaxed md:mt-6 md:text-lg">
            Professional grant writing, business plans, résumés and marketing
            copy for women building something real. Fixed quote before any work
            starts, delivered on a set timeline.
          </p>
          <div className="mt-8 flex justify-center">
            <GoldRule />
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section className="py-10 md:py-14">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Tell us what you need",
              body: "Pick a service and send your project details. Takes two minutes, no payment required.",
            },
            {
              step: "2",
              title: "Get a fixed quote",
              body: "We reply within one business day with a firm price and a secure invoice — no surprises.",
            },
            {
              step: "3",
              title: "Receive your documents",
              body: "Your finished work arrives within the stated turnaround, with one round of revisions included.",
            },
          ].map((s) => (
            <div key={s.step} className="border-border/60 bg-card/30 rounded-2xl border p-6">
              <p className="font-display text-gold text-3xl font-light">{s.step}</p>
              <h3 className="font-display mt-3 text-lg leading-snug font-light">{s.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services + prices */}
      <Section id="pricing" className="pt-4 md:pt-8">
        <SectionHeading
          eyebrow="The services"
          title="Services and pricing"
          lead="Every price below is a scoped range. Your exact quote is confirmed in writing before work begins."
        />
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((offer) => (
            <ServiceCard key={offer.name} offer={offer} onSelect={selectService} />
          ))}
        </div>
      </Section>

      {/* Request form */}
      <Section id="request" className="pt-0 md:pt-0">
        <div className="border-gold/30 bg-card/50 mx-auto max-w-2xl rounded-3xl border p-6 md:p-10">
          <p className="eyebrow eyebrow-blush flex items-center gap-2">
            <Sparkles className="text-gold h-3.5 w-3.5" aria-hidden="true" /> Request a service
          </p>
          <h2 className="font-display mt-4 text-2xl leading-snug font-light md:text-3xl">
            Start your project
          </h2>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="svc-name" className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                  Your name
                </label>
                <input id="svc-name" name="name" required className={`${inputClass} mt-2`} placeholder="Abenaa Bailey" />
              </div>
              <div>
                <label htmlFor="svc-email" className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                  Email
                </label>
                <input
                  id="svc-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={`${inputClass} mt-2`}
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="svc-phone" className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                  Phone (optional)
                </label>
                <input id="svc-phone" name="phone" className={`${inputClass} mt-2`} placeholder="(555) 555-5555" />
              </div>
              <div>
                <label htmlFor="svc-business" className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                  Business name (optional)
                </label>
                <input id="svc-business" name="business_name" className={`${inputClass} mt-2`} placeholder="Her Empire Era LLC" />
              </div>
            </div>

            <div>
              <label htmlFor="svc-type" className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                Service
              </label>
              <select
                id="svc-type"
                name="service_type"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`${inputClass} mt-2`}
              >
                {SERVICE_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="svc-budget" className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                Budget (optional)
              </label>
              <input id="svc-budget" name="budget" className={`${inputClass} mt-2`} placeholder="$350" />
            </div>

            <div>
              <label htmlFor="svc-details" className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                Project details
              </label>
              <textarea
                id="svc-details"
                name="details"
                required
                rows={5}
                className={`${inputClass} mt-2 resize-y`}
                placeholder="Tell us about your business, the grant or document you need, and any deadline."
              />
            </div>

            {error ? <p className="text-destructive text-sm">{error}</p> : null}

            <Button type="submit" variant="gold" size="xl" className="w-full" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
                </>
              ) : (
                "Send my request"
              )}
            </Button>
            <p className="text-muted-foreground text-center text-xs leading-relaxed">
              No payment is taken on this page. You'll receive a fixed
              quote and a secure invoice by email first.
            </p>
          </form>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="pt-0 md:pt-0">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl leading-snug font-light md:text-4xl">
            Questions about our services
          </h2>
          <dl className="mt-8 space-y-7">
            {SERVICES_FAQ.map((item) => (
              <div key={item.q} className="border-border/60 border-t pt-6">
                <dt className="font-display text-lg leading-snug font-light md:text-xl">{item.q}</dt>
                <dd className="text-muted-foreground mt-3 text-sm leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>

          <p className="text-muted-foreground mt-12 text-sm leading-relaxed">
            Prefer to do it yourself?{" "}
            <Link to="/membership" className="text-blush hover:text-gold transition-colors">
              The $19.99/month membership
            </Link>{" "}
            gives you Victoria AI and the Empire Prompt Vault, or start with{" "}
            <Link to="/grants-for-women" className="text-blush hover:text-gold transition-colors">
              our free grant directory
            </Link>
            .
          </p>
        </div>
      </Section>

      <footer className="border-border/60 border-t px-5 py-10 md:px-10">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-[0.65rem] tracking-[0.18em] uppercase sm:flex-row sm:text-xs">
          <p className="font-display text-sm tracking-[0.22em]">Her Empire Era</p>
          <nav className="flex flex-wrap items-center justify-center gap-5">
            <Link to="/join" className="hover:text-blush transition-colors">
              Home
            </Link>
            <Link to="/membership" className="hover:text-blush transition-colors">
              Membership
            </Link>
            <Link to="/privacy" className="hover:text-blush transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-blush transition-colors">
              Terms
            </Link>
          </nav>
          <a href="mailto:support@yourempireconcierge.com" className="hover:text-blush transition-colors">
            support@yourempireconcierge.com
          </a>
        </div>
      </footer>
    </main>
  );
}
