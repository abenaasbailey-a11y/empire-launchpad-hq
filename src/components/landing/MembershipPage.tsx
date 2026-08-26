import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  Crown,
  Library,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { BlushRule, GoldRule, Section, SectionHeading } from "@/components/landing/Section";
import { useCheckout } from "@/hooks/useCheckout";
import { useEntitlement } from "@/hooks/useEntitlement";

type Plan = {
  id: string;
  priceId: string;
  label: string;
  price: string;
  cadence: string;
  note: string;
  featured: boolean;
  bonus?: string[];
};

/**
 * Three monthly tiers. Annual and free-trial options are intentionally absent.
 * `priceId` must match the human-readable price ID in the payments catalog.
 */
const plans: Plan[] = [
  {
    id: "member",
    priceId: "empire_member_monthly",
    label: "Empire Member",
    price: "$19.99",
    cadence: "per month",
    note: "Everything you need to start. Cancel anytime from your billing panel.",
    featured: true,
  },
  {
    id: "elite",
    priceId: "empire_elite_monthly",
    label: "Empire Elite",
    price: "$49.99",
    cadence: "per month",
    note: "For founders moving fast and building daily.",
    featured: false,
    bonus: ["Priority Victoria AI responses", "Early access to new tools and prompt drops"],
  },
  {
    id: "vip",
    priceId: "empire_vip_monthly",
    label: "Empire VIP",
    price: "$99.00",
    cadence: "per month",
    note: "The highest tier of access to every tool in the platform.",
    featured: false,
    bonus: [
      "Everything in Elite",
      "Top-priority Victoria AI access",
      "First look at every new Empire feature",
    ],
  },
];

/**
 * Only features that are live in the product today. Nothing is listed here
 * that a member cannot use the moment they join.
 */
const included = [
  {
    icon: Sparkles,
    title: "Victoria AI Concierge, unlimited",
    body: "Your always-on business assistant. Draft plans, offers, captions, emails and pitches in your own voice.",
  },
  {
    icon: Library,
    title: "The Empire Prompt Vault",
    body: "56+ premium, tested prompts across marketing, social media, business planning, email and productivity — organized and ready to run.",
  },
  {
    icon: Compass,
    title: "The Opportunity Center",
    body: "AI-matched income ideas based on your skills, time and goals — with saved picks and your own notes.",
  },
  {
    icon: BookOpen,
    title: "Social, email & planning assistance",
    body: "Caption and content help, business email drafting, and business-planning prompts built for founders, not classrooms.",
  },
];


const faqs = [
  {
    q: "What exactly am I paying for?",
    a: "Software access. The membership unlocks Victoria AI, the Empire Prompt Vault and the Opportunity Center inside this platform. It is a digital product you use yourself — nothing is shipped to you.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, anytime. Open the Billing panel in your dashboard, cancel in one tap, and you keep nothing hidden or hard to find. See the Refund Policy for our 30-day money-back guarantee.",
  },
  {
    q: "Is there a free option?",
    a: "Yes. You can create a free account, meet Victoria and grab the free prompt pack before you ever pay. The membership unlocks the full vault and the premium tools.",
  },
  {
    q: "How is payment handled?",
    a: "Securely by card, Apple Pay or Google Pay through our payment processor. Your card details never touch our servers, and your receipt and invoice are emailed to you automatically.",
  },
  {
    q: "Do I need to be technical?",
    a: "Not at all. Everything runs in your browser or on your phone. Tap a prompt, answer a couple of questions, and you have usable work in minutes.",
  },
];

function PlanCard({ plan, isMember }: { plan: Plan; isMember: boolean }) {
  const { openCheckout, closeCheckout, loading, error, needsAuth, isOpen, checkoutElement } =
    useCheckout();


  return (
    <article
      className={`border-border bg-card/50 relative flex h-full flex-col rounded-2xl border p-7 backdrop-blur-sm md:p-9 ${
        plan.featured ? "ring-gold/40 ring-1" : ""
      }`}
    >
      {plan.featured ? (
        <span className="bg-gold text-primary-foreground absolute -top-3 right-6 rounded-full px-3 py-1 text-[0.6rem] font-medium tracking-[0.14em] uppercase">
          Most Popular
        </span>
      ) : null}
      <p className="text-muted-foreground text-[0.65rem] tracking-[0.2em] uppercase">
        {plan.label}
      </p>
      <p className="font-display mt-4 text-4xl font-light md:text-5xl">
        {plan.price}
        <span className="text-muted-foreground ml-2 text-sm tracking-wide">{plan.cadence}</span>
      </p>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{plan.note}</p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {included.map((i) => (
          <li key={i.title} className="flex items-start gap-2 text-sm">
            <Check className="text-blush mt-1 h-3.5 w-3.5 shrink-0" />
            <span className="text-card-foreground/80">{i.title}</span>
          </li>
        ))}
        {plan.bonus?.map((extra) => (
          <li key={extra} className="flex items-start gap-2 text-sm">
            <Check className="text-gold mt-1 h-3.5 w-3.5 shrink-0" />
            <span className="text-card-foreground/80">{extra}</span>
          </li>
        ))}
      </ul>
      {isMember ? (
        <Button variant="lux" className="mt-7 w-full" asChild>
          <Link to="/prompt-vault">You're a member — open the vault</Link>
        </Button>
      ) : isOpen ? null : (
      <Button
        variant={plan.featured ? "gold" : "lux"}
        className="mt-7 w-full"
        disabled={loading}
        onClick={() => void openCheckout({ priceId: plan.priceId, serviceTitle: `Membership — ${plan.label}` })}
      >
        {loading ? "Opening checkout…" : `Become a member — ${plan.price}`}
      </Button>
      )}
      {isOpen ? (
        <div className="mt-7">
          {checkoutElement}
          <button
            type="button"
            onClick={closeCheckout}
            className="text-muted-foreground hover:text-foreground mt-4 w-full text-xs underline"
          >
            Cancel and go back
          </button>
        </div>
      ) : null}
      {needsAuth ? (
        <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
          Create your free account first so we can attach the membership to you.{" "}
          <Link
            to="/auth"
            search={{ mode: "signup", next: "/membership" }}
            className="text-gold underline"
          >
            Sign in or join free
          </Link>
          , then tap the button again.
        </p>
      ) : null}
      {error ? <p className="text-destructive mt-2 text-xs">{error}</p> : null}
    </article>

  );
}

