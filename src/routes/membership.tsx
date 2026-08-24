import { createFileRoute } from "@tanstack/react-router";
import { MembershipPage } from "@/components/landing/MembershipPage";

const TITLE = "Membership — AI Tools for Women Founders | Her Empire Era";
const DESCRIPTION =
  "Unlock Victoria AI, the Empire Prompt Vault, the Opportunity Center and the Empire Academy for $19/month. Cancel anytime, 30-day money-back guarantee.";
const OG_DESCRIPTION =
  "Full access to Victoria AI and the Empire Prompt Vault for $19/month — the AI toolkit for women building their empire.";

export const Route = createFileRoute("/membership")({
  component: MembershipPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: OG_DESCRIPTION },
      { property: "og:url", content: "https://herempireera.com/membership" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://herempireera.com/membership" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Her Empire Era Membership",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: "https://herempireera.com/membership",
          description: DESCRIPTION,
          offers: [
            {
              "@type": "Offer",
              name: "Monthly membership",
              price: "19.00",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              name: "Annual membership",
              price: "190.00",
              priceCurrency: "USD",
            },
          ],
        }),
      },
    ],
  }),
});
