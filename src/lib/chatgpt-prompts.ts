/**
 * Content for the /chatgpt-prompts SEO landing page.
 * Client-safe: no server imports. Every prompt is fully readable (no gate) so
 * search engines and visitors get the value the page promises.
 */
export interface SeoPrompt {
  slug: string;
  category: string;
  title: string;
  use: string;
  body: string;
}

export const PROMPT_CATEGORIES = [
  "Marketing",
  "Social Media",
  "Emails",
  "Business Planning",
  "Grants & Funding",
  "Productivity",
] as const;

export const SEO_PROMPTS: SeoPrompt[] = [
  {
    slug: "offer-clarity",
    category: "Marketing",
    title: "Make my offer instantly understandable",
    use: "When people ask what you do and you over-explain.",
    body: "Act as a positioning strategist. My business is [what you do]. I help [ideal client] get [result] in [timeframe]. Rewrite my offer three ways: (1) a one-sentence bio line, (2) a website headline under 12 words, (3) a spoken introduction I can say in 15 seconds. Then flag any vague words I used and replace them with concrete outcomes.",
  },
  {
    slug: "pricing-tiers",
    category: "Marketing",
    title: "Build three price tiers I can defend",
    use: "When you keep guessing what to charge.",
    body: "Act as a pricing strategist for service businesses. My offer is [describe offer]. Clients typically gain [result or ROI]. Give me three tiers with names, inclusions, who each is for, and the exact sentence I use to state the price without discounting. Add two objections per tier and a calm one-line answer to each.",
  },
  {
    slug: "landing-page-copy",
    category: "Marketing",
    title: "Write my landing page section by section",
    use: "When the blank page wins.",
    body: "Act as a conversion copywriter. Product: [describe]. Audience: [describe]. Main objection: [describe]. Write a landing page with these sections: headline, subheadline, three benefit blocks written as outcomes, a how-it-works in three steps, an objection-handling block, testimonial placeholders, and a closing call to action. Keep sentences short and specific, no hype words.",
  },
  {
    slug: "content-calendar",
    category: "Social Media",
    title: "30 days of content in one sitting",
    use: "When you post inconsistently.",
    body: "Act as a content strategist. My business: [describe]. Audience: [describe]. Goal: [describe]. Build a 30-day content calendar with one post per day. For each day give the theme, the hook line, the format (carousel, reel, text, story), and the call to action. Rotate education, proof, story, and offer posts so I never sell twice in a row.",
  },
  {
    slug: "hooks",
    category: "Social Media",
    title: "20 scroll-stopping hooks for one topic",
    use: "When the caption is fine but nobody stops.",
    body: "Act as a short-form scriptwriter. Topic: [describe]. Audience: [describe]. Write 20 opening hooks under 12 words each. Mix curiosity, contrarian takes, numbers, and direct callouts to the audience. Mark the three you'd test first and say why in one line each.",
  },
  {
    slug: "repurpose",
    category: "Social Media",
    title: "Turn one idea into a week of posts",
    use: "When you have one good idea and no time.",
    body: "Act as a repurposing editor. Here is my core idea: [paste idea or transcript]. Turn it into: one carousel outline, two reel scripts under 30 seconds, three text posts, one email, and five story prompts. Keep my voice, which is [describe tone]. Do not repeat the same opening line twice.",
  },
  {
    slug: "welcome-email",
    category: "Emails",
    title: "A welcome email people actually finish",
    use: "For every new subscriber or client.",
    body: "Act as an email copywriter. My brand: [describe]. New subscriber just downloaded [describe freebie]. Write a welcome email under 200 words: subject line options (three), a warm opening, what to expect and how often, one quick win they can act on today, and a soft next step. Plain, human, no exclamation marks.",
  },
  {
    slug: "client-followup",
    category: "Emails",
    title: "Follow up without sounding desperate",
    use: "When a lead went quiet.",
    body: "Act as a sales communication coach. Context: I sent [describe proposal or quote] to [describe prospect] on [date] and heard nothing. Write three follow-up emails spaced one week apart. Each under 90 words, each adding new value rather than asking again, and the third giving a graceful close-the-loop option.",
  },
  {
    slug: "business-plan",
    category: "Business Planning",
    title: "A one-page business plan I'll actually use",
    use: "When you need clarity, not 40 pages.",
    body: "Act as a business planning consultant. Business: [describe]. Stage: [idea, launched, growing]. Revenue goal for the next 12 months: [amount]. Build a one-page plan: the problem, the customer, the offer and price, three acquisition channels with a weekly action for each, monthly revenue math to reach the goal, and the three biggest risks with a mitigation each.",
  },
  {
    slug: "revenue-math",
    category: "Business Planning",
    title: "Reverse-engineer my revenue goal",
    use: "When the goal feels abstract.",
    body: "Act as a business analyst. My goal is [amount] in [timeframe]. My offers and prices are [list them]. Work backwards: how many sales of each offer, how many qualified conversations at a [x]% close rate, and how many leads per week. Then tell me which single number to track daily and why.",
  },
  {
    slug: "grant-narrative",
    category: "Grants & Funding",
    title: "Draft a grant narrative in my own voice",
    use: "Educational drafting help — not a funding guarantee.",
    body: "Act as a grant writing assistant. Grant: [name and funder]. Their stated priorities: [paste from the guidelines]. My business: [describe]. Impact so far: [numbers or facts I can prove]. Draft a narrative that mirrors their priorities section by section, uses only facts I supplied, and flags every place I still need a real number or document. Do not invent statistics.",
  },
  {
    slug: "funding-readiness",
    category: "Grants & Funding",
    title: "Check whether I'm funding-ready",
    use: "Before you spend hours on an application.",
    body: "Act as a funding readiness reviewer. Here is my situation: [business age, structure, revenue, records, banking, documents on hand]. Build a readiness checklist marking each item ready, missing, or unclear. Then list the three items to fix first and the simplest way to fix each. Be direct about anything that would disqualify an application.",
  },
  {
    slug: "week-plan",
    category: "Productivity",
    title: "Plan my week around one outcome",
    use: "When everything feels urgent.",
    body: "Act as an executive assistant. This week's single most important outcome: [describe]. My commitments: [list]. My available hours: [describe]. Build a day-by-day plan where the important outcome gets protected time first, batch similar tasks, and name the three things I should delete or delay. Keep it realistic, not aspirational.",
  },
  {
    slug: "sop",
    category: "Productivity",
    title: "Turn what I do into a repeatable process",
    use: "So you can delegate it later.",
    body: "Act as an operations consultant. Here is how I currently do [task]: [describe the steps loosely]. Turn it into a clean standard operating procedure: purpose, tools needed, numbered steps with the decision points called out, quality checks, and how long each step should take. Then note which steps could be handed to someone else first.",
  },
];

