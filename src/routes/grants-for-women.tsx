import { createFileRoute } from "@tanstack/react-router";
import { GrantsForWomenPage } from "@/components/landing/GrantsForWomenPage";
import { GRANTS_FAQ } from "@/lib/grants-for-women";

const URL = "https://yourempireconcierge.com/grants-for-women";
const TITLE = "Grants for Women Business Owners — 16 Grants to Apply For Now";
const DESCRIPTION =
  "16 real grants for women entrepreneurs: the Amber Grant, IFundWomen, Hello Alice, Cartier Women's Initiative, SoGal, and more. Check eligibility and apply directly — free, no email required.";
const OG_TITLE = "Grants for Women Business Owners (2025)";
const OG_DESCRIPTION =
  "16 grants women can apply for right now — from $2,000 to $100,000. Browse by category, check eligibility, and apply on each provider's site.";
const OG_IMAGE = "https://yourempireconcierge.com/og-image.jpg";

export const Route = createFileRoute("/grants-for-women")({
  component: GrantsForWomenPage,
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
          mainEntity: GRANTS_FAQ.map((item) => ({
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
            {
              "@type": "ListItem",
              position: 2,
              name: "Grants for Women",
              item: URL,
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Grants for Women Business Owners",
          numberOfItems: 16,
          itemListElement: Array.from({ length: 16 }, (_, i) => ({
            "@type": "ListItem",
            position: i + 1,
          })),
        }),
      },
    ],
  }),
});
