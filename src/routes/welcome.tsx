import { createFileRoute } from "@tanstack/react-router";
import { WelcomePage } from "@/components/landing/WelcomePage";

const TITLE = "Welcome to Your Empire Era — Your Free Membership Is Active";
const DESCRIPTION =
  "Your free Her Empire Era membership is active. Meet Victoria, open the Prompt Vault, and find your next move — no card required.";

export const Route = createFileRoute("/welcome")({
  component: () => <WelcomePage />,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
    ],
  }),
});
