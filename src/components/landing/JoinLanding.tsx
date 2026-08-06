import { Link } from "@tanstack/react-router";
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

export const membershipFaqs = [
  {
    q: "Is the membership really free?",
    a: "Yes. You can create your account, meet Victoria and start working without a card. Paid options exist for members who want more, but nothing is required to begin.",
  },
  {
    q: "What exactly is Victoria?",
    a: "Victoria is your private AI business concierge. She helps with business planning, pricing, branding, marketing, content, websites, résumés, grants and the daily decisions in between.",
  },
  {
    q: "Do I need a business already?",
    a: "No. Members join at every stage — from a first idea to an established brand. Victoria meets you where you are and maps the next step.",
  },
  {
    q: "How do I sign up?",
    a: "Enter your email, choose a password, then confirm your email address from the message we send you. Your dashboard opens the moment you confirm.",
  },
  {
    q: "Will the work sound like me?",
    a: "Yes. Victoria learns your goals, audience and voice, so drafts read like you wrote them — and you always approve before anything goes out.",
  },
  {
    q: "Can I cancel or leave anytime?",
    a: "Always. Your free membership has no commitment, and you can stop using it or remove your account whenever you like.",
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
            <Link to="/auth" search={{ mode: "signup" }}>
              Start Free
            </Link>
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
          className="absolute inset-0 h-full w-full object-cover object-[60%_25%]"
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
        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-5 pt-28 pb-16 md:px-10 md:pt-32 md:pb-28">
          <p className="eyebrow eyebrow-blush">Private membership · Est. for the ambitious</p>
          <h1 className="font-display mt-4 max-w-3xl text-[2.75rem] leading-[1.05] font-light md:mt-6 md:text-7xl md:leading-[1.02]">
            Build the empire your audience already believes you have.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-xl text-[0.95rem] leading-relaxed md:mt-6 md:text-lg">
            Her Empire Era gives you Victoria — a private AI concierge who writes, prices and plans
            your business while you stay in your genius. Membership starts free.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-10">
            <Button variant="gold" size="xl" className="w-full sm:w-auto" asChild>
              <Link to="/auth" search={{ mode: "signup" }}>
                Start Free
              </Link>
            </Button>
            <a
              href="#demonstration"
              className="text-muted-foreground hover:text-blush text-[0.7rem] tracking-[0.22em] uppercase transition-colors"
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
      <Section id="faq">
        <SectionHeading
          eyebrow="Membership FAQ"
          title={<>Answers before you join.</>}
          lead="The questions new members ask most often."
          glow
        />
        <div className="mx-auto mt-10 max-w-3xl md:mt-14">
          {membershipFaqs.map((item) => (
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
        </div>
      </Section>

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
          <nav className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-blush transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-blush transition-colors">
              Terms
            </Link>
          </nav>
          <p>yourempireconcierge.com</p>
        </div>
      </footer>
    </main>
  );
}