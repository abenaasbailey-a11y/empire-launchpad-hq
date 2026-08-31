import { Link } from "@tanstack/react-router";
import { Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoldRule, Section, SectionHeading } from "@/components/landing/Section";
import { SiteFooter, SiteHeader } from "@/components/landing/SiteChrome";
import { AI_TOOLS_FAQ, AI_TOOL_USES } from "@/lib/ai-tools-for-women";
import { trackStartFreeClick } from "@/lib/analytics";

const TIERS = [
  {
    name: "Member",
    price: "$19.99",
    note: "Victoria AI, the Prompt Vault and the Opportunity Center.",
  },
  {
    name: "Elite",
    price: "$49.99",
    note: "Everything in Member plus the Grant Finder & Application Assistant.",
    featured: true,
  },
  {
    name: "VIP",
    price: "$99.00",
    note: "Everything in Elite plus priority access and the deepest support.",
  },
];

export function AiToolsForWomenPage() {
  return (
    <main>
      <SiteHeader ctaLocation="ai_tools_header" />

      <section className="relative overflow-hidden px-5 pt-32 pb-12 md:px-10 md:pt-40 md:pb-16">
        <div
          className="absolute inset-x-0 top-0 h-full opacity-70"
          style={{ backgroundImage: "var(--gradient-blush-veil)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-3xl text-center">
          <p className="eyebrow eyebrow-blush">For women entrepreneurs</p>
          <h1 className="font-display mt-4 text-[2.3rem] leading-[1.07] font-light md:mt-6 md:text-6xl md:leading-[1.03]">
            AI business tools for women who run everything themselves
          </h1>
          <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-[0.95rem] leading-relaxed md:mt-6 md:text-lg">
            One private platform for the work you keep putting off — strategy,
            content, client communication and funding. Victoria AI plus a
            curated prompt library, built for business owners with no team and
            no time to learn another dashboard.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="gold" size="xl" asChild>
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                onClick={() => trackStartFreeClick("ai_tools_hero")}
              >
                Start Free
              </Link>
            </Button>
            <Button variant="lux" size="xl" asChild>
              <Link to="/membership">See membership</Link>
            </Button>
          </div>
          <p className="text-muted-foreground mt-5 text-[0.7rem] tracking-[0.12em] uppercase">
            No card required to start
          </p>
          <div className="mt-8 flex justify-center">
            <GoldRule />
          </div>
        </div>
      </section>

      <Section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl leading-snug font-light md:text-4xl">
            The problem isn't effort. It's everything landing on one desk.
          </h2>
          <p className="text-muted-foreground mt-6 text-sm leading-relaxed md:text-base">
            You are the marketing department, the sales team, the bookkeeper and
            the person who answers the messages at 10 p.m. Generic AI tools hand
            you a blank box and a cursor. Her Empire Era hands you the exact
            question to ask, in the order that produces revenue: decide the
            offer, price it, write the copy, get it in front of people, and
            fund the next step.
          </p>
        </div>
      </Section>

      <Section id="tools" className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="What's inside"
          title="Six AI tools that replace the work you're doing manually"
          lead="Every tool is built for a specific business job — not a feature list you'll never open twice."
        />
        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2">
          {AI_TOOL_USES.map((tool) => (
            <article
              key={tool.name}
              className="border-border/60 bg-card/40 flex flex-col rounded-2xl border p-6 md:p-7"
            >
              <p className="text-gold font-display text-[0.65rem] tracking-[0.28em] uppercase">
                {tool.category}
              </p>
              <h3 className="font-display mt-2 text-xl leading-snug font-light md:text-2xl">
                {tool.name}
              </h3>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                {tool.what}
              </p>
              <p className="text-foreground/75 mt-3 text-sm leading-relaxed">
                {tool.how}
              </p>
              <p className="text-blush mt-5 border-t border-border/40 pt-4 text-[0.7rem] tracking-[0.16em] uppercase">
                Included in {tool.inside}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="Membership"
          title="Choose the level of help you need"
          lead="Start free, then upgrade when the tools are paying for themselves. Cancel yourself, any time."
        />
        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={
                tier.featured
                  ? "border-gold/50 bg-card/60 rounded-2xl border p-6 md:p-7"
                  : "border-border/60 bg-card/40 rounded-2xl border p-6 md:p-7"
              }
            >
              <p className="text-gold font-display text-[0.65rem] tracking-[0.28em] uppercase">
                {tier.name}
              </p>
              <p className="font-display mt-3 text-3xl font-light md:text-4xl">
                {tier.price}
                <span className="text-muted-foreground text-sm"> / month</span>
              </p>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                {tier.note}
              </p>
              <Button variant="lux" size="sm" className="mt-6 w-full" asChild>
                <Link to="/membership">View plan</Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl leading-snug font-light md:text-4xl">
            Prefer it done for you?
          </h2>
          <p className="text-muted-foreground mt-5 text-sm leading-relaxed md:text-base">
            Some work is worth handing over entirely. Our team writes government
            and foundation grant applications, business plans, résumés and
            marketing packages — professionally written, submission-ready, with
            revisions included.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Government grant applications from $350",
              "Business plans from $300",
              "Résumé and cover letter packages from $150",
            ].map((line) => (
              <li key={line} className="text-foreground/80 flex items-start gap-3 text-sm">
                <Check className="text-gold mt-0.5 h-4 w-4 shrink-0" />
                {line}
              </li>
            ))}
          </ul>
          <Button variant="gold" size="lg" className="mt-7" asChild>
            <Link to="/services">Request a quote</Link>
          </Button>
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <div className="border-gold/30 bg-card/50 mx-auto max-w-2xl rounded-3xl border p-8 text-center md:p-12">
          <Sparkles className="text-gold mx-auto h-6 w-6" />
          <h2 className="font-display mt-5 text-2xl leading-snug font-light md:text-3xl">
            Meet Victoria before you pay anything
          </h2>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            A free account gives you Victoria AI, free prompts and the grant
            directories. Ask her one real question about your business and see
            what comes back.
          </p>
          <Button variant="gold" size="xl" className="mt-7 w-full sm:w-auto" asChild>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              onClick={() => trackStartFreeClick("ai_tools_cta")}
            >
              Start Free
            </Link>
          </Button>
        </div>
      </Section>

      <Section id="faq" className="pt-0 md:pt-0">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl leading-snug font-light md:text-4xl">
            Questions about AI tools and membership
          </h2>
          <dl className="mt-8 space-y-7">
            {AI_TOOLS_FAQ.map((item) => (
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
          <p className="text-muted-foreground mt-12 text-sm leading-relaxed">
            More answers on the{" "}
            <Link to="/faq" className="text-blush hover:text-gold transition-colors">
              full FAQ
            </Link>
            , or read the{" "}
            <Link to="/blog" className="text-blush hover:text-gold transition-colors">
              Empire Journal
            </Link>
            .
          </p>
        </div>
      </Section>

      <SiteFooter />
    </main>
  );
}
