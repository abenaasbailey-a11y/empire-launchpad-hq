import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/landing/LegalPage";

const TITLE = "Refund Policy — Her Empire Era";
const DESCRIPTION =
  "Our 30-day refund policy for Her Empire Era services and memberships, including how to request a refund through Paddle, our Merchant of Record.";
const CANONICAL = "https://yourempireconcierge.com/refunds";

const sections: LegalSection[] = [
  {
    heading: "Who you are buying from",
    body: [
      "All products and services on yourempireconcierge.com are sold by HER EMPIRE ERA LLC (\"Her Empire Era\", \"we\", \"us\").",
      "Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders and handles all customer service enquiries related to payments, invoices and refunds.",
    ],
  },
  {
    heading: "Our 30-day refund period",
    body: [
      "You may request a refund within 30 days of your purchase date. Approved refunds are returned to the original payment method.",
      "This 30-day period applies to one-time service purchases and to the most recent payment on a subscription.",
    ],
  },
  {
    heading: "Custom done-for-you services",
    body: [
      "For custom deliverables such as business plans, résumés, content packages and other written services, you may request a full refund at any point within 30 days before we have delivered the completed draft to you.",
      "Once the completed draft has been delivered, we will review refund requests within the 30-day window on a case-by-case basis and will offer a revision, a partial refund, or a full refund where the work did not match what was ordered.",
    ],
  },
  {
    heading: "Subscriptions and cancellations",
    body: [
      "You can cancel a subscription at any time. Cancellation stops future billing and access ends immediately on cancellation.",
      "If you cancel within 30 days of a payment and have made little or no use of the subscription in that billing period, contact us and we will refund that payment.",
    ],
  },
  {
    heading: "How to request a refund",
    body: [
      "Contact us with the email address used at checkout and your order or invoice number, and tell us briefly what went wrong.",
      "You may also contact Paddle directly at paddle.net, where you can look up your purchase and raise a refund request as the Merchant of Record.",
      "We aim to respond to every request within 3 business days. Approved refunds are processed by Paddle and typically appear on your statement within 5 to 10 business days, depending on your bank.",
    ],
  },
  {
    heading: "Chargebacks",
    body: [
      "Please contact us before opening a chargeback with your bank. In most cases we can resolve the issue faster and more simply, and we would always rather make it right directly.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      "Questions about a payment, an invoice or a refund? Reach out and we will help. Payment and invoice enquiries can also be handled directly by Paddle, our Merchant of Record.",
    ],
  },
];

export const Route = createFileRoute("/refunds")({
  component: RefundsPage,
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

function RefundsPage() {
  return (
    <LegalPage
      eyebrow="Legal · Her Empire Era"
      title="Refund Policy"
      lead="Thirty days to change your mind. Clear, fair terms on refunds for every service and membership we sell."
      updated="August 2026"
      sections={sections}
      footnote="This refund policy applies to yourempireconcierge.com and all products and services sold by HER EMPIRE ERA LLC. Paddle.com is the Merchant of Record for all orders."
    />
  );
}
