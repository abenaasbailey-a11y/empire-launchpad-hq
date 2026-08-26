import { createFileRoute } from "@tanstack/react-router";
import { MarketingPlaybook } from "@/components/landing/MarketingPlaybook";

const TITLE = "Marketing Playbook — Her Empire Era";
const DESCRIPTION = "Private admin marketing playbook: social captions, content calendar, SEO plan, email sequence, and 4-week action plan.";

export const Route = createFileRoute("/_authenticated/marketing-playbook")({
  component: MarketingPlaybook,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
