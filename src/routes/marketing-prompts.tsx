import { createFileRoute } from "@tanstack/react-router";
import { MarketingPromptsPage } from "@/components/landing/MarketingPromptsPage";
import { MARKETING_PROMPT_FAQ } from "@/lib/marketing-prompts";

const URL = "https://herempireera.com/marketing-prompts";
const TITLE = "Marketing Prompts for ChatGPT — 16 Free Prompts";
const DESCRIPTION =
  "16 free marketing prompts for ChatGPT: positioning, website copy, social captions, email sequences, launches and ads. Copy, paste and use — no email required.";
const OG_TITLE = "16 Free Marketing Prompts for ChatGPT";
const OG_DESCRIPTION =
  "Strategist-grade marketing prompts for positioning, copy, social, email, launches and ads. Copy any of them free.";
const OG_IMAGE = "https://herempireera.com/og-image.jpg";

export const Route = createFileRoute("/marketing-prompts")({
  component: MarketingPromptsPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: OG_TITLE },
      { property: "og:description", content: OG_DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: MARKETING_PROMPT_FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Her Empire Era",
              item: "https://herempireera.com/join",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Free ChatGPT Prompts",
              item: "https://herempireera.com/chatgpt-prompts",
            },
            { "@type": "ListItem", position: 3, name: "Marketing Prompts", item: URL },
          ],
        }),
      },
    ],
  }),
});
