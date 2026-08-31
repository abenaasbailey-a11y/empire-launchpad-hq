import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoldRule, Section } from "@/components/landing/Section";
import { SiteFooter, SiteHeader } from "@/components/landing/SiteChrome";
import { BLOG_POSTS_SORTED } from "@/lib/blog";
import { trackStartFreeClick } from "@/lib/analytics";

export function BlogIndexPage() {
  return (
    <main>
      <SiteHeader ctaLocation="blog_header" />

      <section className="relative overflow-hidden px-5 pt-32 pb-12 md:px-10 md:pt-40 md:pb-16">
        <div
          className="absolute inset-x-0 top-0 h-full opacity-70"
          style={{ backgroundImage: "var(--gradient-blush-veil)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-3xl text-center">
          <p className="eyebrow eyebrow-blush">The Empire Journal</p>
          <h1 className="font-display mt-4 text-[2.3rem] leading-[1.07] font-light md:mt-6 md:text-6xl md:leading-[1.03]">
            Strategy for women building quietly and seriously
          </h1>
          <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-[0.95rem] leading-relaxed md:mt-6 md:text-lg">
            Practical guides on AI, pricing and funding — written for business
            owners doing the work themselves. No fluff, no gurus, no
            motivational filler.
          </p>
          <div className="mt-8 flex justify-center">
            <GoldRule />
          </div>
        </div>
      </section>

      <Section className="pt-4 md:pt-6">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {BLOG_POSTS_SORTED.map((post) => (
            <article
              key={post.slug}
              className="border-border/60 bg-card/40 flex flex-col rounded-2xl border p-6 md:p-8"
            >
              <p className="text-gold font-display text-[0.65rem] tracking-[0.28em] uppercase">
                {post.eyebrow}
              </p>
              <h2 className="font-display mt-3 text-xl leading-snug font-light md:text-2xl">
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="hover:text-gold transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mt-4 flex-1 text-sm leading-relaxed">
                {post.excerpt}
              </p>
              <div className="text-muted-foreground mt-6 flex items-center justify-between border-t border-border/40 pt-4 text-[0.7rem] tracking-[0.14em] uppercase">
                <span>{post.dateLabel}</span>
                <span>{post.readMinutes} min read</span>
              </div>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="text-blush hover:text-gold mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                Read the guide <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <div className="border-gold/30 bg-card/50 mx-auto max-w-2xl rounded-3xl border p-8 text-center md:p-12">
          <h2 className="font-display text-2xl leading-snug font-light md:text-3xl">
            Put the advice to work today
          </h2>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            A free membership gives you Victoria AI and the Empire Prompt Vault
            so you can act on any of these guides in the next hour.
          </p>
          <Button variant="gold" size="xl" className="mt-7 w-full sm:w-auto" asChild>
            <Link
              to="/auth"
              search={{ mode: "signup" }}
              onClick={() => trackStartFreeClick("blog_index_cta")}
            >
              Start Free
            </Link>
          </Button>
        </div>
      </Section>

      <SiteFooter />
    </main>
  );
}
