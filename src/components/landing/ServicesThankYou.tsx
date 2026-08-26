import { Link } from "@tanstack/react-router";
import { Check, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoldRule, Section } from "@/components/landing/Section";

const headerLink =
  "text-[0.65rem] tracking-[0.2em] uppercase transition-colors hover:text-gold/80";

export function ServicesThankYou() {
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
            <Link to="/membership" className={`text-gold ${headerLink}`}>
              Membership
            </Link>
            <Button variant="lux" size="sm" asChild>
              <Link to="/services">Request</Link>
            </Button>
          </div>
        </div>
      </header>

      <Section className="min-h-[80vh] pt-32 md:pt-40">
        <div className="border-gold/30 bg-card/50 relative mx-auto max-w-2xl overflow-hidden rounded-3xl border p-8 text-center md:p-12">
          <div
            className="absolute inset-x-0 top-0 h-40 opacity-60"
            style={{ backgroundImage: "var(--gradient-blush-veil)" }}
            aria-hidden="true"
          />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-background">
              <Check className="text-gold h-7 w-7" aria-hidden="true" />
            </div>

            <p className="eyebrow eyebrow-blush mt-6 flex items-center justify-center gap-2">
              <Sparkles className="text-gold h-3.5 w-3.5" aria-hidden="true" /> Request received
            </p>

            <h1 className="font-display mt-4 text-[2rem] leading-[1.08] font-light md:text-4xl">
              Thank you — your project request is in
            </h1>

            <div className="mt-6 flex justify-center">
              <GoldRule />
            </div>

            <p className="text-muted-foreground mx-auto mt-6 max-w-lg text-[0.95rem] leading-relaxed md:text-base">
              We'll review your details and email you a <span className="text-foreground">fixed
              quote</span> with a secure invoice within one business day. Keep an eye on your
              inbox (and spam folder) for a message from{" "}
              <span className="text-gold">support@yourempireconcierge.com</span>.
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm">
              <Mail className="text-gold h-4 w-4" aria-hidden="true" />
              <span className="text-muted-foreground">No payment taken yet — you pay only after approving your quote.</span>
            </div>

            <div className="mt-10 rounded-2xl border border-border/60 bg-background/60 p-6 text-left">
              <p className="eyebrow eyebrow-blush">While you wait</p>
              <h2 className="font-display mt-3 text-xl leading-snug font-light md:text-2xl">
                Join free and start building today
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Create a free account to unlock Victoria AI, the Empire Prompt Vault
                previews, and our free grant directory — no credit card required.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button variant="gold" size="lg" asChild>
                  <Link to="/join">Join free</Link>
                </Button>
                <Button variant="lux" size="lg" asChild>
                  <Link to="/grants-for-women">Browse free grants</Link>
                </Button>
              </div>
            </div>

            <p className="text-muted-foreground mt-8 text-sm leading-relaxed">
              Want to add more details to your request?{" "}
              <Link to="/services" className="text-blush hover:text-gold transition-colors">
                Send another request
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <footer className="border-border/60 border-t px-5 py-10 md:px-10">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-[0.65rem] tracking-[0.18em] uppercase sm:flex-row sm:text-xs">
          <p className="font-display text-sm tracking-[0.22em]">Her Empire Era</p>
          <nav className="flex flex-wrap items-center justify-center gap-5">
            <Link to="/join" className="hover:text-blush transition-colors">
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
