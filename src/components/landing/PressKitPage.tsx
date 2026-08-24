import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GoldRule, BlushRule } from "@/components/landing/Section";
import { LegalFooter } from "@/components/landing/LegalPage";
import headshot from "@/assets/press/headshot.png.asset.json";
import editorial from "@/assets/press/editorial.png.asset.json";
import blush from "@/assets/press/blush.png.asset.json";
import lifestyle from "@/assets/press/lifestyle.png.asset.json";
import crownMark from "@/assets/crown-mark-transparent.png";
import pressKitZip from "@/assets/press/her-empire-era-press-kit.zip.asset.json";

const PHOTOS = [
  {
    src: headshot.url,
    label: "Signature headshot",
    note: "Preferred lead image for features and bylines.",
    alt: "Abenaa Bailey, founder of Her Empire Era, in a black dress against a warm gold backdrop",
    file: "abenaa-bailey-headshot.png",
  },
  {
    src: editorial.url,
    label: "Editorial full-length",
    note: "Best for opening spreads and full-width layouts.",
    alt: "Full-length editorial portrait of Abenaa Bailey standing in a gold arch",
    file: "abenaa-bailey-editorial.png",
  },
  {
    src: blush.url,
    label: "Approachable business portrait",
    note: "Ideal for podcast art, panels and speaker pages.",
    alt: "Abenaa Bailey in a blush blazer smiling outdoors in golden light",
    file: "abenaa-bailey-blush.png",
  },
  {
    src: lifestyle.url,
    label: "Lifestyle",
    note: "Warmer option for founder-story and community pieces.",
    alt: "Lifestyle portrait of Abenaa Bailey, founder of Her Empire Era",
    file: "abenaa-bailey-lifestyle.png",
  },
];

const FACTS: { label: string; value: string }[] = [
  { label: "Founder", value: "Abenaa Bailey, M.Ed." },
  { label: "Company", value: "Her Empire Era" },
  { label: "Based in", value: "Houston, Texas" },
  { label: "Category", value: "AI-powered business platform for women" },
  { label: "Membership", value: "Starts free" },
  { label: "Website", value: "herempireera.com" },
];

const OFFERINGS: { title: string; body: string }[] = [
  {
    title: "Victoria, the AI concierge",
    body: "A business concierge that helps members plan, write, launch and market — in plain language, on demand.",
  },
  {
    title: "The Empire Prompt Vault",
    body: "A curated library of ready-to-use AI prompts across marketing, social media, funding, planning, email, résumés and productivity.",
  },
  {
    title: "The Opportunity Center",
    body: "Vetted business ideas and funding paths, matched to a member's skills, time and starting budget.",
  },
  {
    title: "Grants & funding guidance",
    body: "A free, continually updated directory of real grants women can apply for, with eligibility at a glance.",
  },
];

const STORY_PARAGRAPHS = [
  "There are businesses built from market research, and there are businesses built from the moment a founder realizes she must create the support she once needed. Her Empire Era belongs to the second category.",
  "After a season of depression, anxiety, job loss and financial uncertainty, Houston-based educator Abenaa Bailey, M.Ed., began building the resource she had searched for and could not find: a calm, professional, AI-powered place for women to rebuild a business — and a sense of authority — from wherever they are standing.",
  "Today Her Empire Era pairs an AI concierge named Victoria with a growing library of prompts, funding research and step-by-step guidance, so a woman with an idea and an hour a day can move forward without hiring an agency or guessing what comes next.",
];

const QUOTES = [
  "I built the support I needed when I had nothing left but an idea.",
  "Survival taught me strategy. Her Empire Era is what I did with it.",
  "Your ideas still have value, and you are still allowed to begin again.",
];

