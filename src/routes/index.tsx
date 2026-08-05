import { createFileRoute } from "@tanstack/react-router";
import heroImage from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { GoldRule, Section, SectionHeading } from "@/components/landing/Section";
import { VictoriaDemo } from "@/components/landing/VictoriaDemo";
import { StartFreeForm } from "@/components/landing/StartFreeForm";

const TITLE = "Her Empire Era — Free Membership & Victoria, Your AI Concierge";
const DESCRIPTION =
  "Join Her Empire Era free and meet Victoria, the private AI concierge that writes, prices, and plans your business so you can build your empire with quiet confidence.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://yourempireconcierge.com/" },
    ],
    links: [{ rel: "canonical", href: "https://yourempireconcierge.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Her Empire Era",
          url: "https://yourempireconcierge.com",
          description: DESCRIPTION,
        }),
      },
    ],
  }),
});

const pillars = [
  {
    title: "The Membership",
    body: "A private room for women building real revenue — no noise, no hustle theater, just the strategy and standards of a founder.",
  },
  {
    title: "The Concierge",
    body: "Victoria handles the work that stalls you: copy, offers, pricing, follow-up, and the daily decisions that eat your time.",
  },
  {
    title: "The Standard",
    body: "Everything you touch looks and sounds expensive, because your brand deserves an operation that matches its ambition.",
  },
];

const benefits = [
  {
    label: "01",
    title: "Writes in your voice",
    body: "Captions, emails, sales pages and DMs drafted in the exact tone your audience already follows.",
  },
  {
    label: "02",
    title: "Prices your offers",
    body: "Positioning and payment plans built from your results and your market — not guesswork.",
  },
  {
    label: "03",
    title: "Turns followers into clients",
    body: "Welcome sequences, objection answers and follow-up so attention converts instead of evaporating.",
  },
  {
    label: "04",
    title: "Runs your week",
    body: "A clear daily plan with three revenue-moving priorities, ready before you open your laptop.",
  },
  {
    label: "05",
    title: "Available at 2am",
    body: "No booking, no waiting rooms. Your concierge answers the moment the idea arrives.",
  },
  {
    label: "06",
    title: "Remembers everything",
    body: "Your offers, clients, numbers and goals stay in context, so advice compounds over time.",
  },
];

const testimonials = [
  {
    quote:
      "I launched in nine days instead of nine months. Victoria wrote the page, I approved it, and the first three clients paid in full.",
    name: "Amara J.",
    role: "Brand strategist",
  },
  {
    quote:
      "It feels like having a chief of staff who never sleeps. My pricing finally reflects what I actually deliver.",
    name: "Simone R.",
    role: "Interior designer",
  },
  {
    quote:
      "I came from a reel, joined free, and stayed because the standard in here is different. My content calendar runs itself now.",
    name: "Danielle O.",
    role: "Wellness founder",
  },
];

function Index() {
  return (
    <main>
      <header className="border-border/60 fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" className="font-display text-lg tracking-[0.22em] uppercase">
            Her Empire <span className="text-gold">Era</span>
          </a>
          <Button variant="lux" size="sm" asChild>
            <a href="#start">Start Free</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative min-h-[100svh] overflow-hidden">
        <img
          src={heroImage}
          alt="Founder of Her Empire Era working at a marble desk in golden light"
          width={1408}
          height={1600}
          className="absolute inset-0 h-full w-full object-cover object-[60%_30%]"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--gradient-veil)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-6 pt-32 pb-20 md:px-10 md:pb-28">
          <p className="eyebrow">Private membership · Est. for the ambitious</p>
          <h1 className="font-display mt-6 max-w-3xl text-5xl leading-[1.02] font-light md:text-7xl">
            Build the empire your audience already believes you have.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed md:text-lg">
            Her Empire Era gives you Victoria — a private AI concierge who writes, prices and plans
            your business while you stay in your genius. Membership starts free.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="gold" size="xl" asChild>
              <a href="#start">Start Free</a>
            </Button>
            <a
              href="#demonstration"
              className="text-muted-foreground hover:text-primary text-xs tracking-[0.24em] uppercase transition-colors"
            >
              See Victoria work
            </a>
          </div>
        </div>
      </section>

      {/* What Her Empire Era is */}
      <Section id="about">
        <SectionHeading
          eyebrow="What this is"
          title={<>An empire needs an operation, not more advice.</>}
          lead="Her Empire Era is a members-only house for women who are done piecing together free templates. Inside, strategy, brand and execution live in one place — and your concierge does the heavy lifting."
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.title}
              className="border-border bg-card/50 rounded-2xl border p-8 backdrop-blur-sm"
            >
              <GoldRule />
              <h3 className="font-display mt-6 text-2xl font-light">{p.title}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Victoria benefits */}
      <Section id="victoria" className="bg-secondary/25">
        <SectionHeading
          eyebrow="Meet Victoria"
          title={<>The concierge behind every polished empire.</>}
          lead="Victoria is trained on your brand, your offers and your voice — so the work sounds like you on your sharpest day."
        />
        <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {benefits.map((b) => (
            <div key={b.label} className="border-border/70 flex gap-6 border-t pt-6">
              <span className="text-gold font-display text-2xl">{b.label}</span>
              <div>
                <h3 className="text-base font-medium tracking-wide">{b.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Demonstration */}
      <Section id="demonstration">
        <SectionHeading
          eyebrow="Demonstration"
          title={<>Ask once. Watch it get handled.</>}
          lead="This is a real exchange with Victoria — the kind that happens the night a reel takes off."
        />
        <div className="mt-14">
          <VictoriaDemo />
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" className="bg-secondary/25">
        <SectionHeading eyebrow="In their words" title={<>Members who stopped doing it alone.</>} />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="border-border bg-card/60 flex h-full flex-col justify-between rounded-2xl border p-8"
            >
              <blockquote className="font-display text-xl leading-snug font-light italic">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <GoldRule className="w-10" />
                <p className="mt-4 text-sm font-medium">{t.name}</p>
                <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
                  {t.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Start free */}
      <Section id="start" className="text-center">
        <p className="eyebrow">Free membership</p>
        <h2 className="font-display mx-auto mt-5 max-w-3xl text-4xl leading-[1.08] font-light md:text-6xl">
          Your era doesn’t start when you’re ready. It starts now.
        </h2>
        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-base leading-relaxed">
          Create your free account, meet Victoria, and put your first offer in motion tonight. No
          card required.
        </p>
        <div className="mt-10">
          <StartFreeForm />
        </div>
      </Section>

      <footer className="border-border/60 border-t px-6 py-10 md:px-10">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-xs tracking-[0.18em] uppercase sm:flex-row">
          <p className="font-display text-sm tracking-[0.22em]">Her Empire Era</p>
          <p>yourempireconcierge.com</p>
        </div>
      </footer>
    </main>
  );
}
