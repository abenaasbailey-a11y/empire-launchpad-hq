export type ServiceOffer = {
  name: string;
  price: string;
  turnaround: string;
  summary: string;
  includes: string[];
  featured?: boolean;
};

/** Service names accepted by the intake form (must match the server validator). */
export const SERVICE_NAMES = [
  "Government Grant Writing",
  "Private & Foundation Grants",
  "Business Plan",
  "Résumé & Cover Letter",
  "Social Media Content Package",
  "Email Marketing Sequence",
  "Custom / Not Sure",
] as const;

export type ServiceName = (typeof SERVICE_NAMES)[number];

export const SERVICES: ServiceOffer[] = [
  {
    name: "Government Grant Writing",
    price: "$350 – $750",
    turnaround: "5 – 7 business days",
    summary:
      "A complete, submission-ready federal, state or city grant application written for your business.",
    includes: [
      "Eligibility review and grant match",
      "Full narrative and project description",
      "Budget narrative and justification",
      "One round of revisions",
    ],
    featured: true,
  },
  {
    name: "Private & Foundation Grants",
    price: "$250 – $500",
    turnaround: "4 – 6 business days",
    summary:
      "Applications for corporate and foundation grant programs — Amber Grant, IFundWomen, Hello Alice and more.",
    includes: [
      "Grant shortlist matched to your business",
      "Written application and short-answer responses",
      "Impact story and traction summary",
      "One round of revisions",
    ],
  },
  {
    name: "Business Plan",
    price: "$300 – $600",
    turnaround: "5 – 7 business days",
    summary:
      "An investor- and lender-ready business plan you can attach to any grant, loan or pitch.",
    includes: [
      "Executive summary and market analysis",
      "Operations and marketing strategy",
      "3-year financial projections",
      "Formatted PDF and editable document",
    ],
  },
  {
    name: "Résumé & Cover Letter",
    price: "$75 – $150",
    turnaround: "2 – 3 business days",
    summary:
      "A modern, ATS-friendly résumé and tailored cover letter written for the role you actually want.",
    includes: [
      "ATS-optimized résumé rewrite",
      "Tailored cover letter",
      "LinkedIn headline and summary",
      "One round of revisions",
    ],
  },
  {
    name: "Social Media Content Package",
    price: "$200 – $500 / mo",
    turnaround: "Delivered monthly",
    summary:
      "A month of on-brand captions, hooks and content ideas so you never stare at a blank post again.",
    includes: [
      "30 captions with hooks and CTAs",
      "Content calendar by theme",
      "Hashtag and keyword sets",
      "Monthly refresh",
    ],
  },
  {
    name: "Email Marketing Sequence",
    price: "$150 – $400",
    turnaround: "3 – 5 business days",
    summary:
      "A written email sequence that welcomes, nurtures and sells to your list on autopilot.",
    includes: [
      "5 – 7 email sequence, fully written",
      "Subject lines and preview text",
      "Segmentation guidance",
      "One round of revisions",
    ],
  },
];

export const SERVICES_FAQ = [
  {
    q: "How does payment work?",
    a: "Submit the request form with your project details. We reply within one business day with a fixed quote and a secure invoice. Work starts once the invoice is paid — there is no charge at the time you submit the form.",
  },
  {
    q: "Why is the price a range?",
    a: "Every project is scoped individually. A single-page private grant application sits at the low end of its range; a multi-section federal application with a detailed budget sits at the high end. Your quote is fixed before any work begins.",
  },
  {
    q: "Do you guarantee I will win a grant?",
    a: "No. No honest grant writer can guarantee an award — funders make the decision. What we guarantee is a complete, professionally written, on-time application that meets every requirement in the funder's guidelines.",
  },
  {
    q: "Is this the same as the membership?",
    a: "No. The $19.99/month membership gives you the AI tools to do the work yourself — Victoria AI, the Empire Prompt Vault and the Opportunity Center. These services are done-for-you projects delivered by our team.",
  },
];
