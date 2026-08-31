import { createFileRoute } from "@tanstack/react-router";
import { BlogIndexPage } from "@/components/landing/BlogIndexPage";

const TITLE = "The Empire Journal: AI, Pricing & Funding Guides for Women";
const DESCRIPTION =
  "Practical guides for women entrepreneurs on using AI in your business, pricing your services with confidence, and preparing strong grant applications.";
const URL = "https://herempireera.com/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: BlogIndexPage,
});
