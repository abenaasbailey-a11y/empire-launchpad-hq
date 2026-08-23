import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/landing/LegalPage";

const TITLE = "Terms of Service — Her Empire Era";
const DESCRIPTION =
  "The terms that apply to your free Her Empire Era membership, the business toolkit and Victoria, your AI concierge.";
const CANONICAL = "https://yourempireconcierge.com/terms";

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      "This site and all products and services offered on it are provided by HER EMPIRE ERA LLC, a limited liability company registered in the United States (\"Her Empire Era\", \"we\", \"us\"). HER EMPIRE ERA LLC is the seller and provider of the Her Empire Era membership and all professional services listed on yourempireconcierge.com.",
      "Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service enquiries and handles returns, refunds, invoices and taxes on our behalf.",
    ],
  },
  {
    heading: "Agreement to these terms",
    body: [
      "By creating a membership, purchasing a service or otherwise using yourempireconcierge.com, you agree to these terms. If you do not agree, please do not use the site.",
    ],
  },
  {
    heading: "Your membership",
    body: [
      "Membership starts free. You are responsible for the accuracy of the details you provide, for keeping your login secure, and for everything that happens under your account.",
      "You must be at least 16 years old to create a membership, and you may use the platform only for lawful business purposes.",
    ],
  },
  {
    heading: "What we provide",
    body: [
      "Her Empire Era is a digital membership offering business tools, guidance and AI-powered support through Victoria. We may add, change or remove features as the platform grows.",
    ],
  },
  {
    heading: "AI output and professional advice",
    body: [
      "Victoria generates suggestions, drafts and templates. Output can be incomplete or inaccurate, so please review it before you rely on it or publish it.",
      "Nothing on this platform is legal, financial, tax, medical or other professional advice. For decisions with legal or financial consequences, consult a qualified professional.",
    ],
  },
  {
    heading: "Acceptable use",
    body: ["To keep this space supportive and safe for every member, you agree not to:"],
    bullets: [
      "Use the platform for unlawful, deceptive, harassing or infringing activity.",
      "Attempt to access other members' accounts or data, or interfere with the platform's security.",
      "Scrape, resell or redistribute the platform, its content or its AI output as your own competing product.",
      "Upload malicious code or content you do not have the right to use.",
    ],
  },
  {
    heading: "Your content",
    body: [
      "You keep ownership of the business information, text and materials you bring to the platform. You grant us the limited permission needed to store, process and display that content so we can operate the service and generate your results.",
    ],
  },
  {
    heading: "Our content and brand",
    body: [
      "The Her Empire Era name, logo, site design, copy and tools are owned by us and protected by intellectual property law. You may use them only as part of using the platform, not to represent your own brand or offering.",
    ],
  },
  {
    heading: "Paid services, billing and refunds",
    body: [
      "Prices, billing cycles and cancellation terms are shown clearly before you purchase. Free membership features remain free unless we tell you otherwise.",
      "Payments are processed by Paddle.com as Merchant of Record, and your invoice and receipt come from Paddle. Applicable sales tax and VAT are calculated and collected by Paddle at checkout.",
      "Subscriptions can be cancelled at any time; cancellation stops future billing and access ends immediately. Refunds are governed by our Refund Policy, which gives you 30 days from purchase to request a refund.",
    ],
  },
  {
    heading: "Availability",
    body: [
      "We work to keep the platform available and dependable, but we do not guarantee uninterrupted access. Maintenance, updates or issues with third-party providers may cause temporary interruptions.",
    ],
  },
  {
    heading: "Suspension and termination",
    body: [
      "You may stop using the platform or ask us to delete your account at any time. We may suspend or close an account that breaks these terms or puts other members or the platform at risk.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, the platform is provided as is, and we are not liable for indirect, incidental or consequential losses, including lost profits or business opportunities, arising from your use of the platform or its AI output.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms as the platform evolves. The date at the top of this page shows the current version, and continuing to use the platform after an update means you accept the revised terms.",
    ],
  },
  {
    heading: "Contact us",
    body: ["If you have questions about these terms, please get in touch and we will be happy to help."],
  },
];

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
});

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal · Her Empire Era"
      title="Terms of Service"
      lead="Clear terms for a supportive space. These are the ground rules for your membership, the toolkit and working with Victoria."
      updated="August 2026"
      sections={sections}
      footnote="These terms apply to yourempireconcierge.com and the Her Empire Era membership. They are provided for general information and are not legal advice."
    />
  );
}
