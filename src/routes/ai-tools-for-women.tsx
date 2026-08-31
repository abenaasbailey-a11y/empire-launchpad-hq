import { createFileRoute } from "@tanstack/react-router";
import { AiToolsForWomenPage } from "@/components/landing/AiToolsForWomenPage";
import { AI_TOOLS_FAQ } from "@/lib/ai-tools-for-women";

const TITLE = "AI Business Tools for Women Entrepreneurs | Her Empire Era";
const DESCRIPTION =
  "Six AI business tools built for women running everything solo: Victoria AI, the Empire Prompt Vault, income matching and grant help. Start free, memberships from $19.99/mo.";
const URL = "https://herempireera.com/ai-tools-for-women";

export const Route = createFileRoute("/ai-tools-for-women")({
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: AI_TOOLS_FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: AiToolsForWomenPage,
});
