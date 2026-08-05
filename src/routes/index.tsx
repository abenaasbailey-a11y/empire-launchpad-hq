import { createFileRoute } from "@tanstack/react-router";
import { JoinLanding } from "@/components/landing/JoinLanding";

const TITLE = "Her Empire Era — Build Your Business With Confidence";
const DESCRIPTION =
  "Meet Victoria, your private AI business concierge. 24/7 support with business planning, pricing, branding, marketing, content, websites, résumés and grants. Start free.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://yourempireconcierge.com/" },
    ],
    links: [{ rel: "canonical", href: "https://yourempireconcierge.com/join" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Her Empire Era",
          url: "https://yourempireconcierge.com",
          description: DESCRIPTION,
        }),
      },
    ],
  }),
});

function Index() {
  return <JoinLanding />;
}
