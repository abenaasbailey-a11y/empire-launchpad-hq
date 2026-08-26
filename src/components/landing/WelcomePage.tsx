import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2, Mail, Sparkles, Compass, Vault, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoldRule, Section } from "@/components/landing/Section";
import {
  getMyOnboarding,
  setMyOnboardingStep,
  type OnboardingStepKey,
} from "@/lib/onboarding.functions";

const headerLink =
  "text-[0.65rem] tracking-[0.2em] uppercase transition-colors hover:text-gold/80";

const steps: {
  key: OnboardingStepKey;
  icon: typeof Compass;
  title: string;
  body: string;
  cta: string;
  to: string;
}[] = [
  {
    key: "victoria",
    icon: Compass,
    title: "Meet Victoria",
    body: "Tell Victoria your offer, your audience and your goals. She drafts content, pricing and plans in your voice — 24/7.",
    cta: "Open Victoria AI",
    to: "/meet-victoria",
  },
  {
    key: "prompt-vault",
    icon: Vault,
    title: "Browse the Prompt Vault",
    body: "56 ready-to-run prompts for marketing, grants, résumés and content. Copy, paste and let the AI do the heavy lifting.",
    cta: "Open the Vault",
    to: "/prompt-vault",
  },
  {
    key: "opportunities",
    icon: Sparkles,
    title: "Find your next move",
    body: "The Opportunity Center matches side hustles to your skills and goals — with a Gemini-powered recommendation engine.",
    cta: "Explore opportunities",
    to: "/opportunity-center",
  },
];

export function WelcomePage() {
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
            <Link to="/membership" className={`text-gold ${headerLink}`}>
              Membership
            </Link>
            <Button variant="lux" size="sm" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <Section className="min-h-[88vh] pt-32 md:pt-40">
        <div className="border-gold/30 bg-card/50 relative mx-auto max-w-3xl overflow-hidden rounded-3xl border p-8 text-center md:p-14">
          <div
            className="absolute inset-x-0 top-0 h-40 opacity-60"
            style={{ backgroundImage: "var(--gradient-blush-veil)" }}
            aria-hidden="true"
          />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-background">
              <Crown className="text-gold h-7 w-7" aria-hidden="true" />
            </div>

            <p className="eyebrow eyebrow-blush mt-6 flex items-center justify-center gap-2">
              <Sparkles className="text-gold h-3.5 w-3.5" aria-hidden="true" /> Your free membership is active
            </p>

            <h1 className="font-display mt-4 text-[2rem] leading-[1.08] font-light md:text-[2.75rem]">
              Welcome to your <span className="text-gold">empire era</span>
            </h1>

            <div className="mt-6 flex justify-center">
              <GoldRule />
            </div>

            <p className="text-muted-foreground mx-auto mt-6 max-w-lg text-[0.95rem] leading-relaxed md:text-base">
              You're in — no card required, no waiting. Victoria and the full Empire toolkit are
              unlocked right now. Here's exactly what to do next to start building today.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-2">
              <Check className="text-gold h-4 w-4" aria-hidden="true" />
              <span className="text-muted-foreground">Account created · Free forever plan active</span>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="mx-auto mt-10 max-w-3xl">
          <p className="eyebrow eyebrow-blush text-center">Your first three moves</p>
          <div className="mt-6 grid gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="border-border/60 bg-card/40 hover:border-gold/40 group rounded-2xl border p-6 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/10 text-gold flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-[0.65rem] tracking-[0.24em] uppercase">
                          Step {i + 1}
                        </span>
                      </div>
                      <h2 className="font-display mt-1 text-xl font-light md:text-2xl">
                        {step.title}
                      </h2>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {step.body}
                      </p>
                      <Button variant="gold" size="sm" asChild className="mt-4">
                        <Link to={step.to}>{step.cta}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upgrade prompt */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="border-gold/30 bg-gold/5 relative overflow-hidden rounded-3xl border p-8 text-center md:p-10">
            <p className="eyebrow eyebrow-blush">Ready to go further?</p>
            <h2 className="font-display mt-3 text-2xl font-light md:text-3xl">
              Upgrade to <span className="text-gold">Elite</span> and unlock the Grant Finder
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm leading-relaxed">
              Elite members get the AI Grant Finder & Application Assistant, unlimited Victoria
              drafts, and priority weekly picks — for $49.99/month.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="gold" size="lg" asChild>
                <Link to="/membership">See membership tiers</Link>
              </Button>
              <Button variant="lux" size="lg" asChild>
                <Link to="/dashboard">Go to my dashboard</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-2 text-sm">
          <Mail className="text-gold h-4 w-4" aria-hidden="true" />
          <span className="text-muted-foreground">
            Questions? Reply to any email from{" "}
            <span className="text-gold">support@yourempireconcierge.com</span>.
          </span>
        </div>
      </Section>

      <footer className="border-border/60 border-t px-5 py-10 md:px-10">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-[0.65rem] tracking-[0.18em] uppercase sm:flex-row sm:text-xs">
          <p className="font-display text-sm tracking-[0.22em]">Her Empire Era</p>
          <nav className="flex flex-wrap items-center justify-center gap-5">
            <Link to="/" className="hover:text-blush transition-colors">
              Home
            </Link>
            <Link to="/membership" className="hover:text-blush transition-colors">
              Membership
            </Link>
            <Link to="/privacy" className="hover:text-blush transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-blush transition-colors">
              Terms
            </Link>
          </nav>
          <a href="mailto:support@yourempireconcierge.com" className="hover:text-blush transition-colors">
            support@yourempireconcierge.com
          </a>
        </div>
      </footer>
    </main>
  );
}
