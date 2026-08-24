import { createFileRoute } from "@tanstack/react-router";
import { JoinLanding } from "@/components/landing/JoinLanding";

const TITLE = "Her Empire Era — Build Your Business With Confidence";
const DESCRIPTION =
  "Her Empire Era pairs women founders with Victoria, a private AI business concierge for planning, branding and marketing. Start free.";
const OG_IMAGE = "https://herempireera.com/og-image.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://herempireera.com/" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://herempireera.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Her Empire Era",
          url: "https://herempireera.com",
          description: DESCRIPTION,
        }),
      },
    ],
  }),
});

function Index() {
  return <JoinLanding />;
}
