import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoldRule, Section } from "@/components/landing/Section";
import { SiteFooter, SiteHeader } from "@/components/landing/SiteChrome";
import { BLOG_POSTS_SORTED, type BlogPost } from "@/lib/blog";
import { trackStartFreeClick } from "@/lib/analytics";

export function BlogPostPage({ post }: { post: BlogPost }) {
  const related = BLOG_POSTS_SORTED.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main>
      <SiteHeader ctaLocation="blog_post_header" />

      <section className="relative overflow-hidden px-5 pt-32 pb-10 md:px-10 md:pt-40 md:pb-12">
        <div
          className="absolute inset-x-0 top-0 h-full opacity-70"
          style={{ backgroundImage: "var(--gradient-blush-veil)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-3xl">
          <Link
            to="/blog"
            className="text-muted-foreground hover:text-blush inline-flex items-center gap-1.5 text-[0.7rem] tracking-[0.18em] uppercase transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> The Empire Journal
          </Link>
          <p className="eyebrow eyebrow-blush mt-6">{post.eyebrow}</p>
          <h1 className="font-display mt-4 text-[2.1rem] leading-[1.09] font-light md:text-5xl md:leading-[1.05]">
            {post.title}
          </h1>
          <p className="text-muted-foreground mt-5 text-[0.95rem] leading-relaxed md:text-lg">
            {post.excerpt}
          </p>
          <p className="text-muted-foreground mt-6 text-[0.7rem] tracking-[0.16em] uppercase">
            {post.dateLabel} · {post.readMinutes} min read
          </p>
          <GoldRule className="mt-7" />
        </div>
      </section>

      <Section className="pt-2 md:pt-4">
        <article className="mx-auto max-w-3xl">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="font-display mt-12 text-2xl leading-snug font-light md:mt-16 md:text-3xl"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "h3") {
              return (
                <h3
                  key={i}
                  className="font-display text-foreground/90 mt-9 text-lg leading-snug font-light md:text-xl"
                >
                  {block.text}
                </h3>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="mt-5 space-y-3">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="text-muted-foreground flex gap-3 text-sm leading-relaxed md:text-base"
                    >
                      <span className="text-gold mt-1 text-[0.6rem]">◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="border-gold/50 text-foreground/85 font-display mt-9 border-l-2 pl-6 text-lg leading-relaxed font-light italic md:text-xl"
                >
                  {block.text}
                </blockquote>
              );
            }
            return (
              <p
                key={i}
                className="text-muted-foreground mt-5 text-sm leading-relaxed md:text-base"
              >
                {block.text}
              </p>
            );
          })}
        </article>
      </Section>

      <Section className="pt-0 md:pt-0">
        <div className="border-gold/30 bg-card/50 mx-auto max-w-2xl rounded-3xl border p-8 text-center md:p-12">
          <h2 className="font-display text-2xl leading-snug font-light md:text-3xl">
            Want this done with you, not just read about?
          </h2>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            Start free for Victoria AI and the Empire Prompt Vault, or request a
            quote and have our team write it for you.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="gold" size="xl" asChild>
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                onClick={() => trackStartFreeClick("blog_post_cta")}
              >
                Start Free
              </Link>
            </Button>
            <Button variant="lux" size="xl" asChild>
              <Link to="/services">Request a quote</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-xl leading-snug font-light md:text-2xl">
            Keep reading
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="border-border/60 bg-card/40 hover:border-gold/40 rounded-2xl border p-6 transition-colors"
              >
                <p className="text-gold font-display text-[0.65rem] tracking-[0.28em] uppercase">
                  {p.eyebrow}
                </p>
                <p className="font-display mt-3 text-lg leading-snug font-light md:text-xl">
                  {p.title}
                </p>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {p.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <SiteFooter />
    </main>
  );
}
