import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GoldRule, BlushRule } from "@/components/landing/Section";
import { LegalFooter } from "@/components/landing/LegalPage";
import crownMark from "@/assets/crown-mark-transparent.png";
import { useIsAdmin } from "@/hooks/use-admin";

type Pitch = {
  id: string;
  badge: string;
  title: string;
  description: string;
  subject: string;
  body: string[];
};

const PITCHES: Pitch[] = [
  {
    id: "personal",
    badge: "Founder Story",
    title: "A teacher turned AI founder",
    description:
      "Leads with Abenaa's personal journey. Best for women's business media, culture publications, and podcasts that love a founder narrative.",
    subject: "A teacher turned AI founder is helping women build businesses from their phones",
    body: [
      "Hi [Editor's name],",
      "",
      "Abenaa Bailey never planned to build an AI company. With a Master's in Education and a career spent helping people learn, she kept meeting women who had the vision, the drive, and the audience — but not the tools to turn it into a real business.",
      "",
      "So she built one.",
      "",
      "Her Empire Era is a luxury AI-powered business ecosystem designed specifically for women entrepreneurs. At the center is Victoria, an AI business concierge that helps users draft grants, write marketing copy, plan their business, and find funding opportunities — all from their phone.",
      "",
      "What started as one woman's solution has become a growing movement:",
      "",
      "• Victoria AI — trained on grant writing, business planning, and marketing for small businesses, not a generic chatbot repackaged",
      "• The Empire Prompt Vault — a library of 56 ready-to-use AI prompts across 7 business categories",
      "• The Opportunity Center — AI-matched side hustles and grant opportunities",
      "• A free tier that removes the barrier — women start free and get immediate value",
      "• A founder who lives the mission — Abenaa built the platform herself, as a woman entrepreneur building her own empire while helping others build theirs",
      "",
      "The \"Women in AI\" conversation is everywhere — but it's missing stories about women who aren't just using AI, they're building with it and building for their community. Abenaa is one of them.",
      "",
      "Full press kit with high-res photos, founder bio, and brand assets:",
      "https://herempireera.com/press",
      "",
      "I can set up an interview with Abenaa, arrange a product walkthrough, or provide a guest article on \"How a Teacher Became an AI Founder.\" What works best for your editorial calendar?",
      "",
      "Warm regards,",
      "Abenaa Bailey",
      "Founder, Her Empire Era",
      "abenaasbailey@gmail.com",
    ],
  },
  {
    id: "product",
    badge: "Product & Trend",
    title: "Women in AI — the product story",
    description:
      "Leads with the trend and product, mentioning Abenaa briefly. Best for tech publications, AI newsletters, and outlets that care about the market angle.",
    subject: "Women are using AI to build businesses from their phones — here's the app doing it",
    body: [
      "Hi [Editor's name],",
      "",
      "Women entrepreneurs are the fastest-growing segment of new business owners — but most AI tools are built for Silicon Valley, not for the woman launching her brand from her kitchen table at midnight.",
      "",
      "Her Empire Era is changing that. It's a luxury AI-powered business ecosystem built specifically for women — featuring Victoria, an AI business concierge that helps users draft grants, write marketing copy, plan their business, and find funding opportunities in real time.",
      "",
      "What makes it worth a look:",
      "",
      "• AI that actually serves women founders — not a generic chatbot repackaged. Victoria is trained on grant writing, business planning, and marketing for small businesses.",
      "• A free tier that removes the barrier — women can start free and get immediate value (AI prompts, grant database, business tools).",
      "• A real founder story — Abenaa Bailey, M.Ed., built this after seeing how many women had the vision but not the tools.",
      "• Built for mobile — most users access it from their phones, not a laptop.",
      "",
      "The \"Women in AI\" conversation is happening everywhere right now — but it's missing stories about products actually built for women, by a woman. This is one.",
      "",
      "Full press kit with high-res photos, founder bio, and brand assets:",
      "https://herempireera.com/press",
      "",
      "I can set up an interview with Abenaa, arrange a product walkthrough, or provide a guest article on \"How Women Are Using AI to Build Empires.\" What works best for your editorial calendar?",
      "",
      "Warm regards,",
      "Abenaa Bailey",
      "Founder, Her Empire Era",
      "abenaasbailey@gmail.com",
    ],
  },
];

