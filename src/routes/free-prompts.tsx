import { createFileRoute } from "@tanstack/react-router";
import { FreePromptsPage } from "@/components/landing/FreePromptsPage";

const TITLE = "10 Free AI Business Prompts for Women Founders";
const DESCRIPTION =
  "Download 10 free AI prompts for pricing, offers, captions, hooks, website copy and emails — from Her Empire Era.";
const OG_DESCRIPTION =
  "Free prompt pack: price your offer, fill 30 days of content, write your website and emails. Copy, paste, done.";
const OG_IMAGE = "https://herempireera.com/og-image.jpg";

export const Route = createFileRoute("/free-prompts")({
  component: FreePromptsPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: OG_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://herempireera.com/free-prompts" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://herempireera.com/free-prompts" }],
  }),
});
