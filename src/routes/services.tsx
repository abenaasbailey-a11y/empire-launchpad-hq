import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/landing/ServicesPage";

const TITLE = "Done-For-You Grant Writing & Business Plans | Her Empire Era";
const DESCRIPTION =
  "Professional grant applications, business plans, résumés and marketing copy for women founders. Fixed quotes from $75. Request a quote in two minutes.";
const OG_DESCRIPTION =
  "Grant applications, business plans, résumés and marketing copy written for women founders — fixed quotes, set turnaround.";

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
  }),
});
