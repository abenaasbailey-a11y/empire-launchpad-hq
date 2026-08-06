import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BlushRule, GoldRule, Section, SectionHeading } from "@/components/landing/Section";
import { StartFreeForm } from "@/components/landing/StartFreeForm";

const TITLE = "Free Business Toolkit — Her Empire Era";
const DESCRIPTION =
  "Professional business tools for women founders: business planning, pricing, branding, content, websites, résumés and grants. Powered by Victoria, your AI concierge. Start free.";
const OG_IMAGE = "https://yourempireconcierge.com/og-image.jpg";
const CANONICAL = "https://yourempireconcierge.com/toolkit";

const tools = [
  {
    title: "Business plan builder",
    body: "Turn your idea into a one-page plan with revenue goals, audience definition and next steps — written for your business, not a classroom.",
  },
  {
    title: "Pricing & offer calculator",
    body: "Price with confidence. Map your costs, value and market position so your next offer reflects what you actually deliver.",
  },
  {
    title: "Brand voice guide",
    body: "Capture the tone, phrases and story that make your brand sound like you — then use it across every caption, email and sales page.",
  },
  {
    title: "Content calendar",
    body: "Plan a month of posts, reels and emails in minutes. Each idea is drafted in your voice and ready to schedule.",
  },
  {
    title: "Website copy framework",
    body: "Home, about and sales page copy built around your offer and your visitor's transformation — not generic templates.",
  },
  {
    title: "Résumé & grant writer",
    body: "Professional bios, résumés and grant narratives that position your experience and mission with clarity.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Join free",
    body: "Create your account in under a minute. No card required to start.",
  },
  {
    step: "02",
    title: "Tell Victoria about your business",
    body: "Share your goals, audience and voice so every tool outputs work that sounds like you.",
  },
  {
    step: "03",
    title: "Generate, edit, publish",
    body: "Run any tool, refine the output, and put your next offer, post or proposal in motion.",
  },
];

export const Route = createFileRoute("/toolkit")({
  component: ToolkitPage,
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
            url: "https://yourempireconcierge.com",
          },
        }),
      },
    ],
  }),
});

function ToolkitPage() {
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
          <p className="eyebrow eyebrow-blush">Professional tools · Free to start</p>
          <h1 className="font-display mt-4 max-w-3xl text-[2.5rem] leading-[1.08] font-light md:mt-6 md:text-6xl md:leading-[1.05]">
            The toolkit that turns ambition into action.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-xl text-[0.95rem] leading-relaxed md:mt-6 md:text-lg">
            Every tool inside Her Empire Era is designed for women building businesses: planning,
            pricing, branding, content, websites, résumés and grants. Victoria, your AI concierge,
            personalizes each one to your voice and goals.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-10">
            <Button variant="gold" size="xl" className="w-full sm:w-auto" asChild>
              <Link to="/auth" search={{ mode: "signup" }}>
                Start Free
              </Link>
            </Button>
            <a
              href="#tools"
              className="text-muted-foreground hover:text-blush text-[0.7rem] tracking-[0.22em] uppercase transition-colors"
            >
              Explore the tools
            </a>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <Section id="tools">
        <SectionHeading
          eyebrow="What's inside"
          title={<>Built for the work that builds empires.</>}
          lead="These are the same tools members use to plan, price, write and launch — all in one place."
          glow
        />
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {tools.map((t) => (
            <article
              key={t.title}
              className="border-border bg-card/50 rounded-2xl border p-6 backdrop-blur-sm md:p-8"
            >
              <GoldRule />
              <h3 className="font-display mt-6 text-xl font-light md:text-2xl">{t.title}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{t.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" className="bg-blush-wash">
        <SectionHeading
          eyebrow="How it works"
          title={<>From idea to output in three steps.</>}
          lead="No templates to hunt down. No prompts to memorize. Just your business, your voice, and Victoria."
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
        <p className="eyebrow eyebrow-blush">Free membership</p>
        <h2 className="font-display heading-glow mx-auto mt-5 max-w-3xl text-[2.15rem] leading-[1.1] font-light md:text-6xl md:leading-[1.08]">
          Open the toolkit tonight.
        </h2>
        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed md:text-base">
          Create your free Her Empire Era account and start using every tool immediately. No card
          required.
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
