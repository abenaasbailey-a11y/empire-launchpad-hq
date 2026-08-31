import { createFileRoute } from "@tanstack/react-router";
import { FaqPage } from "@/components/landing/FaqPage";
import { ALL_FAQ_ITEMS } from "@/lib/site-faq";

const TITLE = "FAQ: Memberships, Victoria AI & Services | Her Empire Era";
const DESCRIPTION =
  "Answers about Her Empire Era memberships ($19.99–$99/mo), Victoria AI, the Empire Prompt Vault, grant directories, billing and done-for-you services.";
const URL = "https://herempireera.com/faq";

export const Route = createFileRoute("/faq")({
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
          mainEntity: ALL_FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});
