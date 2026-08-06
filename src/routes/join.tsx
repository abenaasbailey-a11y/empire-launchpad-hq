import { createFileRoute } from "@tanstack/react-router";
import { JoinLanding, membershipFaqs } from "@/components/landing/JoinLanding";

const TITLE = "Join Free — Her Empire Era Membership";
const DESCRIPTION =
  "Create your free Her Empire Era membership in under a minute and unlock Victoria, your 24/7 AI concierge for pricing, content, résumés and grants.";
const OG_DESCRIPTION =
  "Join free in under a minute: enter your email, confirm your account, and start working with Victoria on your next business move.";
const OG_IMAGE = "https://yourempireconcierge.com/og-image.jpg";

export const Route = createFileRoute("/join")({
  component: JoinPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: OG_DESCRIPTION },
      { property: "og:url", content: "https://yourempireconcierge.com/join" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:image", content: OG_IMAGE },
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: membershipFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function JoinPage() {
  return <JoinLanding />;
}