/** Public pricing page for the Her Empire Era digital membership. */
export function MembershipPage() {
  const [showAll, setShowAll] = useState(false);
  const { isMember } = useEntitlement();
  const visibleFaqs = showAll ? faqs : faqs.slice(0, 3);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <PaymentTestModeBanner />

      {/* Hero */}
      <Section id="hero" className="pt-16 text-center md:pt-24">
        <span className="bg-gold/10 text-gold mx-auto flex h-14 w-14 items-center justify-center rounded-full">
          <Crown className="h-6 w-6" />
        </span>
        <p className="eyebrow eyebrow-gold mt-6">The membership</p>
        <h1 className="font-display heading-glow mx-auto mt-5 max-w-4xl text-[2.3rem] leading-[1.08] font-light md:text-6xl md:leading-[1.05]">
          Every AI tool your empire needs, in one place.
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-[0.95rem] leading-relaxed md:text-base">
          Victoria AI, the Empire Prompt Vault and the Opportunity Center — full access for less
          than a dinner out. Built for women who are done waiting for permission.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <GoldRule />
          <BlushRule />
        </div>
      </Section>

      {/* Plans */}
      <Section id="pricing">
        <div className="mx-auto grid max-w-md gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} isMember={isMember} />
          ))}
        </div>
        <p className="text-muted-foreground mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-center text-xs leading-relaxed">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
          30-day money-back guarantee. Cancel anytime.
        </p>
      </Section>

      {/* What's included */}
      <Section id="included" className="bg-secondary/25">
        <SectionHeading
          eyebrow="What you unlock"
          title={<>Four tools. One membership.</>}
          lead="Not a course you never finish. Working tools you use the same day you join."
          glow
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          {included.map((item) => (
            <article
              key={item.title}
              className="border-border bg-card/50 rounded-2xl border p-6 backdrop-blur-sm md:p-8"
            >
              <span className="bg-gold/10 text-gold flex h-11 w-11 items-center justify-center rounded-full">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display mt-5 text-xl font-light md:text-2xl">{item.title}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <SectionHeading
          eyebrow="Questions"
          title={<>Before you join.</>}
          lead="Straight answers, no fine print games."
          glow
        />
        <div className="mx-auto mt-10 max-w-3xl md:mt-14">
          {visibleFaqs.map((item) => (
            <details
              key={item.q}
              className="border-border group border-b py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <h3 className="font-display min-w-0 text-lg leading-snug font-light md:text-xl">
                  {item.q}
                </h3>
                <span
                  className="text-blush mt-1 shrink-0 text-lg leading-none transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="text-muted-foreground mt-3 pr-8 text-sm leading-relaxed">{item.a}</p>
            </details>
          ))}
          {!showAll ? (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="text-blush mt-6 flex items-center gap-1.5 text-xs font-medium tracking-[0.14em] uppercase transition-colors hover:opacity-80"
            >
              More questions <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </Section>

      {/* CTA */}
      <Section id="cta" className="bg-blush-wash text-center">
        <p className="eyebrow eyebrow-blush">Not ready yet?</p>
        <h2 className="font-display heading-glow mx-auto mt-5 max-w-3xl text-[2.15rem] leading-[1.1] font-light md:text-5xl md:leading-[1.08]">
          Try Victoria free first.
        </h2>
        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed md:text-base">
          Create a free account, meet Victoria, and grab the free prompt pack. Upgrade whenever
          you're ready for the full vault.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button variant="gold" size="xl" asChild>
            <Link to="/join">Start Free</Link>
          </Button>
          <Button variant="lux" size="xl" asChild>
            <Link to="/free-prompts">Get Free Prompts</Link>
          </Button>
        </div>
      </Section>

      <footer className="border-border/60 border-t px-5 py-10 md:px-10">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-[0.65rem] tracking-[0.18em] uppercase sm:flex-row sm:text-xs">
          <p className="font-display text-sm tracking-[0.22em]">Her Empire Era</p>
          <nav className="flex flex-wrap items-center justify-center gap-5">
            <Link to="/join" className="hover:text-blush transition-colors">
              Join
            </Link>
            <Link to="/free-prompts" className="hover:text-blush transition-colors">
              Free Prompts
            </Link>
            <Link to="/privacy" className="hover:text-blush transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-blush transition-colors">
              Terms
            </Link>
            <Link to="/refunds" className="hover:text-blush transition-colors">
              Refunds
            </Link>
          </nav>
          <a
            href="mailto:support@yourempireconcierge.com"
            className="hover:text-blush transition-colors"
          >
            support@yourempireconcierge.com
          </a>
        </div>
      </footer>
    </main>
  );
}
