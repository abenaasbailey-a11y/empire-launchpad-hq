import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, Copy, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoldRule, Section, SectionHeading } from "@/components/landing/Section";
import { captureLead } from "@/lib/leads.functions";
import { FREE_PROMPTS, TEASER_COUNT, type FreePrompt } from "@/lib/free-prompts";
import { trackEvent, trackStartFreeClick } from "@/lib/analytics";

const UNLOCK_KEY = "hee_free_prompts_unlocked";

function PromptCard({ prompt, locked }: { prompt: FreePrompt; locked: boolean }) {
  const [copied, setCopied] = useState(false);

  return (
    <article className="border-border/60 bg-card/40 relative overflow-hidden rounded-2xl border p-6 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-gold font-display text-xs tracking-[0.28em]">{prompt.n}</p>
          <h3 className="font-display mt-2 text-xl leading-snug font-light md:text-2xl">
            {prompt.title}
          </h3>
          <p className="text-blush mt-2 text-[0.7rem] tracking-[0.16em] uppercase">{prompt.use}</p>
        </div>
        {locked ? <Lock className="text-muted-foreground mt-1 h-4 w-4 shrink-0" /> : null}
      </div>

      {locked ? (
        <div className="relative mt-5">
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed blur-[5px] select-none">
            {prompt.body}
          </p>
          <div className="from-card/95 absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>
      ) : (
        <>
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
              trackEvent("free_prompt_copy", { prompt: prompt.title });
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
        </>
      )}
    </article>
  );
}

export function FreePromptsPage() {
  const capture = useServerFn(captureLead);
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");
  const packRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(UNLOCK_KEY) === "1") setUnlocked(true);
    } catch {
      /* storage unavailable — the gate simply shows again */
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    const params = new URLSearchParams(window.location.search);
    try {
      await capture({
        data: {
          email: email.trim(),
          source: "free-prompts",
          utm_source: params.get("utm_source") ?? undefined,
          utm_medium: params.get("utm_medium") ?? undefined,
          utm_campaign: params.get("utm_campaign") ?? undefined,
        },
      });
      trackEvent("lead_magnet_optin", { magnet: "free-prompts" });
      try {
        window.localStorage.setItem(UNLOCK_KEY, "1");
      } catch {
        /* ignore */
      }
      setUnlocked(true);
      window.setTimeout(
        () => packRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        80,
      );
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

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
          <Button variant="lux" size="sm" asChild>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              onClick={() => trackStartFreeClick("free_prompts_header")}
            >
              Start Free
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-32 pb-14 md:px-10 md:pt-40 md:pb-20">
        <div
          className="absolute inset-x-0 top-0 h-full opacity-70"
          style={{ backgroundImage: "var(--gradient-blush-veil)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-3xl text-center">
          <p className="eyebrow eyebrow-blush">Free download · No card required</p>
          <h1 className="font-display mt-4 text-[2.4rem] leading-[1.06] font-light md:mt-6 md:text-6xl md:leading-[1.03]">
            10 prompts that do your business&rsquo;s hardest writing for you.
          </h1>
          <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed md:mt-6 md:text-lg">
            Pricing, offers, captions, hooks, website copy, emails, r&eacute;sum&eacute;s and grant
            narratives &mdash; written the way a strategist would ask for them. Copy, paste, and get
            professional work back in minutes.
          </p>
          <div className="mt-8 flex justify-center">
            <GoldRule />
          </div>
        </div>
      </section>

      {/* Teaser + gate */}
      <Section id="pack" className="pt-0 md:pt-0">
        <div ref={packRef} className="scroll-mt-24">
          <SectionHeading
            eyebrow={unlocked ? "Your pack" : "A look inside"}
            title={
              unlocked ? (
                <>
                  All 10 prompts, unlocked.
                </>
              ) : (
                <>
                  Read the first three. Then take all ten.
                </>
              )
            }
            lead={
              unlocked
                ? "Copy any prompt and paste it into Victoria or any AI tool. Fill the brackets with your own details for the best result."
                : "These are the real prompts — nothing watered down. Enter your email below to unlock the remaining seven."
            }
          />
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">
          {FREE_PROMPTS.map((p, i) => (
            <PromptCard key={p.n} prompt={p} locked={!unlocked && i >= TEASER_COUNT} />
          ))}
        </div>
      </Section>

      {/* Gate form */}
      {!unlocked ? (
        <Section className="pt-0 md:pt-0">
          <div className="border-gold/30 bg-card/50 mx-auto max-w-2xl rounded-3xl border p-8 text-center md:p-12">
            <Sparkles className="text-gold mx-auto h-6 w-6" />
            <h2 className="font-display mt-5 text-2xl leading-snug font-light md:text-3xl">
              Unlock all 10 prompts free.
            </h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Enter your email and the full pack opens on this page instantly &mdash; no download, no
              waiting.
            </p>
            <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="lead-email">
                Email address
              </label>
              <input
                id="lead-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                autoCapitalize="none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="border-input bg-background/60 text-foreground placeholder:text-muted-foreground focus:ring-ring h-14 w-full flex-1 rounded-full border px-6 text-base outline-none focus:ring-1 sm:text-sm"
              />
              <Button
                type="submit"
                variant="gold"
                size="xl"
                disabled={status === "saving"}
                className="w-full sm:w-auto"
              >
                {status === "saving" ? "Unlocking…" : "Unlock the pack"}
              </Button>
            </form>
            {error ? <p className="text-blush mt-4 text-sm">{error}</p> : null}
            <p className="text-muted-foreground mt-5 text-[0.7rem] leading-relaxed tracking-[0.12em] uppercase">
              We keep your email private. Unsubscribe anytime.
            </p>
          </div>
        </Section>
      ) : (
        <Section className="pt-0 md:pt-0">
          <div className="border-gold/30 bg-card/50 mx-auto max-w-2xl rounded-3xl border p-8 text-center md:p-12">
            <p className="eyebrow eyebrow-blush">The next step</p>
            <h2 className="font-display mt-4 text-2xl leading-snug font-light md:text-3xl">
              Prompts are the shortcut. Victoria is the concierge.
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Your free membership gives you Victoria &mdash; she runs these prompts with you,
              remembers your business, and keeps the full Empire Prompt Vault of 56 prompts open.
            </p>
            <Button variant="gold" size="xl" className="mt-7 w-full sm:w-auto" asChild>
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                onClick={() => trackStartFreeClick("free_prompts_unlocked")}
              >
                Start Free
              </Link>
            </Button>
          </div>
        </Section>
      )}

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
