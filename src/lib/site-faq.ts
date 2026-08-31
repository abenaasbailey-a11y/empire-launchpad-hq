export type FaqItem = { q: string; a: string };
export type FaqGroup = { title: string; blurb: string; items: FaqItem[] };

/** Sitewide FAQ, grouped by what visitors actually search for. */
export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Getting started",
    blurb: "What Her Empire Era is and how to begin without paying anything.",
    items: [
      {
        q: "What is Her Empire Era?",
        a: "Her Empire Era is an AI business platform for women entrepreneurs. It gives you Victoria AI (a private business concierge), the Empire Prompt Vault, the Opportunity Center for income ideas, and free funding directories — all in one place.",
      },
      {
        q: "How do I start for free?",
        a: "Create a free account with your email or Google. You get immediate access to Victoria AI, free prompts and the grant directories. No card is required to create a free account.",
      },
      {
        q: "Who is this for?",
        a: "Women building or growing a business: coaches, service providers, creators, salon and shop owners, consultants and side-hustlers. It also works well if you're still deciding what business to start.",
      },
      {
        q: "Do I need to be technical?",
        a: "No. Everything is written in plain language, and every prompt tells you exactly what to paste in. If you can use a phone, you can use Her Empire Era.",
      },
    ],
  },
  {
    title: "Membership and pricing",
    blurb: "Plans, what's included at each tier, and how billing works.",
    items: [
      {
        q: "How much is a membership?",
        a: "Member is $19.99 per month, Elite is $49.99 per month and VIP is $99.00 per month. All prices are in U.S. dollars and billed monthly.",
      },
      {
        q: "What's included in each tier?",
        a: "Member includes Victoria AI, the Empire Prompt Vault and the Opportunity Center. Elite adds the Grant Finder and Application Assistant and deeper strategy tools. VIP adds priority access and the highest level of support.",
      },
      {
        q: "How do I cancel or change my plan?",
        a: "Open your dashboard and go to Billing & account. You can upgrade, downgrade, update your card or cancel yourself through the secure customer portal. Cancellation takes effect at the end of your paid period.",
      },
      {
        q: "Is my payment information safe?",
        a: "Yes. Payments are processed by Stripe. Her Empire Era never sees or stores your full card details.",
      },
      {
        q: "Do you offer refunds?",
        a: "Our refund terms are published on the refunds page. If something has gone wrong with a charge, contact us and we'll review it.",
      },
    ],
  },
  {
    title: "Victoria AI and the Prompt Vault",
    blurb: "How the AI works and what you can ask it to do.",
    items: [
      {
        q: "What can Victoria AI actually do?",
        a: "Victoria helps you choose an offer, price it, write the copy that sells it, plan your content, draft client emails and think through business decisions. She's built for practical next steps, not vague motivation.",
      },
      {
        q: "What is the Empire Prompt Vault?",
        a: "A curated library of business prompts organized by category — marketing, sales, brand, admin, personal brand and funding. Each prompt is written to give usable output on the first try.",
      },
      {
        q: "Will the output sound like me?",
        a: "The prompts ask for your audience, tone and details before generating, so the result reflects your voice. You should still read and edit before publishing — treat it as a strong first draft.",
      },
    ],
  },
  {
    title: "Grants and funding",
    blurb: "What our free directories cover and where the AI assistant helps.",
    items: [
      {
        q: "Are the grant directories free?",
        a: "Yes. The grants for women and grants for African women directories are completely free and require no email address. Every listing links to the official application page.",
      },
      {
        q: "Does Her Empire Era give out grants?",
        a: "No. We don't award funding. We help you find programs you may qualify for and help you write a stronger application.",
      },
      {
        q: "Can the AI write my grant application?",
        a: "The Grant Finder and Application Assistant (Elite and VIP) helps you shortlist programs and draft narrative sections such as your project description, budget justification and impact story. You review, confirm the facts and submit.",
      },
      {
        q: "Can someone write the application for me?",
        a: "Yes — that's a done-for-you service. Request a quote on the services page and we'll follow up with scope, pricing and turnaround.",
      },
    ],
  },
  {
    title: "Done-for-you services",
    blurb: "Pricing, turnaround and how requests are handled.",
    items: [
      {
        q: "What services do you offer?",
        a: "Government grant applications, private and foundation grant applications, business plans, résumés and cover letters, social media content packages and email marketing sequences.",
      },
      {
        q: "How much do services cost?",
        a: "Grant writing starts at $350, business plans start at $300, and résumé packages start at $150. Final pricing depends on scope and is confirmed in your quote.",
      },
      {
        q: "How does the process work?",
        a: "Submit the request form with your details. You'll get an email confirmation, then a follow-up with pricing, timeline and next steps. Work begins once you approve the quote.",
      },
      {
        q: "Do you guarantee I'll win a grant or get a job?",
        a: "No, and no honest provider can. We guarantee a professional, complete, submission-ready document written to the program's requirements.",
      },
    ],
  },
];

export const ALL_FAQ_ITEMS: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items);