export function PressKitPage() {
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
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/membership"
              className="text-gold hidden text-[0.65rem] tracking-[0.2em] uppercase transition-colors hover:text-gold/80 sm:block"
            >
              Membership
            </Link>
            <Button variant="lux" size="sm" asChild>
              <a href="mailto:press@yourempireconcierge.com">Press Contact</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-background relative overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-2/3 opacity-40"
          style={{ backgroundImage: "var(--gradient-blush-veil)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 pt-28 pb-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14 md:px-10 md:pt-36 md:pb-20">
          <div>
            <p className="eyebrow eyebrow-blush">Press &amp; Media Kit</p>
            <h1 className="font-display mt-4 text-[2.15rem] leading-[1.1] font-light md:mt-6 md:text-[3.25rem] md:leading-[1.04]">
              Her Empire Era
              <span className="text-gold block">Media Kit</span>
            </h1>
            <GoldRule className="mt-7" />
            <p className="text-muted-foreground mt-6 max-w-xl text-[0.95rem] leading-relaxed md:text-base">
              Everything an editor, producer or podcast host needs to feature Abenaa Bailey and Her
              Empire Era — founder bio, brand story, approved photography, key facts and quotes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button variant="lux" size="lg" asChild>
                <a href="mailto:press@yourempireconcierge.com">Request an interview</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#photography">Download photography</a>
              </Button>
            </div>
          </div>

          <figure className="relative">
            <div className="border-gold/30 overflow-hidden rounded-sm border shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
              <img
                src={headshot.url}
                alt="Abenaa Bailey, founder of Her Empire Era, in a black dress against a warm gold backdrop"
                width={1200}
                height={1600}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="text-muted-foreground mt-3 text-[0.65rem] tracking-[0.2em] uppercase">
              Abenaa Bailey, M.Ed. — Founder
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Fast facts */}
      <section className="border-border/60 border-t">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-10 md:py-20">
          <p className="eyebrow">At a glance</p>
          <BlushRule className="mt-5" />
          <dl className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {FACTS.map((fact) => (
              <div key={fact.label} className="border-border/50 border-t pt-4">
                <dt className="text-gold/80 text-[0.62rem] tracking-[0.24em] uppercase">
                  {fact.label}
                </dt>
                <dd className="font-display mt-2 text-lg leading-snug font-light">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* One line + boilerplate */}
      <section className="border-border/60 border-t">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 md:grid-cols-2 md:px-10 md:py-20">
          <div>
            <p className="eyebrow eyebrow-blush">Her Empire Era in one line</p>
            <p className="font-display mt-5 text-[1.4rem] leading-snug font-light md:text-[1.75rem]">
              “Her Empire Era is a luxury AI-powered platform helping women plan, launch and grow
              their businesses — with a concierge named Victoria doing the heavy lifting.”
            </p>
            <GoldRule className="mt-7" />
          </div>
          <div>
            <p className="eyebrow">Boilerplate</p>
            <div className="mt-5 space-y-4">
              {STORY_PARAGRAPHS.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-muted-foreground text-[0.9rem] leading-relaxed md:text-[0.95rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photography */}
      <section id="photography" className="border-border/60 scroll-mt-24 border-t">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-10 md:py-20">
          <p className="eyebrow">Approved photography</p>
          <h2 className="font-display mt-4 text-2xl leading-snug font-light md:text-4xl">
            High-resolution images, cleared for editorial use
          </h2>
          <BlushRule className="mt-6" />
          <p className="text-muted-foreground mt-5 max-w-2xl text-[0.9rem] leading-relaxed md:text-[0.95rem]">
            Please credit <span className="text-foreground">Abenaa Bailey / Her Empire Era</span>.
            Images may be cropped but not altered, filtered or overlaid with third-party branding.
          </p>
          <div className="mt-6">
            <Button variant="lux" size="lg" asChild>
              <a href={pressKitZip.url} download="her-empire-era-press-kit.zip">
                Download all assets (.zip)
              </a>
            </Button>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PHOTOS.map((photo) => (
              <figure key={photo.file} className="group">
                <div className="border-border/60 group-hover:border-gold/40 overflow-hidden rounded-sm border transition-colors">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="text-gold/85 text-[0.62rem] tracking-[0.22em] uppercase">
                    {photo.label}
                  </p>
                  <p className="text-muted-foreground mt-2 text-[0.82rem] leading-relaxed">
                    {photo.note}
                  </p>
                  <a
                    href={photo.src}
                    download={photo.file}
                    className="text-foreground hover:text-blush mt-3 inline-block border-b border-current pb-0.5 text-[0.68rem] tracking-[0.2em] uppercase transition-colors"
                  >
                    Download
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Logo */}
      <section className="border-border/60 border-t">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-20">
          <div className="border-gold/25 flex items-center justify-center rounded-sm border bg-black/40 px-8 py-14">
            <img src={crownMark} alt="Her Empire Era crown logo" className="h-28 w-auto" />
          </div>
          <div>
            <p className="eyebrow eyebrow-blush">Brand assets</p>
            <h2 className="font-display mt-4 text-2xl leading-snug font-light md:text-3xl">
              The crown mark
            </h2>
            <p className="text-muted-foreground mt-5 max-w-xl text-[0.9rem] leading-relaxed md:text-[0.95rem]">
              The Her Empire Era crown is available as a transparent PNG for print and digital use.
              Please keep clear space around the mark and place it on black, cream or gold only.
            </p>
            <a
              href={crownMark}
              download="her-empire-era-crown.png"
              className="text-foreground hover:text-blush mt-6 inline-block border-b border-current pb-0.5 text-[0.68rem] tracking-[0.2em] uppercase transition-colors"
            >
              Download logo
            </a>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="border-border/60 border-t">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-10 md:py-20">
          <p className="eyebrow">Inside the platform</p>
          <h2 className="font-display mt-4 text-2xl leading-snug font-light md:text-4xl">
            What members get
          </h2>
          <GoldRule className="mt-6" />
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {OFFERINGS.map((item, index) => (
              <div key={item.title} className="border-border/50 border-t pt-5">
                <p className="text-gold/80 text-[0.62rem] tracking-[0.24em] uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-3 text-lg leading-snug font-light md:text-xl">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-[0.88rem] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className="border-border/60 border-t">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-10 md:py-20">
          <p className="eyebrow eyebrow-blush">Quotes from the founder</p>
          <BlushRule className="mt-5" />
          <div className="mt-9 space-y-8">
            {QUOTES.map((quote) => (
              <blockquote
                key={quote}
                className="border-gold/40 font-display border-l pl-5 text-[1.15rem] leading-snug font-light md:pl-7 md:text-[1.45rem]"
              >
                “{quote}”
                <footer className="text-muted-foreground mt-3 text-[0.62rem] tracking-[0.22em] uppercase">
                  Abenaa Bailey, M.Ed.
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-border/60 border-t">
        <div className="mx-auto w-full max-w-3xl px-5 py-16 text-center md:px-10 md:py-24">
          <p className="eyebrow">Press enquiries</p>
          <h2 className="font-display mt-4 text-2xl leading-snug font-light md:text-4xl">
            Let’s tell the story
          </h2>
          <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-[0.92rem] leading-relaxed md:text-base">
            Abenaa is available for founder profiles, panels, podcasts and expert commentary on women
            in AI, reinvention after job loss, and building a business with AI tools.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="lux" size="lg" asChild>
              <a href="mailto:press@yourempireconcierge.com">press@yourempireconcierge.com</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/join">See the membership</Link>
            </Button>
          </div>
        </div>
      </section>

      <LegalFooter />
    </main>
  );
}
