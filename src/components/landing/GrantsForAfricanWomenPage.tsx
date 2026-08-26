import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Sparkles, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoldRule, Section, SectionHeading } from "@/components/landing/Section";
import { GrantAssistantPanel } from "@/components/landing/GrantAssistantPanel";
import {
  AFRICA_GRANTS,
  AFRICA_GRANT_CATEGORIES,
  AFRICA_GRANTS_FAQ,
  type AfricaGrant,
  type AfricaGrantCategory,
} from "@/lib/grants-africa";
import { trackStartFreeClick } from "@/lib/analytics";

function GrantCard({ grant }: { grant: AfricaGrant }) {
  return (
    <article
      className="border-border/60 bg-card/40 flex flex-col rounded-2xl border p-6 md:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-gold font-display text-[0.65rem] tracking-[0.28em] uppercase">
            {grant.category}
          </p>
          <h3 className="font-display mt-2 text-xl leading-snug font-light md:text-2xl">
            {grant.name}
          </h3>
          <p className="text-blush mt-1 text-[0.7rem] tracking-[0.16em] uppercase">
            {grant.provider}
          </p>
        </div>
        <span className="border-gold/40 text-gold shrink-0 rounded-full border px-3 py-1 text-[0.7rem] font-medium whitespace-nowrap">
          {grant.amount}
        </span>
      </div>

      <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
        {grant.eligibility}
      </p>

      <p className="text-foreground/70 mt-3 text-xs leading-relaxed">
        <span className="text-foreground/90 font-medium">Deadline: </span>
        {grant.deadline}
      </p>

      <p className="text-muted-foreground mt-2 text-xs leading-relaxed italic">
        {grant.notes}
      </p>

      <div className="mt-5 pt-5 border-t border-border/40">
        <a
          href={grant.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-blush hover:text-gold inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        >
          Apply on official site <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

export function GrantsForAfricanWomenPage() {
  const [active, setActive] = useState<AfricaGrantCategory | "All">("All");

  const shown = useMemo(
    () =>
      active === "All"
        ? AFRICA_GRANTS
        : AFRICA_GRANTS.filter((g) => g.category === active),
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
                onClick={() => trackStartFreeClick("africa_grants_header")}
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
          <p className="eyebrow eyebrow-blush">Free resource · 16 grants · Updated 2025</p>
          <h1 className="font-display mt-4 text-[2.3rem] leading-[1.07] font-light md:mt-6 md:text-6xl md:leading-[1.03]">
            Grants for women entrepreneurs in Africa
          </h1>
          <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-[0.95rem] leading-relaxed md:mt-6 md:text-lg">
            16 real grants and funding programmes for women building businesses
            across Africa — from the $5,000 Tony Elumelu Foundation grant to the
            $150,000 Africa Business Heroes prize. No email required. Browse by
            country or region, check your eligibility, and apply directly.
          </p>
          <div className="mt-8 flex justify-center">
            <GoldRule />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <Section className="py-10 md:py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
          <div className="text-center">
            <p className="font-display text-gold text-3xl font-light md:text-4xl">16</p>
            <p className="text-muted-foreground mt-1 text-[0.7rem] tracking-[0.14em] uppercase">
              Active programmes
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-gold text-3xl font-light md:text-4xl">$5K</p>
            <p className="text-muted-foreground mt-1 text-[0.7rem] tracking-[0.14em] uppercase">
              Min. award
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-gold text-3xl font-light md:text-4xl">54</p>
            <p className="text-muted-foreground mt-1 text-[0.7rem] tracking-[0.14em] uppercase">
              Countries eligible
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-gold text-3xl font-light md:text-4xl">$0</p>
            <p className="text-muted-foreground mt-1 text-[0.7rem] tracking-[0.14em] uppercase">
              To apply
            </p>
          </div>
        </div>
      </Section>

      {/* How to qualify */}
      <Section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl leading-snug font-light md:text-4xl">
            How to qualify for an African business grant
          </h2>
          <ol className="text-muted-foreground mt-7 space-y-5 text-sm leading-relaxed md:text-base">
            <li>
              <span className="text-foreground font-medium">1. Register your business.</span>{" "}
              Most programmes require proof of registration: CAC in Nigeria, RWP
              in Ghana, CR12 in Kenya, or CIPC in South Africa. Some — like the
              Tony Elumelu Foundation and SheTrades — accept applications from
              unregistered businesses at the idea stage.
            </li>
            <li>
              <span className="text-foreground font-medium">2. Write a one-page business summary.</span>{" "}
              Describe what you do, who you serve, your revenue or traction, and
              exactly how the grant money will help. You'll reuse this for every
              application — write it once, refine it each time.
            </li>
            <li>
              <span className="text-foreground font-medium">3. Apply to at least five.</span>{" "}
              Grants are competitive across Africa. Apply to rolling-deadline
              programmes first (TEF, SheTrades, AWDF) and annual programmes when
              they open (Cartier, ABH, AWIEF). Track deadlines in a spreadsheet.
            </li>
            <li>
              <span className="text-foreground font-medium">4. Follow up and reapply.</span>{" "}
              If you don't win, reapply the next cycle. Many TEF and Cartier
              winners applied multiple times before being selected. Persistence
              matters more than perfection.
            </li>
          </ol>
        </div>
      </Section>

      {/* Grant library */}
      <Section id="grants" className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="The grants"
          title="16 grants women in Africa can apply for now"
          lead="Filter by country or region. Every grant links to the official application page — no gate, no email required."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2 md:mt-12">
          {(["All", ...AFRICA_GRANT_CATEGORIES] as const).map((c) => (
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
          {shown.map((g) => (
            <GrantCard key={g.name} grant={g} />
          ))}
        </div>
      </Section>

      {/* Victoria AI Grant Assistant (Elite feature) */}
      <Section className="pt-0 md:pt-0">
        <GrantAssistantPanel />
      </Section>

      {/* CTA */}
      <Section className="pt-0 md:pt-0">
        <div className="border-gold/30 bg-card/50 mx-auto max-w-2xl rounded-3xl border p-8 text-center md:p-12">
          <Sparkles className="text-gold mx-auto h-6 w-6" />
          <h2 className="font-display mt-5 text-2xl leading-snug font-light md:text-3xl">
            Need help writing your grant application?
          </h2>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            A free Her Empire Era membership gives you Victoria AI and the
            Empire Prompt Vault — including grant-writing prompts tailored for
            African entrepreneurs. Victoria can help you draft your application,
            structure your business summary for programmes like TEF and Cartier,
            and refine your answers before you submit.
          </p>
          <Button variant="gold" size="xl" className="mt-7 w-full sm:w-auto" asChild>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              onClick={() => trackStartFreeClick("africa_grants_cta")}
            >
              Start Free
            </Link>
          </Button>
          <p className="text-muted-foreground mt-5 text-[0.7rem] tracking-[0.12em] uppercase">
            No card required · Available across Africa
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="pt-0 md:pt-0">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl leading-snug font-light md:text-4xl">
            Questions about grants for women in Africa
          </h2>
          <dl className="mt-8 space-y-7">
            {AFRICA_GRANTS_FAQ.map((item) => (
              <div key={item.q} className="border-border/60 border-t pt-6">
                <dt className="font-display text-lg leading-snug font-light md:text-xl">
                  {item.q}
                </dt>
                <dd className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>

          <div className="text-muted-foreground mt-12 text-sm leading-relaxed">
            <p>
              Next:{" "}
              <Link to="/grants-for-women" className="text-blush hover:text-gold transition-colors">
                US grants for women
              </Link>
              ,{" "}
              <Link to="/chatgpt-prompts" className="text-blush hover:text-gold transition-colors">
                free ChatGPT prompts for business
              </Link>{" "}
              or{" "}
              <Link to="/opportunity-center" className="text-blush hover:text-gold transition-colors">
                the Empire Opportunity Center
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
