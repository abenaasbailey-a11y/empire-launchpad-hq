import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/landing/LegalPage";

const TITLE = "Privacy Policy — Her Empire Era";
const DESCRIPTION =
  "How Her Empire Era collects, uses and protects your information when you create a free membership and work with Victoria, your AI concierge.";
const CANONICAL = "https://yourempireconcierge.com/privacy";

const sections: LegalSection[] = [
  {
    heading: "Who is responsible for your data",
    body: [
      "HER EMPIRE ERA LLC, a limited liability company registered in the United States, is the data controller for the personal information collected through yourempireconcierge.com and the Her Empire Era membership.",
      "Our order process is conducted by our online reseller Paddle.com, which is the Merchant of Record for all our orders. Paddle acts as an independent data controller for the payment and billing information you provide at checkout.",
    ],
  },
  {
    heading: "Categories of personal data we collect",
    body: [
      "We collect only what we need to give you a membership, deliver the services you order, and run a working concierge experience.",
    ],
    bullets: [
      "Identity and contact data: your name, email address and, if you sign in with Google, the basic profile information Google shares.",
      "Business and service request data: business name, phone number, project details and any information you send us when requesting a service.",
      "Content you create: the goals, notes, prompts and drafts you enter while using the toolkit and Victoria.",
      "Transaction data: the products you purchased, order and invoice references, and subscription status. Full payment card details are collected and stored by Paddle, never by us.",
      "Technical and usage data: standard log data such as device type, browser, IP address and pages visited, used to keep the site secure and working.",
      "Marketing preferences: whether you have opted in to updates and your unsubscribe choices.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "Your information is used to create and maintain your membership, personalise the tools and Victoria's responses to your business, respond to your questions, and send you service messages such as email confirmation and account notices.",
      "If you opt in to updates, we may also send occasional news about new features and resources. You can unsubscribe at any time.",
    ],
  },
  {
    heading: "AI-powered features",
    body: [
      "Victoria is an AI assistant. When you submit a prompt or business detail, that text is processed by an AI model provider in order to generate a response for you.",
      "Please do not enter sensitive personal information — such as payment card numbers, government identification numbers or health information — into Victoria or the toolkit.",
    ],
  },
  {
    heading: "Who we share your information with",
    body: [
      "We do not sell your personal information. We share it only with the recipients below, and only to the extent needed to run Her Empire Era:",
    ],
    bullets: [
      "Paddle.com — our online reseller and Merchant of Record. Your order, billing and contact details are shared with Paddle so it can process payments, issue invoices, calculate tax and handle refunds.",
      "Hosting and database providers — to store your account and content securely.",
      "Authentication providers, including Google, when you choose to sign in with them.",
      "Email delivery providers — to send account, service and (if you opt in) marketing messages.",
      "AI model providers — to process the prompts and business details you submit to Victoria and generate your results.",
    ],
  },
  {
    heading: "Cookies and similar technologies",
    body: [
      "We use cookies and local browser storage to keep you signed in, remember your preferences and understand how the site is used. You can clear or block these through your browser settings, though some features may stop working.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We keep your account information for as long as your membership is active. If you ask us to delete your account, we remove your profile and associated content, except where we are required to keep records for legal or accounting reasons.",
    ],
  },
  {
    heading: "Your choices and rights",
    body: [
      "You can review and update your profile from your dashboard at any time. Depending on where you live, you may also have the right to request a copy of your information, ask us to correct it, or ask us to delete it.",
    ],
    bullets: [
      "Access or correct your details from your member dashboard.",
      "Unsubscribe from marketing emails using the link in any email.",
      "Request deletion of your account and content by contacting us.",
    ],
  },
  {
    heading: "Children's privacy",
    body: [
      "Her Empire Era is intended for adults building businesses. It is not directed to children, and we do not knowingly collect information from anyone under 16.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "If we update this policy, we will revise the date at the top of this page. Meaningful changes will be highlighted on the site or sent to you by email.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      "Questions about your privacy or this policy? Reach out to us and we will respond as soon as we can.",
    ],
  },
];

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
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

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Her Empire Era"
      title="Privacy Policy"
      lead="Your trust is part of the membership. This policy explains what we collect, why we collect it, and the control you keep over your information."
      updated="August 2026"
      sections={sections}
      footnote="This policy describes our practices for yourempireconcierge.com and the Her Empire Era membership. It is provided for general information and is not legal advice."
    />
  );
}
