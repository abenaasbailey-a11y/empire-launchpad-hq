/**
 * The free lead-magnet prompt pack. Client-safe: no server imports.
 * Three prompts are shown openly as a teaser; the rest unlock after opt-in.
 */
export interface FreePrompt {
  n: string;
  title: string;
  use: string;
  body: string;
}

export const FREE_PROMPT_COUNT = 10;

/** Shown before opt-in so visitors can judge the quality. */
export const TEASER_COUNT = 3;

export const FREE_PROMPTS: FreePrompt[] = [
  {
    n: "01",
    title: "The Signature Offer Builder",
    use: "Turn what you do into one clear, premium offer.",
    body: "Act as a premium business strategist. My business is [describe what you do] and I help [describe your ideal client] achieve [describe the result]. Build me one signature offer: the name, the promise, exactly what is included, the transformation timeline, three objections buyers will have and how the offer answers them, and a one-sentence description I can put in my bio.",
  },
  {
    n: "02",
    title: "Price It With Confidence",
    use: "Stop guessing what to charge.",
    body: "Act as a pricing strategist for premium service businesses. My offer is [describe your offer]. My market is [describe your market] and clients typically get [describe the result or ROI]. Give me three price tiers with names, what each includes, who each is for, and the exact wording I use to present the price out loud without apologising or discounting.",
  },
  {
    n: "03",
    title: "30 Days of Content in One Sitting",
    use: "Never open a blank caption box again.",
    body: "Act as a social media strategist. My brand is [describe your brand], my audience is [describe your audience], and I want them to [describe the action you want]. Build a 30-day content calendar with a theme per week, a hook, a content format (reel, carousel, story, text post) and a call to action for each day. Keep the tone [describe your tone].",
  },
  {
    n: "04",
    title: "The Scroll-Stopping Hook Machine",
    use: "20 hooks written for your exact audience.",
    body: "Act as a short-form video scriptwriter. My topic is [describe the topic] and my audience is [describe your audience]. Write 20 hooks under 12 words each, mixing curiosity, contrarian takes, specific numbers, and pain-point callouts. Then pick the three strongest and tell me why they will outperform the rest.",
  },
  {
    n: "05",
    title: "Followers to Paying Clients",
    use: "The DM and comment flow that converts.",
    body: "Act as a conversion copywriter. I sell [describe your offer] at [price]. Write me a soft-sell DM sequence of four messages for someone who commented on my post, plus three comment replies that move people to DMs without sounding desperate or salesy. Include the exact line I use to ask for the sale.",
  },
  {
    n: "06",
    title: "Website Copy That Sells While You Sleep",
    use: "A full home page in your voice.",
    body: "Act as a conversion copywriter for premium brands. My business is [describe your business], my client is [describe your client], and my offer is [describe your offer]. Write my home page: headline, subheadline, three benefit blocks, a proof section, an FAQ of five questions, and two calls to action. Tone: [describe your tone].",
  },
  {
    n: "07",
    title: "The Welcome Email Sequence",
    use: "Turn new subscribers into buyers in five emails.",
    body: "Act as an email marketing strategist. My audience just joined my list after [describe the freebie or reason]. Write a five-email welcome sequence: subject line, preview text, and body for each. Email one welcomes and delivers, emails two to four build trust with story and proof, and email five invites them to [describe your offer].",
  },
  {
    n: "08",
    title: "The Grant-Ready Narrative",
    use: "Educational only — prompts do not guarantee funding.",
    body: "Act as a grant writing coach. My organisation or business is [describe it], we serve [describe who you serve], and we are applying for [describe the grant or funding]. Draft a need statement, a project description, measurable outcomes, and a budget narrative outline. Flag anything I must verify with the funder before submitting.",
  },
  {
    n: "09",
    title: "The Brand Bio That Opens Doors",
    use: "One bio, three lengths, ready to paste anywhere.",
    body: "Act as a brand writer. Here is my background and what my business does: [describe it]. My audience is [describe them] and the tone I want is [describe it]. Write my founder bio in three lengths — a one-line intro, a short 50-word version, and a 150-word about-page version — each ending with a clear reason to work with me.",
  },
  {
    n: "10",
    title: "The CEO Week Plan",
    use: "Decide once, execute all week.",
    body: "Act as an executive operations coach. My goals this quarter are [describe your goals], I have [number] hours a week for my business, and my recurring commitments are [describe them]. Build a weekly schedule with themed days, the three tasks that actually move revenue, what to delegate or drop, and a 15-minute Friday review checklist.",
  },
];
