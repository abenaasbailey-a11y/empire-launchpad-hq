import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/landing/ServicesPage";

const TITLE = "Hire Us — Business Plans, Résumés & Content | Her Empire Era";
const DESCRIPTION =
  "Done-for-you AI-powered services: business plans, résumé makeovers, social media content, and email sequences. Human-reviewed and ready to submit.";
const OG_DESCRIPTION =
  "Professional business plans, résumés and content — drafted by Victoria AI, polished by a human strategist. Submit your request in minutes.";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: OG_DESCRIPTION },
      { property: "og:url", content: "https://yourempireconcierge.com/services" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://yourempireconcierge.com/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Her Empire Era — Done-for-You AI Services",
          provider: {
            "@type": "Organization",
            name: "Her Empire Era",
            url: "https://yourempireconcierge.com",
          },
          description: DESCRIPTION,
          areaServed: "Worldwide",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: "75",
            highPrice: "300",
            offerCount: "4",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How is this different from using the free Victoria AI?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Free Victoria gives you drafts to work with. The Services page means a human strategist reviews, refines, and finalizes everything for you — formatted, polished, and ready to submit. You're paying for the finished product, not just the first draft.",
              },
            },
          ],
        }),
      },
    ],
  }),
});

function ServicesRoute() {
  return <ServicesPage />;
}
