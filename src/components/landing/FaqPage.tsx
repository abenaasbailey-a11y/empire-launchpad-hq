import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GoldRule, Section } from "@/components/landing/Section";
import { SiteFooter, SiteHeader } from "@/components/landing/SiteChrome";
import { FAQ_GROUPS } from "@/lib/site-faq";
import { trackStartFreeClick } from "@/lib/analytics";

export function FaqPage() {
  return (
    <main>
      <SiteHeader ctaLocation="faq_header" />

      <section className="relative overflow-hidden px-5 pt-32 pb-12 md:px-10 md:pt-40 md:pb-16">
        <div
          className="absolute inset-x-0 top-0 h-full opacity-70"
          style={{ backgroundImage: "var(--gradient-blush-veil)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-3xl text-center">
          <p className="eyebrow eyebrow-blush">Everything answered</p>
          <h1 className="font-display mt-4 text-[2.3rem] leading-[1.07] font-light md:mt-6 md:text-6xl md:leading-[1.03]">
            Frequently asked questions
          </h1>
          <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-[0.95rem] leading-relaxed md:mt-6 md:text-lg">
            Memberships, pricing, Victoria AI, grants and done-for-you services
            — in plain language, with no fine print buried at the bottom.
          </p>
          <div className="mt-8 flex justify-center">
            <GoldRule />
          </div>
        </div>
      </section>

      <Section className="py-8 md:py-10">
        <nav className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
          {FAQ_GROUPS.map((g) => (
            <a
              key={g.title}
              href={`#${slug(g.title)}`}
              className="border-border/60 text-muted-foreground hover:text-foreground rounded-full border px-4 py-2 text-[0.7rem] tracking-[0.16em] uppercase transition-colors"
            >
              {g.title}
            </a>
          ))}
        </nav>
      </Section>

      {FAQ_GROUPS.map((group) => (
        <Section key={group.title} id={slug(group.title)} className="pt-0 md:pt-0">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl leading-snug font-light md:text-4xl">
              {group.title}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {group.blurb}
            </p>
            <dl className="mt-8 space-y-7">
              {group.items.map((item) => (
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
          </div>
        </Section>
      ))}

      <Section className="pt-0 md:pt-0">
        <div className="border-gold/30 bg-card/50 mx-auto max-w-2xl rounded-3xl border p-8 text-center md:p-12">
          <h2 className="font-display text-2xl leading-snug font-light md:text-3xl">
            Still deciding?
          </h2>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            Create a free account and try Victoria AI yourself. No card, no
            commitment — and you keep access to the free prompts and grant
            directories either way.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="gold" size="xl" asChild>
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                onClick={() => trackStartFreeClick("faq_cta")}
              >
                Start Free
              </Link>
            </Button>
            <Button variant="lux" size="xl" asChild>
              <Link to="/services">Request a service quote</Link>
            </Button>
          </div>
        </div>
      </Section>

      <SiteFooter />
    </main>
  );
}

function slug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
