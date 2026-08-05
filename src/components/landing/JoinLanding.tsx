import heroImage from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { BlushRule, GoldRule, Section, SectionHeading } from "@/components/landing/Section";
import { VictoriaDemo } from "@/components/landing/VictoriaDemo";
import { StartFreeForm } from "@/components/landing/StartFreeForm";

const pillars = [
  {
    title: "The Membership",
    body: "A supportive digital space for women building, launching, and growing their businesses with professional tools, clear guidance, and AI-powered support.",
  },
  {
    title: "The Concierge",
    body: "Victoria helps with the work that slows you down, including business planning, marketing, content creation, pricing, branding, emails, résumés, grants, websites, and daily business decisions.",
  },
  {
    title: "The Standard",
    body: "Create professional work that reflects the quality, confidence, and ambition of your brand.",
  },
];

const benefits = [
  {
    label: "01",
    title: "Business planning",
    body: "Clear plans, next steps and revenue goals mapped out for your specific business — not generic advice.",
  },
  {
    label: "02",
    title: "Pricing & offers",
    body: "Positioning and payment plans built from your results and your market, so you charge what you're worth.",
  },
  {
    label: "03",
    title: "Branding & content",
    body: "Captions, emails, sales pages and DMs written in your voice, ready to post or send.",
  },
  {
    label: "04",
    title: "Websites & marketing",
    body: "Website copy, launch plans and follow-up sequences that turn attention into paying clients.",
  },
  {
    label: "05",
    title: "Résumés & grants",
    body: "Résumés, bios, applications and grant narratives written to be taken seriously the first time.",
  },
  {
    label: "06",
    title: "Support 24/7",
    body: "No booking, no waiting rooms. Victoria answers the moment the idea arrives — and remembers everything.",
  },
];

const experiences = [
  {
    quote:
      "Launch in days instead of months — Victoria drafts the page, you approve it, and your offer goes live.",
    name: "Faster launches",
    role: "What's possible",
  },
  {
    quote:
      "Have a chief of staff who never sleeps, so your pricing finally reflects what you actually deliver.",
    name: "Confident pricing",
    role: "What's possible",
  },
  {
    quote:
      "Come from a reel, join free, and stay for the standard — with a content calendar that runs itself.",
    name: "Consistent content",
    role: "What's possible",
  },
];

export function JoinLanding() {
  return (
    <main>
      <header className="border-border/60 bg-background/85 fixed top-0 z-50 w-full border-b backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3.5 md:px-10 md:py-4">
          <a
            href="#top"
            className="font-display text-sm tracking-[0.18em] uppercase sm:text-lg sm:tracking-[0.22em]"
          >
            Her Empire <span className="text-gold">Era</span>
          </a>
          <Button variant="lux" size="sm" asChild>
            <a href="#start">Start Free</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Founder of Her Empire Era working at a marble desk in golden light"
          width={1408}
          height={1600}
          className="absolute inset-0 h-full w-full object-cover object-[68%_18%]"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "var(--gradient-veil)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 opacity-60"
          style={{ backgroundImage: "var(--gradient-blush-veil)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-5 pt-[62svh] pb-16 md:px-10 md:pt-32 md:pb-28">
          <p className="eyebrow eyebrow-blush">Private membership · Est. for the ambitious</p>
          <h1 className="font-display mt-4 max-w-3xl text-[2.5rem] leading-[1.05] font-light md:mt-6 md:text-7xl md:leading-[1.02]">
            Build Your Business With Confidence
          </h1>
          <p className="text-muted-foreground mt-5 max-w-xl text-[0.95rem] leading-relaxed md:mt-6 md:text-lg">
            Meet Victoria, your private AI business concierge. Get 24/7 support with business
            planning, pricing, branding, marketing, content creation, websites, résumés, grants,
            government-contract guidance, and more. Membership starts free.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-10">
            <Button variant="gold" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#start">Start Free</a>
            </Button>
            <a
              href="#demonstration"
              className="text-muted-foreground hover:text-blush text-[0.7rem] tracking-[0.22em] uppercase transition-colors"
            >
              Watch Victoria in action
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
          glow
        />
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {pillars.map((p) => (
            <article
              key={p.title}
              className="border-border bg-card/50 rounded-2xl border p-6 backdrop-blur-sm md:p-8"
            >
              <GoldRule />
              <h3 className="font-display mt-6 text-2xl font-light">{p.title}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Victoria benefits */}
      <Section id="victoria" className="bg-blush-wash">
        <SectionHeading
          eyebrow="Meet Victoria"
          title={<>Meet Victoria, Your 24/7 AI Business Concierge</>}
          lead="Victoria learns about your goals, business, audience, and voice so she can provide personalized support that sounds and feels like you."
          glow
        />
        <div className="mt-12 grid gap-x-12 gap-y-8 md:mt-16 md:grid-cols-2 md:gap-y-10">
          {benefits.map((b) => (
            <div key={b.label} className="border-blush/40 flex gap-5 border-t pt-6 md:gap-6">
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
          eyebrow="Watch Victoria in action"
          title={<>Ask once. Watch it get handled.</>}
          lead="This is the kind of exchange that happens the night a reel takes off."
          glow
        />
        <div className="mt-10 md:mt-14">
          <VictoriaDemo />
        </div>
      </Section>

      {/* What members can experience */}
      <Section id="experience" className="bg-secondary/25">
        <SectionHeading
          eyebrow="Examples"
          title={<>What members can experience.</>}
          lead="Illustrative examples of what's possible inside Her Empire Era — not customer reviews."
        />
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {experiences.map((t) => (
            <figure
              key={t.name}
              className="border-border bg-card/60 flex h-full flex-col justify-between rounded-2xl border p-6 md:p-8"
            >
              <blockquote className="font-display text-lg leading-snug font-light italic md:text-xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <BlushRule className="w-10" />
                <p className="mt-4 text-sm font-medium">{t.name}</p>
                <p className="text-blush text-xs tracking-[0.18em] uppercase">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Start free */}
      <Section id="start" className="bg-blush-wash text-center">
        <p className="eyebrow eyebrow-blush">Free membership</p>
        <h2 className="font-display heading-glow mx-auto mt-5 max-w-3xl text-[2.15rem] leading-[1.1] font-light md:text-6xl md:leading-[1.08]">
          Your era doesn’t start when you’re ready. It starts now.
        </h2>
        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed md:text-base">
          Create your free account, meet Victoria, and put your first offer in motion tonight. No
          card required.
        </p>
        <div className="mt-10">
          <StartFreeForm />
        </div>
      </Section>

      <footer className="border-border/60 border-t px-5 py-10 md:px-10">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-[0.65rem] tracking-[0.18em] uppercase sm:flex-row sm:text-xs">
          <p className="font-display text-sm tracking-[0.22em]">Her Empire Era</p>
          <p>yourempireconcierge.com</p>
        </div>
      </footer>
    </main>
  );
}