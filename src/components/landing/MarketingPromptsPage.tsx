import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoldRule, Section, SectionHeading } from "@/components/landing/Section";
import {
  MARKETING_PROMPTS,
  MARKETING_PROMPT_CATEGORIES,
  MARKETING_PROMPT_FAQ,
  type MarketingPrompt,
} from "@/lib/marketing-prompts";
import { trackEvent, trackStartFreeClick } from "@/lib/analytics";

function PromptCard({ prompt }: { prompt: MarketingPrompt }) {
  const [copied, setCopied] = useState(false);

  return (
    <article
      id={prompt.slug}
      className="border-border/60 bg-card/40 scroll-mt-28 rounded-2xl border p-6 md:p-7"
    >
      <p className="text-gold font-display text-[0.65rem] tracking-[0.28em] uppercase">
        {prompt.category}
      </p>
      <h3 className="font-display mt-2 text-xl leading-snug font-light md:text-2xl">
        {prompt.title}
      </h3>
      <p className="text-blush mt-2 text-[0.7rem] tracking-[0.16em] uppercase">{prompt.use}</p>
      <p className="text-muted-foreground mt-5 text-sm leading-relaxed whitespace-pre-line">
        {prompt.body}
      </p>
      <Button
        type="button"
        variant="lux"
        size="sm"
        className="mt-5"
        onClick={() => {
          void navigator.clipboard?.writeText(prompt.body);
          setCopied(true);
          trackEvent("marketing_prompt_copy", { prompt: prompt.slug });
          window.setTimeout(() => setCopied(false), 1800);
        }}
      >
        {copied ? (
          <>
            <Check className="mr-2 h-3.5 w-3.5" /> Copied
          </>
        ) : (
          <>
            <Copy className="mr-2 h-3.5 w-3.5" /> Copy prompt
          </>
        )}
      </Button>
    </article>
  );
}

export function MarketingPromptsPage() {
  const [active, setActive] = useState<string>("All");

  const shown = useMemo(
    () =>
      active === "All"
        ? MARKETING_PROMPTS
        : MARKETING_PROMPTS.filter((p) => p.category === active),
    [active],
  );

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
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                onClick={() => trackStartFreeClick("marketing_prompts_header")}
              >
                Start Free
              </Link>
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
          <p className="eyebrow eyebrow-blush">Free · Nothing to unlock</p>
          <h1 className="font-display mt-4 text-[2.3rem] leading-[1.07] font-light md:mt-6 md:text-6xl md:leading-[1.03]">
            Marketing prompts for ChatGPT
          </h1>
          <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-[0.95rem] leading-relaxed md:mt-6 md:text-lg">
            Sixteen free marketing prompts for positioning, website copy, social captions, email
            sequences, launches and ads. Copy any of them, fill in the brackets with your own
            details, and paste into ChatGPT, Claude, Gemini or Victoria.
          </p>
          <div className="mt-8 flex justify-center">
            <GoldRule />
          </div>
        </div>
      </section>

      {/* How to use */}
      <Section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl leading-snug font-light md:text-4xl">
            What makes a marketing prompt work
          </h2>
          <ol className="text-muted-foreground mt-7 space-y-5 text-sm leading-relaxed md:text-base">
            <li>
              <span className="text-foreground font-medium">1. Name the role.</span> Every prompt
              below starts with &ldquo;act as&rdquo; because it sets the standard of the answer &mdash;
              a positioning strategist writes differently from a general assistant.
            </li>
            <li>
              <span className="text-foreground font-medium">2. Give real inputs.</span> Replace each
              bracket with your actual offer, price, audience and numbers. Generic input is the
              reason AI marketing copy sounds generic.
            </li>
            <li>
              <span className="text-foreground font-medium">3. Ask for a format.</span> Tell the AI
              the structure you want &mdash; sections, word limits, how many variations &mdash; so the
              output is usable without a rewrite.
            </li>
            <li>
              <span className="text-foreground font-medium">4. Revise one part at a time.</span> Ask
              for a single section to be rewritten instead of regenerating the whole answer, and the
              quality climbs quickly.
            </li>
          </ol>
        </div>
      </Section>

      {/* Prompt library */}
      <Section id="prompts" className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="The prompts"
          title="Copy any marketing prompt below"
          lead="Filter by what you need today. Every prompt is complete — no email, no gate."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2 md:mt-12">
          {["All", ...MARKETING_PROMPT_CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={
                active === c
                  ? "border-gold/60 bg-gold/10 text-foreground rounded-full border px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase transition-colors"
                  : "border-border/60 text-muted-foreground hover:text-foreground rounded-full border px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase transition-colors"
              }
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2">
          {shown.map((p) => (
            <PromptCard key={p.slug} prompt={p} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="pt-0 md:pt-0">
        <div className="border-gold/30 bg-card/50 mx-auto max-w-2xl rounded-3xl border p-8 text-center md:p-12">
          <Sparkles className="text-gold mx-auto h-6 w-6" />
          <h2 className="font-display mt-5 text-2xl leading-snug font-light md:text-3xl">
            Want all 56 prompts and an AI who knows your business?
          </h2>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            A free Her Empire Era membership opens the Empire Prompt Vault &mdash; 56 prompts across
            marketing, social media, grants, planning, emails, r&eacute;sum&eacute;s and productivity
            &mdash; plus Victoria, who runs them with you and remembers your details.
          </p>
          <Button variant="gold" size="xl" className="mt-7 w-full sm:w-auto" asChild>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              onClick={() => trackStartFreeClick("marketing_prompts_cta")}
            >
              Start Free
            </Link>
          </Button>
          <p className="text-muted-foreground mt-5 text-[0.7rem] tracking-[0.12em] uppercase">
            No card required
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="pt-0 md:pt-0">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl leading-snug font-light md:text-4xl">
            Questions about marketing prompts
          </h2>
          <dl className="mt-8 space-y-7">
            {MARKETING_PROMPT_FAQ.map((item) => (
              <div key={item.q} className="border-border/60 border-t pt-6">
                <dt className="font-display text-lg leading-snug font-light md:text-xl">{item.q}</dt>
                <dd className="text-muted-foreground mt-3 text-sm leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>

          <div className="text-muted-foreground mt-12 text-sm leading-relaxed">
            <p>
              Next:{" "}
              <Link to="/grants-for-women" className="text-blush hover:text-gold transition-colors">
                grants for women business owners
              </Link>
              ,{" "}
              <Link to="/chatgpt-prompts" className="text-blush hover:text-gold transition-colors">
                free ChatGPT prompts for business
              </Link>
              ,{" "}
              <Link to="/free-prompts" className="text-blush hover:text-gold transition-colors">
                the 10-prompt starter pack
              </Link>{" "}
              or{" "}
              <Link to="/meet-victoria" className="text-blush hover:text-gold transition-colors">
                meet Victoria
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <footer className="border-border/60 border-t px-5 py-10 md:px-10">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-[0.65rem] tracking-[0.18em] uppercase sm:flex-row sm:text-xs">
          <p className="font-display text-sm tracking-[0.22em]">Her Empire Era</p>
          <nav className="flex items-center gap-5">
            <Link to="/join" className="hover:text-blush transition-colors">
              Membership
            </Link>
            <Link to="/membership" className="hover:text-blush transition-colors">
              Membership
            </Link>
            <Link to="/services" className="hover:text-blush transition-colors">
              Services
            </Link>
            <Link to="/press" className="hover:text-blush transition-colors">
              Press
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
          <p>herempireera.com</p>
        </div>
      </footer>
    </main>
  );
}
