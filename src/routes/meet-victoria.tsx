import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BlushRule, GoldRule, Section, SectionHeading } from "@/components/landing/Section";
import { StartFreeForm } from "@/components/landing/StartFreeForm";

const TITLE = "Meet Victoria — AI Business Assistant for Women Founders";
const DESCRIPTION =
  "Victoria is your private AI business assistant for pricing, planning, branding, content and daily decisions. Built for women founders. Start free.";
const OG_IMAGE = "https://herempireera.com/og-image.jpg";
const CANONICAL = "https://herempireera.com/meet-victoria";

const capabilities = [
  {
    title: "Business planning",
    body: "Turn scattered ideas into a clear plan. Victoria maps your offer, audience, revenue goals and next steps so you always know what to do next.",
  },
  {
    title: "Pricing & offers",
    body: "Stop guessing what to charge. She helps you price by value, cost and position so your rates reflect the empire you're building.",
  },
  {
    title: "Marketing & content",
    body: "Generate captions, emails, sales pages and content calendars in your voice — ready to post, send or publish.",
  },
  {
    title: "Branding & positioning",
    body: "Define the tone, story and visuals that make your brand unmistakably yours, then keep every message consistent.",
  },
  {
    title: "Websites & résumés",
    body: "From home page copy to professional bios and grant-ready résumés, Victoria builds work that looks as polished as you are.",
  },
  {
    title: "Daily decisions",
    body: "Ask anything. Grants, government-contract guidance, client emails, launch timing — Victoria is the calm second opinion in your pocket.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Tell her your goals",
    body: "Share your business, audience and voice. Victoria learns what matters to you.",
  },
  {
    step: "02",
    title: "Ask or choose a focus",
    body: "Need a price, plan, post or page? She builds personalized output in seconds.",
  },
  {
    step: "03",
    title: "Launch with confidence",
    body: "Refine, publish and move on to the next move — with 24/7 support behind you.",
  },
];

export const Route = createFileRoute("/meet-victoria")({
  component: MeetVictoriaPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: TITLE,
          url: CANONICAL,
          description: DESCRIPTION,
          isPartOf: {
            "@type": "WebSite",
            name: "Her Empire Era",
            url: "https://herempireera.com",
          },
          about: {
            "@type": "SoftwareApplication",
            name: "Victoria AI Business Assistant",
            applicationCategory: "BusinessApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          },
        }),
      },
    ],
  }),
});

function MeetVictoriaPage() {
  return (
    <main>
      <header className="border-border/60 bg-background/85 fixed top-0 z-50 w-full border-b backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-5 py-3.5 md:px-10 md:py-4">
          <Link
            to="/"
            className="font-display text-sm tracking-[0.18em] uppercase sm:text-lg sm:tracking-[0.22em]"
          >
            Her Empire <span className="text-gold">Era</span>
          </Link>
          <Button variant="lux" size="sm" asChild>
            <Link to="/auth" search={{ mode: "signup" }}>
              Start Free
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div
          className="absolute inset-x-0 top-0 h-1/2 opacity-40"
          style={{ backgroundImage: "var(--gradient-blush-veil)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex min-h-[70svh] w-full max-w-6xl flex-col justify-center px-5 pt-28 pb-16 md:min-h-[60vh] md:px-10 md:pt-32 md:pb-28">
          <p className="eyebrow eyebrow-blush">Your private AI business assistant</p>
          <h1 className="font-display mt-4 max-w-3xl text-[2.5rem] leading-[1.08] font-light md:mt-6 md:text-6xl md:leading-[1.05]">
            Meet Victoria, the AI concierge behind every polished empire.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-xl text-[0.95rem] leading-relaxed md:mt-6 md:text-lg">
            Victoria is a 24/7 AI business assistant built for women founders. She helps with
            pricing, planning, branding, marketing, content, websites, résumés, grants and the daily
            decisions that slow you down.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-10">
            <Button variant="gold" size="xl" className="w-full sm:w-auto" asChild>
              <Link to="/auth" search={{ mode: "signup" }}>
                Start Free
              </Link>
            </Button>
            <a
              href="#capabilities"
              className="text-muted-foreground hover:text-blush text-[0.7rem] tracking-[0.22em] uppercase transition-colors"
            >
              See what Victoria does
            </a>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <Section id="capabilities">
        <SectionHeading
          eyebrow="What Victoria handles"
          title={<>Built for the work that builds empires.</>}
          lead="From big-picture strategy to last-minute copy, Victoria is the calm, capable partner every founder deserves."
          glow
        />
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {capabilities.map((c) => (
            <article
              key={c.title}
              className="border-border bg-card/50 rounded-2xl border p-6 backdrop-blur-sm md:p-8"
            >
              <GoldRule />
              <h3 className="font-display mt-6 text-xl font-light md:text-2xl">{c.title}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{c.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" className="bg-blush-wash">
        <SectionHeading
          eyebrow="How it works"
          title={<>Three steps to having a concierge in your corner.</>}
          lead="No prompts to memorize. No generic templates. Just your business, your voice, and Victoria."
        />
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
          {howItWorks.map((s) => (
            <div key={s.step} className="text-center">
              <span className="font-display text-gold text-4xl font-light">{s.step}</span>
              <BlushRule className="mx-auto mt-4" />
              <h3 className="font-display mt-5 text-xl font-light">{s.title}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Membership CTA */}
      <Section id="start" className="text-center">
        <p className="eyebrow eyebrow-blush">Free to start</p>
        <h2 className="font-display heading-glow mx-auto mt-5 max-w-3xl text-[2.15rem] leading-[1.1] font-light md:text-6xl md:leading-[1.08]">
          Put Victoria to work today.
        </h2>
        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed md:text-base">
          Create your free Her Empire Era account and start asking Victoria for pricing, plans,
          content and more. No card required.
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
            <Link to="/refunds" className="hover:text-blush transition-colors">
              Refunds
            </Link>
          </nav>
          <p>herempireera.com</p>
        </div>
      </footer>
    </main>
  );
}
