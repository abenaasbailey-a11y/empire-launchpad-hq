import { createFileRoute } from "@tanstack/react-router";
import { PitchTemplatesPage } from "@/components/landing/PitchTemplatesPage";

const URL = "https://herempireera.com/pitch-templates";
const TITLE = "Press Pitch Templates — Her Empire Era";
const DESCRIPTION =
  "Ready-to-send pitch email templates for editors, producers, and podcast hosts featuring Her Empire Era and founder Abenaa Bailey.";

export const Route = createFileRoute("/pitch-templates")({
  component: PitchTemplatesPage,
  head: () => ({
    meta: [
      { name: "robots", content: "noindex" },
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
});
