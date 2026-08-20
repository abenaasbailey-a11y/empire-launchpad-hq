import { createFileRoute } from "@tanstack/react-router";
import { ChatgptPromptsPage } from "@/components/landing/ChatgptPromptsPage";
import { PROMPT_FAQ } from "@/lib/chatgpt-prompts";

const URL = "https://yourempireconcierge.com/chatgpt-prompts";
const TITLE = "Free ChatGPT Prompts for Business Owners";
const DESCRIPTION =
  "14 free ChatGPT prompts for pricing, offers, social content, emails, business planning, grants and productivity. Copy, paste and use — no email required.";
const OG_TITLE = "Free ChatGPT Prompts for Business";
const OG_DESCRIPTION =
  "Strategist-grade prompts for pricing, content, emails, planning and grants. Copy any of them free.";
const OG_IMAGE = "https://yourempireconcierge.com/og-image.jpg";

export const Route = createFileRoute("/chatgpt-prompts")({
  component: ChatgptPromptsPage,
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
          mainEntity: PROMPT_FAQ.map((item) => ({
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
              item: "https://yourempireconcierge.com/join",
            },
            { "@type": "ListItem", position: 2, name: "Free ChatGPT Prompts", item: URL },
          ],
        }),
      },
    ],
  }),
});
