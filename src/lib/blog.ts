export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  date: string; // ISO
  dateLabel: string;
  readMinutes: number;
  excerpt: string;
  keyword: string;
  body: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ai-business-tools-for-women",
    keyword: "AI business tools for women",
    title: "How to run your business with AI when you're the only employee",
    metaTitle: "AI Business Tools for Women: Run Everything Solo (2026 Guide)",
    description:
      "A practical guide to using AI business tools as a solo woman entrepreneur — what to automate first, what to never hand over, and the exact weekly workflow.",
    eyebrow: "AI · Operations",
    date: "2026-08-24",
    dateLabel: "August 24, 2026",
    readMinutes: 8,
    excerpt:
      "You don't need a team of five. You need three AI habits and a weekly rhythm. Here's the workflow solo founders actually stick to.",
    body: [
      {
        type: "p",
        text: "Most advice for women entrepreneurs assumes you have help — a marketing person, a bookkeeper, someone to answer emails. If you're doing all of it yourself, the advice doesn't land. What you need isn't more tools. It's a short list of things AI is genuinely good at, and permission to stop doing the rest by hand.",
      },
      { type: "h2", text: "Start with the three tasks that steal your week" },
      {
        type: "p",
        text: "Before you automate anything, write down every task you repeated in the last seven days. Almost every solo business owner ends up with the same three time thieves:",
      },
      {
        type: "list",
        items: [
          "Writing content — captions, emails, and the endless \"what do I post today\" spiral.",
          "Client communication — proposals, follow-ups, onboarding messages, polite chasing of invoices.",
          "Deciding — what to offer, what to charge, what to do next when everything feels urgent.",
        ],
      },
      {
        type: "p",
        text: "AI handles all three well, in that order of difficulty. Content is the easiest win, communication is the fastest relief, and decision support is where the real money is — because a bad pricing decision costs more than a bad caption ever will.",
      },
      { type: "h2", text: "The weekly rhythm that actually holds" },
      {
        type: "h3",
        text: "Monday: one strategy conversation (20 minutes)",
      },
      {
        type: "p",
        text: "Open your AI assistant and describe the week honestly: what you sell, what's slow, what you're avoiding. Ask for three concrete moves, ranked by revenue impact. Pick one. Not three — one. Solo businesses fail from scattered effort far more often than from lack of ideas.",
      },
      { type: "h3", text: "Tuesday: batch a week of content (45 minutes)" },
      {
        type: "p",
        text: "Take the one move you chose and turn it into a week of posts: a story post, a teaching post, a proof post, an offer post. Ask for hooks first, choose the ones that sound like you, then generate full drafts. Edit for voice — never publish raw output.",
      },
      { type: "h3", text: "Wednesday through Friday: communication on rails" },
      {
        type: "p",
        text: "Keep a saved prompt for each recurring message: inquiry reply, proposal, follow-up, invoice reminder, offboarding thank-you. When one arrives, you're editing a draft instead of composing from nothing. This is the single change that makes a one-woman business feel established.",
      },
      { type: "h2", text: "What you should never hand to AI" },
      {
        type: "list",
        items: [
          "Numbers you haven't verified — revenue claims, results, statistics, testimonials.",
          "Legal, tax or medical specifics for your particular situation.",
          "Anything a client shared in confidence that you wouldn't paste into a public tool.",
          "Your final judgment on price. Get input, then decide yourself.",
        ],
      },
      {
        type: "quote",
        text: "AI shortens the distance between having an idea and having something to show. It doesn't decide whether the idea is worth having.",
      },
      { type: "h2", text: "How to set this up this week" },
      {
        type: "p",
        text: "Create a free Her Empire Era account, open Victoria AI, and run the Monday conversation today — even if it's Thursday. Then pull four prompts from the Empire Prompt Vault for your content batch. That's the whole system. It takes about an hour to start and gives back most of a workday every week.",
      },
    ],
  },
  {
    slug: "how-to-price-your-services",
    keyword: "how to price your services as a woman entrepreneur",
    title: "How to price your services without undercharging (again)",
    metaTitle: "How to Price Your Services as a Woman Entrepreneur",
    description:
      "A step-by-step pricing method for women entrepreneurs: work out your real floor, price on outcome instead of hours, and raise your rates without losing clients.",
    eyebrow: "Pricing · Strategy",
    date: "2026-08-17",
    dateLabel: "August 17, 2026",
    readMinutes: 7,
    excerpt:
      "If you flinch when you say your price, it's too low. Here's the math and the script for fixing it.",
    body: [
      {
        type: "p",
        text: "Undercharging is rarely a confidence problem alone. It's usually a math problem wearing a confidence costume. When you don't know your real floor, every number feels like a guess — and a guess said out loud sounds like an apology.",
      },
      { type: "h2", text: "Step 1: Find your actual floor" },
      {
        type: "p",
        text: "Add up what your business must cover each month: software, insurance, fees, marketing, taxes set aside, and the amount you personally need to be paid. Divide that by the number of billable projects or hours you can realistically deliver in a month — not the theoretical maximum, the honest one, allowing for admin, sales calls and life.",
      },
      {
        type: "p",
        text: "That number is your floor. Anything below it means you're paying for the privilege of working. You're allowed to know this before you quote.",
      },
      { type: "h2", text: "Step 2: Price the outcome, not the hours" },
      {
        type: "p",
        text: "Hourly pricing punishes you for getting faster. Outcome pricing rewards experience. Instead of \"three hours of résumé editing,\" the offer is \"a résumé that gets you shortlisted for the role you actually want.\" Same work, different frame, defensible price.",
      },
      {
        type: "list",
        items: [
          "Name the result the client is buying, in their words.",
          "List what's included so scope is visible and finite.",
          "Set a revision limit — two rounds is standard and protects both sides.",
          "State a turnaround. Speed is a premium feature people pay for.",
        ],
      },
      { type: "h2", text: "Step 3: Build three tiers, not one price" },
      {
        type: "p",
        text: "A single price is a yes-or-no question. Three tiers turn the conversation into which one. Anchor with a premium option you'd genuinely be glad to deliver, put your target offer in the middle, and keep an entry tier that's still above your floor.",
      },
      { type: "h2", text: "Step 4: Raise your rates with a script" },
      {
        type: "p",
        text: "Tell existing clients once, in writing, with a date: \"Starting the first of next month my rate for this work is $X. I've loved working with you and wanted you to have notice before it changes.\" No justification paragraph. No apology. Some will leave. The ones who stay are the business you want.",
      },
      {
        type: "quote",
        text: "You are not raising your price to be difficult. You are raising it so the work stays sustainable enough to keep being good.",
      },
      { type: "h2", text: "Pressure-test your numbers before you send them" },
      {
        type: "p",
        text: "Run your offer past Victoria AI: paste your floor, your tiers and your client type, and ask where the pricing is weak and what objections you'll get. You'll find the soft spot in five minutes instead of five rejected proposals.",
      },
    ],
  },
  {
    slug: "grant-application-checklist",
    keyword: "grant application checklist for small business",
    title: "The grant application checklist that gets you past the first read",
    metaTitle: "Grant Application Checklist for Women-Owned Businesses",
    description:
      "What reviewers look for in a small-business grant application — the documents to prepare, the narrative structure that scores well, and the mistakes that get applications discarded early.",
    eyebrow: "Funding · Grants",
    date: "2026-08-10",
    dateLabel: "August 10, 2026",
    readMinutes: 9,
    excerpt:
      "Most applications aren't rejected on merit. They're discarded for missing documents and vague answers. Fix both before you apply again.",
    body: [
      {
        type: "p",
        text: "Grant reviewers read fast. On the first pass they're not deciding who deserves funding — they're removing applications that are incomplete, off-mission or unclear. Your first job is surviving that pass. Everything below is written for that.",
      },
      { type: "h2", text: "Prepare these documents once, reuse them forever" },
      {
        type: "list",
        items: [
          "Legal business name, formation documents and your registration number.",
          "Employer identification number and, where required, government registration such as a SAM.gov entity ID.",
          "A one-page business summary: what you do, who you serve, traction and revenue.",
          "Last two years of financials, or a simple profit-and-loss statement if you're newer.",
          "A project budget with line items and totals that add up exactly.",
          "Proof of ownership demographics if the program is for women or minority-owned businesses.",
        ],
      },
      {
        type: "p",
        text: "Keep them in one folder, named clearly, updated quarterly. The reason people miss deadlines is almost never the writing — it's hunting for a document at 11 p.m.",
      },
      { type: "h2", text: "The narrative structure that scores well" },
      {
        type: "h3",
        text: "1. The need, in their language" },
      {
        type: "p",
        text: "Mirror the program's stated priorities. If the grant funds job creation in underserved communities, your first paragraph should make that link explicit and specific — the neighborhood, the population, the gap.",
      },
      { type: "h3", text: "2. Your solution, concretely" },
      {
        type: "p",
        text: "What exactly will you do with the money? Reviewers reward specificity: \"hire one part-time stylist and add Saturday hours\" beats \"grow the business\" every time.",
      },
      { type: "h3", text: "3. Capacity — why you" },
      {
        type: "p",
        text: "Show you can deliver: years operating, clients served, relevant experience, partnerships. This is where quiet competence wins over enthusiasm.",
      },
      { type: "h3", text: "4. Measurable impact" },
      {
        type: "p",
        text: "Give numbers you can defend: units sold, clients served, hours created, revenue projected. Attach a timeframe to each. Never invent a figure you couldn't explain in a follow-up call.",
      },
      { type: "h2", text: "Five mistakes that end applications early" },
      {
        type: "list",
        items: [
          "Applying when you don't meet a stated eligibility requirement.",
          "A budget whose lines don't sum to the amount requested.",
          "Generic copy that could describe any business in any city.",
          "Ignoring word limits or the required file format.",
          "Submitting on the final day, when portals are slowest and mistakes are unfixable.",
        ],
      },
      {
        type: "quote",
        text: "Apply to five programs, not one. Grant funding is a volume game played with a strong template.",
      },
      { type: "h2", text: "Where to start today" },
      {
        type: "p",
        text: "Browse our free directories of grants for women and grants for African women, shortlist five you clearly qualify for, and build your one-page summary. If you'd rather have the application written for you, request a quote for grant writing and we'll follow up with scope and pricing.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const BLOG_POSTS_SORTED = [...BLOG_POSTS].sort((a, b) =>
  a.date < b.date ? 1 : -1,
);
