import { createFileRoute } from "@tanstack/react-router";
import { GrantsForAfricanWomenPage } from "@/components/landing/GrantsForAfricanWomenPage";
import { AFRICA_GRANTS_FAQ } from "@/lib/grants-africa";

const URL = "https://herempireera.com/grants-african-women";
const TITLE =
  "Grants for Women Entrepreneurs in Africa — 16 Funding Programmes to Apply For Now";
const DESCRIPTION =
  "16 real grants and funding programmes for women building businesses across Africa: Tony Elumelu Foundation, Cartier Women's Initiative, Africa Business Heroes, AWDF, and more. Check eligibility and apply directly — free, no email required.";
const OG_TITLE = "Grants for Women Entrepreneurs in Africa (2025)";
const OG_DESCRIPTION =
  "16 grants and funding programmes women in Africa can apply for right now — from $5,000 to $150,000. Browse by country, check eligibility, and apply on each provider's site.";
const OG_IMAGE = "https://herempireera.com/og-image.jpg";

export const Route = createFileRoute("/grants-african-women")({
  component: GrantsForAfricanWomenPage,
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
          mainEntity: AFRICA_GRANTS_FAQ.map((item) => ({
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
              name: "Grants for Women in Africa",
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
          name: "Grants for Women Entrepreneurs in Africa",
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