function PitchCard({ pitch }: { pitch: Pitch }) {
  const [copied, setCopied] = useState(false);

  const fullText = `Subject: ${pitch.subject}\n\n${pitch.body.join("\n")}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = fullText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="border-border/60 border-t pt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow eyebrow-blush">{pitch.badge}</span>
          <h3 className="font-display mt-2 text-[1.5rem] leading-tight font-light md:text-2xl">
            {pitch.title}
          </h3>
        </div>
        <Button
          variant={copied ? "outline" : "lux"}
          size="sm"
          onClick={handleCopy}
          className="shrink-0"
        >
          {copied ? "Copied ✓" : "Copy pitch"}
        </Button>
      </div>

      <p className="text-muted-foreground mt-3 max-w-2xl text-[0.9rem] leading-relaxed">
        {pitch.description}
      </p>

      <BlushRule className="mt-6" />

      <div className="bg-card/50 mt-6 overflow-hidden rounded-sm border border-border/40">
        <div className="border-border/40 border-b px-5 py-3">
          <p className="text-gold/80 text-[0.6rem] tracking-[0.24em] uppercase">
            Subject line
          </p>
          <p className="font-display mt-1 text-[0.95rem] font-light leading-snug">
            {pitch.subject}
          </p>
        </div>
        <div className="px-5 py-4">
          <pre className="whitespace-pre-wrap font-sans text-[0.88rem] leading-relaxed text-foreground/90">
{pitch.body.join("\n")}
          </pre>
        </div>
      </div>
    </article>
  );
}

export function PitchTemplatesPage() {
  const { isAdmin, isLoading } = useIsAdmin();

  if (isLoading) {
    return (
      <main className="bg-background min-h-screen">
        <div className="flex items-center justify-center py-32">
          <img src={crownMark} alt="" className="h-10 w-10 opacity-50" />
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="bg-background min-h-screen">
        <div className="mx-auto flex max-w-md flex-col items-center px-5 py-32 text-center">
          <img src={crownMark} alt="Her Empire Era" className="h-14 w-14" />
          <h1 className="font-display mt-6 text-2xl font-light">
            Members Only
          </h1>
          <GoldRule className="mt-5" />
          <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
            The pitch templates are reserved for the founder. Sign in with your
            admin account to view and copy them.
          </p>
          <Button variant="lux" size="lg" asChild className="mt-8">
            <Link to="/auth">Sign in</Link>
          </Button>
        </div>
      </main>
    );
  }

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
            <Button variant="outline" size="sm" asChild>
              <Link to="/press">View Press Kit</Link>
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
        <div className="relative mx-auto w-full max-w-4xl px-5 pt-28 pb-12 md:px-10 md:pt-36 md:pb-16">
          <p className="eyebrow eyebrow-blush">Founder Tools</p>
          <h1 className="font-display mt-4 text-[2.1rem] leading-[1.1] font-light md:text-[3rem] md:leading-[1.05]">
            Press Pitch
            <span className="text-gold block">Templates</span>
          </h1>
          <GoldRule className="mt-7" />
          <p className="text-muted-foreground mt-6 max-w-2xl text-[0.95rem] leading-relaxed md:text-base">
            Two ready-to-send pitch emails for editors, producers, and podcast
            hosts. Choose the one that fits the outlet, copy it, and send.
            Replace <span className="text-gold">[Editor's name]</span> with the
            recipient's name before sending.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="lux" size="lg" asChild>
              <a href="#pitches">View pitches</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:press@yourempireconcierge.com">Press email</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Pitches */}
      <section
        id="pitches"
        className="border-border/60 scroll-mt-20 border-t md:scroll-mt-24"
      >
        <div className="mx-auto w-full max-w-4xl px-5 py-14 md:px-10 md:py-20">
          <div className="space-y-14">
            {PITCHES.map((pitch) => (
              <PitchCard key={pitch.id} pitch={pitch} />
            ))}
          </div>

          <div className="mt-16 rounded-sm border border-border/40 bg-card/30 px-5 py-6 md:px-8">
            <p className="eyebrow">Quick tips</p>
            <BlushRule className="mt-4" />
            <ul className="mt-5 space-y-3 text-[0.9rem] leading-relaxed text-muted-foreground">
              <li>
                <span className="text-gold">Founder Story</span> — best for
                women's business media, culture publications, and podcasts
                (Essence, Black Enterprise, Ellevate).
              </li>
              <li>
                <span className="text-gold">Product & Trend</span> — best
                for tech and AI outlets (TechCrunch, Wired, AI newsletters).
              </li>
              <li>
                Always include the{" "}
                <span className="text-gold">/press</span> link so editors can
                self-serve your photos and bio.
              </li>
              <li>
                Personalize the subject line or opening if you know the
                editor's beat.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <LegalFooter />
    </main>
  );
}
