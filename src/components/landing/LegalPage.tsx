import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GoldRule } from "@/components/landing/Section";

export interface LegalSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export function LegalPage({
  eyebrow,
  title,
  lead,
  updated,
  sections,
  footnote,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
  footnote?: ReactNode;
}) {
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

      <section className="relative overflow-hidden bg-background">
        <div
          className="absolute inset-x-0 top-0 h-1/2 opacity-40"
          style={{ backgroundImage: "var(--gradient-blush-veil)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-3xl px-5 pt-28 pb-10 md:px-10 md:pt-36 md:pb-14">
          <p className="eyebrow eyebrow-blush">{eyebrow}</p>
          <h1 className="font-display mt-4 text-[2.25rem] leading-[1.1] font-light md:mt-6 md:text-5xl md:leading-[1.05]">
            {title}
          </h1>
          <GoldRule className="mt-7" />
          <p className="text-muted-foreground mt-6 text-[0.95rem] leading-relaxed md:text-base">
            {lead}
          </p>
          <p className="text-muted-foreground mt-5 text-[0.65rem] tracking-[0.18em] uppercase">
            Last updated {updated}
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-3xl px-5 pb-20 md:px-10 md:pb-28">
        <div className="space-y-12 md:space-y-14">
          {sections.map((section, index) => (
            <section key={section.heading}>
              <p className="text-gold/80 text-[0.65rem] tracking-[0.24em] uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display mt-3 text-xl leading-snug font-light md:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-muted-foreground text-[0.9rem] leading-relaxed md:text-[0.95rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-5 space-y-2.5">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-muted-foreground flex gap-3 text-[0.9rem] leading-relaxed md:text-[0.95rem]"
                    >
                      <span className="bg-blush-line mt-2.5 h-px w-4 shrink-0" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {footnote ? (
          <div className="border-border/60 mt-14 border-t pt-8">
            <p className="text-muted-foreground text-[0.85rem] leading-relaxed">{footnote}</p>
          </div>
        ) : null}
      </div>

      <LegalFooter />
    </main>
  );
}

export function LegalFooter() {
  return (
    <footer className="border-border/60 border-t px-5 py-10 md:px-10">
      <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-[0.65rem] tracking-[0.18em] uppercase sm:flex-row sm:text-xs">
        <p className="font-display text-sm tracking-[0.22em]">Her Empire Era</p>
        <nav className="flex items-center gap-5">
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
        <a href="mailto:support@yourempireconcierge.com" className="hover:text-blush transition-colors">
          support@yourempireconcierge.com
        </a>
      </div>
    </footer>
  );
}
