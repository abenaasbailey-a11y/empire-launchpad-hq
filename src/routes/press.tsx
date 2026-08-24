import { createFileRoute } from "@tanstack/react-router";
import { PressKitPage } from "@/components/landing/PressKitPage";
import headshot from "@/assets/press/headshot.png.asset.json";

const URL = "https://herempireera.com/press";
const IMAGE = `https://herempireera.com${headshot.url}`;
const TITLE = "Press & Media Kit — Her Empire Era | Abenaa Bailey";
const DESCRIPTION =
  "Media kit for Her Empire Era: founder bio for Abenaa Bailey, M.Ed., brand story, key facts, quotes and high-resolution press photos cleared for editorial use.";

export const Route = createFileRoute("/press")({
  component: PressKitPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Her Empire Era — Press & Media Kit" },
      {
        property: "og:description",
        content:
          "Founder bio, brand story, approved photography and press contact for Abenaa Bailey and Her Empire Era.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: URL },
      { property: "og:image", content: IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Abenaa Bailey",
          honorificSuffix: "M.Ed.",
          jobTitle: "Founder",
          image: IMAGE,
          url: URL,
          worksFor: {
            "@type": "Organization",
            name: "Her Empire Era",
            url: "https://herempireera.com",
          },
        }),
      },
    ],
  }),
});
