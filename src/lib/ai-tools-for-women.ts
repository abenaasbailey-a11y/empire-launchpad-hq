export type AiToolUse = {
  name: string;
  category: string;
  what: string;
  how: string;
  inside: string;
};

/** The AI capability set Her Empire Era members use to run a business. */
export const AI_TOOL_USES: AiToolUse[] = [
  {
    name: "Victoria AI Business Concierge",
    category: "Strategy",
    what: "A private AI advisor trained on small-business strategy, offers, pricing and positioning.",
    how: "Ask her what to sell, how to price it, and what to post this week. She answers in your voice, with a plan you can act on the same day.",
    inside: "All memberships",
  },
  {
    name: "The Empire Prompt Vault",
    category: "Content",
    what: "A curated library of business prompts across marketing, sales, admin, brand and personal brand.",
    how: "Copy a prompt, paste your details, and get captions, emails, offers or scripts in seconds instead of staring at a blank page.",
    inside: "All memberships",
  },
  {
    name: "Opportunity Center",
    category: "Income",
    what: "AI-matched income ideas based on your skills, time and starting budget.",
    how: "Answer a few questions and get side-hustle and service ideas with realistic startup costs and first-client steps.",
    inside: "All memberships",
  },
  {
    name: "Grant Finder & Application Assistant",
    category: "Funding",
    what: "AI help finding funding you qualify for and drafting the narrative sections.",
    how: "Describe your business once, then let the assistant shortlist programs and draft your project description and impact story.",
    inside: "Elite and VIP",
  },
  {
    name: "Marketing Content Engine",
    category: "Marketing",
    what: "Repeatable systems for captions, hooks, email sequences and launch calendars.",
    how: "Turn one idea into a week of posts, an email, and a landing-page section without hiring an agency.",
    inside: "All memberships",
  },
  {
    name: "Client & Admin Copy",
    category: "Operations",
    what: "Proposals, follow-ups, invoices reminders, onboarding messages and policies.",
    how: "Draft the unglamorous documents that make you look established — in minutes, in a consistent brand voice.",
    inside: "All memberships",
  },
];

export const AI_TOOLS_FAQ: { q: string; a: string }[] = [
  {
    q: "Do I need to know anything about AI to use this?",
    a: "No. Every tool inside Her Empire Era is built around plain questions and copy-and-paste prompts. If you can send a text message, you can use it.",
  },
  {
    q: "What does a Her Empire Era membership cost?",
    a: "Member is $19.99 per month, Elite is $49.99 per month and VIP is $99.00 per month. You can start with a free account first and upgrade whenever you're ready.",
  },
  {
    q: "What is the difference between Member, Elite and VIP?",
    a: "Member includes Victoria AI, the Empire Prompt Vault and the Opportunity Center. Elite adds the Grant Finder and Application Assistant plus deeper strategy tools. VIP adds priority access and the most hands-on support.",
  },
  {
    q: "Can I cancel my membership at any time?",
    a: "Yes. You manage your plan yourself from your account's Billing panel, including upgrades, downgrades and cancellation. There is no phone call and no retention script.",
  },
  {
    q: "Will AI replace my voice or make my brand sound generic?",
    a: "Not if you use it the way we teach it. Every prompt in the Vault asks for your details, audience and tone first, so the output sounds like you with better structure — not like a robot.",
  },
  {
    q: "I want the work done for me instead. Is that possible?",
    a: "Yes. Our done-for-you services cover grant applications, business plans, résumés and marketing packages. Request a quote on the services page and we'll follow up with pricing and timeline.",
  },
];
