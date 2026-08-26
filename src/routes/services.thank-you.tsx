import { createFileRoute } from "@tanstack/react-router";
import { ServicesThankYou } from "@/components/landing/ServicesThankYou";

const TITLE = "Thank You — Your Request Is In | Her Empire Era";

export const Route = createFileRoute("/services/thank-you")({
  component: ServicesThankYou,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
