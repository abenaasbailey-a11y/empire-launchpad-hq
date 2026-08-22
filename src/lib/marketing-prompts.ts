/**
 * Content for the /marketing-prompts SEO landing page.
 * Client-safe: no server imports. Every prompt is fully readable (no gate).
 */
export interface MarketingPrompt {
  slug: string;
  category: string;
  title: string;
  use: string;
  body: string;
}

export const MARKETING_PROMPT_CATEGORIES = [
  "Positioning",
  "Copywriting",
  "Social Media",
  "Email Marketing",
  "Launches",
  "Ads",
] as const;

export const MARKETING_PROMPTS: MarketingPrompt[] = [
  {
    slug: "brand-positioning-statement",
    category: "Positioning",
    title: "Write a positioning statement I can actually use",
    use: "When your marketing sounds like everyone else's.",
    body: "Act as a brand positioning strategist. My business: [what you sell]. My ideal client: [describe]. The result I deliver: [describe]. My three closest competitors: [list]. Write a positioning statement in this form: for [audience] who [problem], we are the [category] that [differentiator], because [proof]. Then give me two alternative versions with a different angle each, and explain in one line what each version would attract and repel.",
  },
  {
    slug: "ideal-client-profile",
    category: "Positioning",
    title: "Build my ideal client profile from real details",
    use: "When your messaging is aimed at everybody.",
    body: "Act as a market researcher. Based on this information about my current best clients — [describe who they are, what they bought, why they bought, what they said before buying] — build one ideal client profile covering: their situation, the words they use for their problem, what they have already tried, what they are afraid of, what would make them buy today, and where they spend time online. End with five phrases I should use verbatim in my marketing.",
  },
  {
    slug: "message-hierarchy",
    category: "Positioning",
    title: "Turn one offer into a full message hierarchy",
    use: "When you repeat yourself across every platform.",
    body: "Act as a messaging strategist. My offer: [describe]. Audience: [describe]. Build a message hierarchy with: one core promise, three supporting pillars, two proof points per pillar, and one objection each pillar answers. Then show me how to express the core promise in a website headline, an Instagram bio, a 30-second intro and an email subject line.",
  },
  {
    slug: "website-homepage-copy",
    category: "Copywriting",
    title: "Write my homepage copy section by section",
    use: "When your website says what you do but not why it matters.",
    body: "Act as a conversion copywriter. Business: [describe]. Audience: [describe]. Main offer: [describe]. Biggest objection: [describe]. Write homepage copy with these sections: headline under 12 words, subheadline, three benefit blocks written as outcomes not features, a three-step how-it-works, an objection-handling paragraph, a testimonial placement note, and a closing call to action. Avoid hype words and keep every sentence under 20 words.",
  },
  {
    slug: "sales-page-outline",
    category: "Copywriting",
    title: "Outline a sales page that answers every doubt",
    use: "When people read your page and still don't buy.",
    body: "Act as a direct-response copywriter. Offer: [describe]. Price: [amount]. Audience: [describe]. Transformation: [before state to after state]. Outline a full sales page in order, and for each section give the purpose in one line plus the actual draft copy. Include: hook, problem, cost of staying stuck, the offer, what is included, results and proof, who it is not for, pricing framing, FAQ answering five real objections, and final call to action.",
  },
  {
    slug: "value-props-rewrite",
    category: "Copywriting",
    title: "Rewrite my features as outcomes buyers care about",
    use: "When your list of features reads like a spec sheet.",
    body: "Act as a copy editor focused on benefits. Here are my features: [paste the list]. For each feature, write: the outcome it creates for the client, the emotional payoff, and a single sentence I can put on my website. Then rank all of them by how likely each is to drive a purchase, and explain the top three rankings in one line each.",
  },
  {
    slug: "content-pillars",
    category: "Social Media",
    title: "Build four content pillars and 40 post ideas",
    use: "When you never know what to post.",
    body: "Act as a social media strategist. Business: [describe]. Audience: [describe]. Marketing goal for the next 90 days: [describe]. Create four content pillars that support that goal. For each pillar give the purpose, the tone, and ten specific post ideas with a hook line for each. Mark which posts are education, proof, story, or offer so the mix stays balanced.",
  },
  {
    slug: "caption-formula",
    category: "Social Media",
    title: "Turn one idea into a caption that converts",
    use: "When your posts get likes but no enquiries.",
    body: "Act as a social media copywriter. My idea: [describe]. Audience: [describe]. Desired action: [describe]. Write three caption versions of the same idea: one story-led, one teaching-led, one direct-offer. Each needs a hook under 12 words, short scannable lines, one specific proof detail, and a clear call to action. Then tell me which to post first and why.",
  },
  {
    slug: "short-form-video-script",
    category: "Social Media",
    title: "Script a 30-second video that keeps people watching",
    use: "When viewers drop off in the first three seconds.",
    body: "Act as a short-form video scriptwriter. Topic: [describe]. Audience: [describe]. Goal: [describe]. Write a 30-second script with timestamps, an opening hook under eight words, three fast value beats, an on-screen text suggestion per beat, and a closing call to action. Then give me two alternative hooks to test and a one-line note on what to show visually.",
  },
  {
    slug: "welcome-email-sequence",
    category: "Email Marketing",
    title: "Write a five-email welcome sequence",
    use: "When new subscribers hear from you once and never again.",
    body: "Act as an email marketing strategist. My business: [describe]. What people signed up for: [describe]. My main offer: [describe]. Write a five-email welcome sequence. For each email give the send day, the goal, the subject line plus one alternative, the preview text, and the full body under 200 words. Build trust in emails one to three, introduce the offer in four, and handle objections in five.",
  },
  {
    slug: "subject-line-lab",
    category: "Email Marketing",
    title: "Generate 20 subject lines and predict the winner",
    use: "When your open rates are flat.",
    body: "Act as an email copywriter. Email content: [paste or summarise]. Audience: [describe]. Write 20 subject lines under 45 characters across these angles: curiosity, benefit, number, question, personal story, and direct offer. Add matching preview text for the best five, flag anything likely to trigger spam filters, and name the two you would A/B test first.",
  },
  {
    slug: "reengagement-email",
    category: "Email Marketing",
    title: "Win back subscribers who stopped opening",
    use: "When half your list has gone quiet.",
    body: "Act as a retention copywriter. My list: [describe size, how they joined, how long since last contact]. My offer: [describe]. Write a three-email re-engagement sequence: one honest check-in, one high-value email with no ask, and one clear last call with an easy opt-out. Keep each under 150 words and give me the subject line for each.",
  },
  {
    slug: "launch-plan",
    category: "Launches",
    title: "Build a two-week launch plan I can follow daily",
    use: "When launches feel chaotic and last-minute.",
    body: "Act as a launch strategist. Offer: [describe]. Price: [amount]. Launch dates: [dates]. Audience size and channels: [describe]. Build a day-by-day two-week plan covering pre-launch warm-up, open, mid-launch proof, objection handling, and close. For each day list the channel, the message theme, the exact call to action, and the asset I need to prepare.",
  },
  {
    slug: "offer-stress-test",
    category: "Launches",
    title: "Stress-test my offer before I promote it",
    use: "Before you spend two weeks marketing the wrong thing.",
    body: "Act as a skeptical buyer and then as a strategist. My offer: [describe including price, deliverables and promise]. First, list every reason a smart buyer would hesitate or say no. Then, as a strategist, tell me which of those are messaging problems and which are offer problems, and give me the three highest-impact changes to make before I launch.",
  },
  {
    slug: "ad-copy-variations",
    category: "Ads",
    title: "Write five ad variations for one audience",
    use: "When you want to test paid traffic without guessing.",
    body: "Act as a paid social copywriter. Offer: [describe]. Audience: [describe]. Landing page action: [describe]. Budget context: [describe]. Write five ad variations, each with a primary text under 125 words, a headline under 40 characters, and a description. Use a different angle per ad: problem-agitate, social proof, direct offer, story, and question. Add one image or video direction per ad.",
  },
  {
    slug: "funnel-diagnosis",
    category: "Ads",
    title: "Diagnose where my marketing is leaking",
    use: "When traffic comes in but nobody converts.",
    body: "Act as a growth analyst. Here are my numbers: [traffic, source breakdown, landing page views, opt-ins, sales, and any bounce or click rates you have]. Identify the single biggest drop-off point, explain the most likely cause, and give me three specific fixes ranked by effort versus impact. Tell me what to measure next week to know if the fix worked.",
  },
];

