import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogPostPage } from "@/components/landing/BlogPostPage";
import { SiteFooter, SiteHeader } from "@/components/landing/SiteChrome";
import { BLOG_POSTS } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const url = `https://herempireera.com/blog/${params.slug}`;
    if (!loaderData) {
      return {
        meta: [
          { title: "Unavailable | Her Empire Era" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: post.metaTitle },
        { name: "description", content: post.description },
        { property: "og:title", content: post.metaTitle },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: "Her Empire Era" },
            publisher: { "@type": "Organization", name: "Her Empire Era" },
          }),
        },
      ],
    };
  },
  notFoundComponent: BlogPostNotFound,
  component: BlogPostRoute,
});

function BlogPostRoute() {
  const { post } = Route.useLoaderData();
  return <BlogPostPage post={post} />;
}

function BlogPostNotFound() {
  return (
    <main>
      <SiteHeader ctaLocation="blog_notfound_header" />
      <section className="mx-auto max-w-2xl px-5 pt-40 pb-24 text-center md:px-10">
        <h1 className="font-display text-3xl font-light md:text-5xl">
          We couldn't find that article
        </h1>
        <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
          It may have moved. Browse the Empire Journal for the current guides.
        </p>
        <a
          href="/blog"
          className="text-gold hover:text-gold/80 mt-8 inline-block text-[0.7rem] tracking-[0.2em] uppercase transition-colors"
        >
          Back to the Journal
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