export const PROMPT_FAQ = [
  {
    q: "Are these ChatGPT prompts really free?",
    a: "Yes. Every prompt on this page is free to read, copy, and use — no email required. A free Her Empire Era membership adds the full Empire Prompt Vault of 56 prompts plus Victoria, our AI business concierge.",
  },
  {
    q: "Do these prompts work in ChatGPT, Claude, and Gemini?",
    a: "Yes. They are written as plain instructions with bracketed details you fill in, so they work in ChatGPT, Claude, Gemini, Copilot, or Victoria inside Her Empire Era.",
  },
  {
    q: "How do I get better answers from a prompt?",
    a: "Replace every bracket with real specifics — your actual offer, price, audience, and numbers. The more concrete your input, the more usable the output. Then ask the AI to revise one section at a time instead of regenerating everything.",
  },
  {
    q: "Can AI write my grant application for me?",
    a: "AI can help you draft and organise a narrative, but it cannot guarantee funding and it should never invent numbers. Always verify every figure and follow the funder's guidelines. Our grant prompts are educational tools only.",
  },
  {
    q: "What is Victoria?",
    a: "Victoria is the AI business concierge inside Her Empire Era. She runs these prompts with you, remembers your business details between sessions, and points you to relevant tools, grants, and opportunities.",
  },
];