export const MARKETING_PROMPT_FAQ = [
  {
    q: "What is a marketing prompt?",
    a: "A marketing prompt is a written instruction you paste into an AI tool like ChatGPT, Claude, Gemini, or Victoria to produce a specific marketing asset — a headline, a caption, an email sequence, an ad, or a launch plan. A good prompt names the role the AI should play, gives it your real details, and states exactly what output you want.",
  },
  {
    q: "Are these marketing prompts free to use?",
    a: "Yes. Every prompt on this page is free to read, copy, and use in any AI tool, with no email required. A free Her Empire Era membership adds the full Empire Prompt Vault of 56 prompts plus Victoria, our AI business concierge.",
  },
  {
    q: "How do I write a better marketing prompt?",
    a: "Replace every bracket with real specifics — your actual offer, price, audience, and numbers. Then ask the AI to revise one section at a time rather than regenerating the whole answer. Vague inputs are the single biggest reason AI marketing copy sounds generic.",
  },
  {
    q: "Can ChatGPT write my marketing copy for me?",
    a: "It can draft it fast, but it cannot know your clients, your proof, or your pricing unless you tell it. Use these prompts to get a strong first draft, then edit for your voice and verify every claim, number, and testimonial before publishing.",
  },
  {
    q: "Which marketing prompt should I start with?",
    a: "Start with the positioning statement prompt. Almost every weak marketing result traces back to unclear positioning — once your core promise is sharp, the copywriting, social, and email prompts all produce much better output.",
  },
];
