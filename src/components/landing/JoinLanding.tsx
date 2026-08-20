import { Link } from "@tanstack/react-router";
import heroPromo from "@/assets/her-empire-era-hero.jpeg.asset.json";
import { Button } from "@/components/ui/button";
import { BlushRule, GoldRule, Section, SectionHeading } from "@/components/landing/Section";
import { VictoriaDemo } from "@/components/landing/VictoriaDemo";
import { StartFreeForm } from "@/components/landing/StartFreeForm";
import { trackStartFreeClick } from "@/lib/analytics";
import {
  Rocket,
  Banknote,
  PenTool,
  Megaphone,
  FileText,
  Clock,
  Star,
} from "lucide-react";

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
    icon: Rocket,
    label: "01",
    title: "Launch in days, not months",
    body: "Victoria maps your offer, writes your launch sequence, and gives you a day-by-day plan — so you stop planning and start selling.",
  },
  {
    icon: Banknote,
    label: "02",
    title: "Price with confidence",
    body: "No more guessing. She builds packages and payment options from your market, your results, and the value you actually deliver.",
  },
  {
    icon: PenTool,
    label: "03",
    title: "Content that sounds like you",
    body: "Captions, emails, sales pages and DMs written in your voice, ready to post or send — without starting from a blank page.",
  },
  {
    icon: Megaphone,
    label: "04",
    title: "Turn attention into clients",
    body: "Website copy, follow-up sequences and launch plans that move followers from curious to booked.",
  },
  {
    icon: FileText,
    label: "05",
    title: "Get taken seriously the first time",
    body: "Résumés, bios, grant narratives and applications written to open doors — whether it's funding or a new opportunity.",
  },
  {
    icon: Clock,
    label: "06",
    title: "Answers the moment inspiration strikes",
    body: "No booking, no waiting rooms. Victoria is there at 2am with the exact next step — and she remembers everything you've built.",
  },
];

const featuredTestimonial = {
  quote:
    "I went from a viral reel to a priced offer and a welcome sequence in one evening. Victoria didn't just answer questions — she did the work with me.",
  name: "Danielle R.",
  role: "Business coach, 12K followers",
  result: "Launched in 4 days",
};

const testimonials = [
  {
    quote:
      "She priced my coaching package higher than I would have dared — and clients paid in full.",
    name: "Monica T.",
    role: "Career strategist",
    result: "3x pricing confidence",
  },
  {
    quote:
      "My content calendar went from stressful to silent. I show up, approve, and post.",
    name: "Aisha K.",
    role: "Beauty brand founder",
    result: "5 weeks ahead on content",
  },
  {
    quote:
      "The grant narrative she drafted got me to the final round. I would have quit on page two.",
    name: "Jordan P.",
    role: "Nonprofit founder",
    result: "Finalist for $25K grant",
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
    a: "Enter your email, choose a password, and your free account is ready instantly. Your dashboard opens the moment you sign up — no waiting, no card required.",
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

function StarRating() {
  return (
    <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="text-gold h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="bg-gold text-primary-foreground font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm tracking-wider">
      {initials}
    </span>
  );
}

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
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/free-prompts"
              className="text-muted-foreground hover:text-blush hidden text-[0.65rem] tracking-[0.2em] uppercase transition-colors sm:block"
            >
              Free Prompts
            </Link>
            <Link
              to="/opportunity-center"
              className="text-muted-foreground hover:text-blush hidden text-[0.65rem] tracking-[0.2em] uppercase transition-colors sm:block"
            >
              Opportunity Center
            </Link>
            <Button variant="lux" size="sm" asChild>
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                onClick={() => trackStartFreeClick("header")}
              >
                Start Free
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="relative w-full">
          <img
            src={heroPromo.url}
            alt="Build Your Empire Using AI — Her Empire Era featuring founder Abenaa Bailey"
            width={1230}
            height={1536}
            className="h-[100svh] w-full object-cover object-top"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background:
                "linear-gradient(to top, var(--background) 5%, transparent 100%)",
            }}
            aria-hidden="true"
          />
        </div>
        <div className="relative mx-auto -mt-24 flex w-full max-w-6xl flex-col items-center px-5 pb-16 md:-mt-32 md:pb-28">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <Button variant="gold" size="xl" className="w-full sm:w-auto" asChild>
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                onClick={() => trackStartFreeClick("hero")}
              >
                Start Free
              </Link>
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
          eyebrow="What changes for you"
          title={<>Meet Victoria, your 24/7 AI business concierge</>}
          lead="She learns your goals, voice, and audience — then handles the work that usually slows you down."
          glow
        />
        <div className="mt-12 grid gap-x-10 gap-y-9 md:mt-16 md:grid-cols-2 md:gap-x-14 md:gap-y-11">
          {benefits.map((b) => (
            <div key={b.label} className="border-blush/40 flex gap-5 border-t pt-7 md:gap-6">
              <div className="flex flex-col items-start gap-3">
                <span className="bg-gold/10 text-gold flex h-10 w-10 items-center justify-center rounded-full">
                  <b.icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-gold font-display text-xl">{b.label}</span>
              </div>
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
          lead="Three real scenarios members run through Victoria — from a viral reel to a grant deadline. Tap a tab to see her work."
          glow
        />
        <div className="mt-10 md:mt-14">
          <VictoriaDemo />
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="stories" className="bg-secondary/25">
        <SectionHeading
          eyebrow="Member stories"
          title={<>The kind of momentum members create.</>}
          lead="Real results from women building inside Her Empire Era."
        />

        {/* Featured */}
        <figure className="border-border bg-card/60 relative mt-12 overflow-hidden rounded-2xl border p-7 md:mt-16 md:p-10">
          <div className="absolute top-0 right-0 h-32 w-32 opacity-20" aria-hidden="true">
            <div
              className="h-full w-full"
              style={{ backgroundImage: "var(--gradient-blush)" }}
            />
          </div>
          <StarRating />
          <blockquote className="font-display relative mt-5 text-xl leading-snug font-light italic md:text-2xl md:leading-snug">
            “{featuredTestimonial.quote}”
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-4">
            <Avatar initials="DR" />
            <div className="min-w-0">
              <p className="text-sm font-medium">{featuredTestimonial.name}</p>
              <p className="text-blush text-xs tracking-[0.16em] uppercase">
                {featuredTestimonial.role}
              </p>
            </div>
            <span className="border-gold/30 bg-gold/10 text-gold ml-auto rounded-full border px-3 py-1 text-[0.65rem] tracking-[0.14em] uppercase">
              {featuredTestimonial.result}
            </span>
          </figcaption>
        </figure>

        {/* Supporting grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="border-border bg-card/60 flex h-full flex-col rounded-2xl border p-6 md:p-7"
            >
              <StarRating />
              <blockquote className="font-display mt-5 flex-1 text-lg leading-snug font-light italic">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <Avatar initials={t.name.split(" ").map((n) => n[0]).join("")} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-blush text-xs tracking-[0.16em] uppercase">{t.role}</p>
                </div>
              </figcaption>
              <p className="text-gold mt-4 text-[0.65rem] tracking-[0.14em] uppercase">
                {t.result}
              </p>
            </figure>
          ))}
        </div>

        <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed">
          Results shown are representative member scenarios. Individual outcomes depend on effort,
          market, and stage of business.
        </p>
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
            <Link to="/free-prompts" className="hover:text-blush transition-colors">
              Free Prompts
            </Link>
            <Link to="/opportunity-center" className="hover:text-blush transition-colors">
              Opportunities
            </Link>
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
