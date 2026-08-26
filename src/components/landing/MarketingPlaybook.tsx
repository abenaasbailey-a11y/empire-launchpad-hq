import { useState } from "react";
import {
  Calendar,
  Copy,
  Check,
  Sparkles,
  Target,
  Mail,
  Users,
  TrendingUp,
  Megaphone,
  Rocket,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Section, SectionHeading, GoldRule } from "@/components/landing/Section";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------- */
/*  Data                                                              */
/* ----------------------------------------------------------------- */

type Caption = { platform: string; text: string; hashtags: string };

const CAPTIONS: Caption[] = [
  {
    platform: "Instagram — Hero / Reel hook",
    text:
      "Your empire doesn't need another course. It needs a concierge. ✨\n\nVictoria is the AI business partner that helps you price, plan, write your captions, build your launch sequence, and map the exact next step — at 2am if that's when you work.\n\nStart free → herempireera.com/join",
    hashtags: "#HerEmpireEra #WomenInBusiness #AIForWomen #FemaleFounder #WomenEntrepreneurs #BusinessConcierge #AIBusinessTools",
  },
  {
    platform: "TikTok — Story-driven",
    text:
      "POV: you stopped buying courses and got an AI concierge that actually does the work with you 🤝\n\nVictoria writes your offers, fills your content calendar, prices your services, and gives you the next step every single day.\n\nNo credit card to start. Link in bio.",
    hashtags: "#HerEmpireEra #WomenInAI #SideHustleForWomen #BusinessTools #AIPrompts #FemaleFounderLife",
  },
  {
    platform: "Instagram — Grant / Services",
    text:
      "Grants for women entrepreneurs are real. Most people never apply because the process feels impossible.\n\nWe help you cut through it — grant writing, business plans, résumés, and marketing copy, done with you.\n\nFixed quotes from $350. Request yours → yourempireconcierge.com/services",
    hashtags: "#GrantsForWomen #WomenInBusiness #GrantWriting #BusinessPlan #HerEmpireEra #SmallBusinessGrants",
  },
  {
    platform: "Facebook — Community / Trust",
    text:
      "I built Her Empire Era because I was tired of watching women piece together free templates and still feel stuck.\n\nInside, you get Victoria — a private AI concierge for planning, branding, and marketing. Plus a vault of 56 business prompts, an opportunity center with 200+ AI side hustles, and a community that gets it.\n\nStart free. No card required. herempireera.com/join",
    hashtags: "#WomenSupportingWomen #WomenEntrepreneurs #AIBusiness #HerEmpireEra",
  },
  {
    platform: "Instagram — Prompt Vault teaser",
    text:
      "Stop guessing what to ask ChatGPT. 🛑\n\nThe Empire Prompt Vault has 56 strategist-grade prompts for pricing, content, emails, business planning, grants, and branding — copy, paste, done.\n\nTry 10 free → herempireera.com/free-prompts",
    hashtags: "#ChatGPTPrompts #AIPrompts #ContentCreation #HerEmpireEra #WomenInBusiness",
  },
  {
    platform: "TikTok — Opportunity Center",
    text:
      "200+ AI side hustles, filtered by your skill level. You scroll, you pick one, and Victoria tells you exactly how to start.\n\nThis is how you go from idea to income without burning out. 📈\n\nFree to browse → herempireera.com/opportunity-center",
    hashtags: "#SideHustle #WomenSideHustles #AIIncome #HerEmpireEra #PassiveIncome",
  },
  {
    platform: "Instagram — Membership / Social proof",
    text:
      "\"I went from a viral reel to a priced offer and a welcome sequence in one evening. Victoria didn't just answer questions — she did the work with me.\"\n\nThat's what happens inside Her Empire Era. ✨\n\nMember: $19.99/mo · Elite: $49.99/mo · VIP: $99/mo\nCancel anytime. 30-day money-back.\n\nJoin → herempireera.com/membership",
    hashtags: "#HerEmpireEra #WomenInBusiness #MembershipCommunity #AIConcierge",
  },
  {
    platform: "Facebook — Lead magnet funnel",
    text:
      "Want 10 AI prompts that will save you hours this week? Free, no email required.\n\nPrice your offer, fill 30 days of content, write your website copy, and draft your welcome sequence.\n\nGrab them → herempireera.com/free-prompts",
    hashtags: "#FreePrompts #AIBusiness #HerEmpireEra #WomenEntrepreneurs",
  },
];

type CalendarEntry = { day: string; platform: string; content: string; link: string };

const CALENDAR: CalendarEntry[] = [
  { day: "Mon", platform: "Instagram Reel", content: "Hook: 'Stop buying courses. Get a concierge.' → Drive to /join", link: "herempireera.com/join" },
  { day: "Mon", platform: "TikTok", content: "Day-in-the-life: using Victoria to plan your week in 5 minutes", link: "herempireera.com/join" },
  { day: "Tue", platform: "Instagram Story", content: "Poll: 'What's the #1 thing slowing you down?' → follow-up DM with /free-prompts", link: "herempireera.com/free-prompts" },
  { day: "Tue", platform: "Facebook Group", content: "Share the free grant directory post + personal story", link: "herempireera.com/grants-for-women" },
  { day: "Wed", platform: "Instagram Carousel", content: "3 prompts from the Vault that save 5+ hours/week", link: "herempireera.com/free-prompts" },
  { day: "Wed", platform: "TikTok", content: "Browse the Opportunity Center — pick one side hustle, show how Victoria breaks it down", link: "herempireera.com/opportunity-center" },
  { day: "Thu", platform: "Instagram Reel", content: "Testimonial-style: 'How I built my offer in one evening'", link: "herempireera.com/membership" },
  { day: "Thu", platform: "Facebook Post", content: "Services flyer repost + 'Grant writing spots open this month'", link: "yourempireconcierge.com/services" },
  { day: "Fri", platform: "Instagram Story", content: "Countdown: 'Weekend empire-builders — Victoria's open late' → /join", link: "herempireera.com/join" },
  { day: "Fri", platform: "TikTok", content: "Trending audio + text overlay: 'Your empire starts with a prompt.' → /free-prompts", link: "herempireera.com/free-prompts" },
  { day: "Sat", platform: "Instagram Reel", content: "Behind-the-scenes: building the app / your founder journey", link: "herempireera.com/press" },
  { day: "Sun", platform: "Facebook Group", content: "Sunday reset: share one prompt + encourage members to share their win", link: "herempireera.com/free-prompts" },
];

type SeoPage = { keyword: string; intent: string; page: string; priority: string };

const SEO_PAGES: SeoPage[] = [
  { keyword: "AI business tools for women", intent: "Find tools to run their business with AI", page: "New: /ai-tools-for-women", priority: "High" },
  { keyword: "free ChatGPT prompts for business", intent: "Ready-to-use prompts they can copy now", page: "Existing: /chatgpt-prompts", priority: "Done ✓" },
  { keyword: "grants for women entrepreneurs", intent: "Find and apply for funding", page: "Existing: /grants-for-women", priority: "Done ✓" },
  { keyword: "AI side hustle ideas for women", intent: "Browse income ideas they can start", page: "Existing: /opportunity-center", priority: "Optimize" },
  { keyword: "business plan writer for women", intent: "Hire someone to write their plan", page: "Existing: /services", priority: "Optimize" },
  { keyword: "AI marketing assistant for small business", intent: "Understand what Victoria does", page: "New: /ai-marketing-assistant", priority: "Medium" },
  { keyword: "women in AI leadership", intent: "Inspiration / founder story", page: "Existing: /press", priority: "Optimize" },
  { keyword: "how to price your services as a woman entrepreneur", intent: "Practical pricing guidance", page: "New: /pricing-guide", priority: "Medium" },
];

type EmailStep = { day: string; subject: string; body: string };

const EMAIL_SEQUENCE: EmailStep[] = [
  {
    day: "Day 0 (immediate)",
    subject: "Welcome to Her Empire Era — your first prompt is inside",
    body: "Confirm their free signup, link to /welcome onboarding checklist, and include one copy-paste prompt they can use immediately. CTA: Meet Victoria at /join.",
  },
  {
    day: "Day 2",
    subject: "The prompt that priced my first offer",
    body: "Share the pricing prompt from the Vault with a short personal story. CTA: Unlock all 56 prompts with Member ($19.99/mo).",
  },
  {
    day: "Day 4",
    subject: "200+ AI side hustles — which one is yours?",
    body: "Highlight the Opportunity Center with 3 specific ideas. CTA: Browse free at /opportunity-center.",
  },
  {
    day: "Day 7",
    subject: "Grants are real. Here's where to start.",
    body: "Link to the free grant directory + mention services (grant writing from $350). CTA: Request a quote at /services.",
  },
  {
    day: "Day 10",
    subject: "What Victoria actually does (demo inside)",
    body: "Embed or link a short Victoria demo. CTA: Try Victoria free at /join.",
  },
  {
    day: "Day 14",
    subject: "Member, Elite, or VIP — which tier fits you?",
    body: "Side-by-side comparison of the 3 tiers with the specific features each unlocks. CTA: Join at /membership.",
  },
];

type Partnership = { type: string; action: string };

const PARTNERSHIPS: Partnership[] = [
  { type: "Women entrepreneur Facebook groups", action: "Join 5–10 active groups. Share free prompts (not sales). DM anyone who engages with your /services link." },
  { type: "Instagram collab posts", action: "Find 3–5 women-in-business creators with 5K–50K followers. Offer a free month of VIP in exchange for a collab Reel." },
  { type: "Podcast guest pitching", action: "Pitch yourself to 10 women-in-business podcasts using your /press media kit. Angle: 'How AI is leveling the playing field for women founders.'" },
  { type: "Local women's business orgs", action: "Reach out to local SBA Women's Business Centers, SCORE chapters, and Chambers of Commerce. Offer a free workshop on AI tools for women." },
  { type: "TikTok creator fund / Spark Ads", action: "Once you have 5–10 organic posts with engagement, boost your best-performing Reel with $20–$50 in Spark Ads targeting women 25–45." },
  { type: "Cross-promo with grant directories", action: "Contact sites like Grants.gov partners and women's orgs. Offer your /grants-for-women page as a resource they can link to." },
];

type ActionStep = { week: string; title: string; tasks: string[] };

const ACTION_PLAN: ActionStep[] = [
  {
    week: "Week 1",
    title: "Foundation & first posts",
    tasks: [
      "Set up / claim @herempireera on Instagram, TikTok, Facebook, and YouTube",
      "Use the crown logo as profile picture on all platforms",
      "Write a 2-line bio: 'AI business concierge for women building their empire. Start free ↓'",
      "Post the 8 captions above — 2 per day across platforms",
      "Pin the hero post ('Your empire starts with a prompt') to the top of your profile",
    ],
  },
  {
    week: "Week 2",
    title: "Content engine & lead magnets",
    tasks: [
      "Start the content calendar rotation (below) — 2 posts/day",
      "Share the /free-prompts lead magnet in 3 Facebook groups (value-first, no hard sell)",
      "Record 3 short screen-recordings of Victoria in action for TikTok",
      "Post the services flyer on Instagram + Facebook with captions",
      "Set up the email welcome sequence (outlined below) in your email tool",
    ],
  },
  {
    week: "Week 3",
    title: "Partnerships & amplification",
    tasks: [
      "Reach out to 5 women-in-business creators for collab posts",
      "Pitch yourself to 5 podcasts using the /press media kit",
      "Join 5 Facebook groups for women entrepreneurs — engage daily, share free prompts weekly",
      "Boost your best-performing Reel with $20–$50 in Spark Ads",
      "Reach out to 2 local women's business organizations for a free workshop offer",
    ],
  },
  {
    week: "Week 4",
    title: "Convert & optimize",
    tasks: [
      "Review analytics: which posts drove the most /join traffic? Double down on that format",
      "Post a membership-focused Reel with the testimonial + 3-tier comparison",
      "Reshare the services flyer — 'Grant writing spots filling for next month'",
      "Check Google Search Console for new keyword rankings — note which SEO pages to build next",
      "Plan next month's content using the top 3 performing post types",
    ],
  },
];

const KPIs = [
  { metric: "Free signups / week", target: "50+ by week 4", how: "Track in Supabase — count new auth.users per week" },
  { metric: "Free → paid conversion rate", target: "5–10%", how: "Members / total signups × 100" },
  { metric: "Social media followers", target: "1,000 combined by month 2", how: "Sum across Instagram, TikTok, Facebook" },
  { metric: "Website traffic / month", target: "2,000+ visitors by month 2", how: "Google Search Console + Analytics" },
  { metric: "Service request leads / month", target: "10+ by month 2", how: "Count rows in service_requests table" },
  { metric: "Email open rate", target: "30%+", how: "Your email tool's dashboard" },
];

/* ----------------------------------------------------------------- */
/*  Components                                                        */
/* ----------------------------------------------------------------- */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold transition-colors hover:bg-gold/20"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function Collapsible({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-border/60 bg-card/50 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-gold/5"
      >
        <span className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-gold" />
          <span className="font-display text-base font-light md:text-lg">{title}</span>
        </span>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && <div className="border-t border-border/40 px-5 py-5">{children}</div>}
    </div>
  );
}

function CaptionCard({ caption }: { caption: Caption }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-blush/15 px-3 py-1 text-xs font-medium text-blush">{caption.platform}</span>
        <CopyButton text={`${caption.text}\n\n${caption.hashtags}`} />
      </div>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{caption.text}</p>
      <p className="mt-3 text-xs text-muted-foreground">{caption.hashtags}</p>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15">
        <Icon className="h-5 w-5 text-gold" />
      </div>
      <div>
        <h3 className="font-display text-xl font-light md:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Main                                                              */
/* ----------------------------------------------------------------- */

export function MarketingPlaybook() {
  return (
    <>
      {/* Hero */}
      <Section className="pb-12 pt-28 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow eyebrow-blush">Private — Admin Only</p>
          <h1 className="font-display mt-5 text-[2.25rem] leading-[1.1] font-light md:text-5xl md:leading-[1.08]">
            Her Empire Era — Marketing Playbook
          </h1>
          <GoldRule className="mx-auto mt-6" />
          <p className="text-muted-foreground mt-6 text-[0.95rem] leading-relaxed md:text-base">
            A complete 30-day growth plan to turn social-media followers into free signups, paying members, and
            service leads. Every caption, post idea, and email is ready to copy and paste.
          </p>
        </div>
      </Section>

      {/* Brand Positioning */}
      <Section className="py-12 md:py-16">
        <Collapsible title="Brand Positioning & Core Messaging" icon={Target} defaultOpen>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border/50 bg-card/30 p-5">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gold">One-liner</h4>
              <p className="text-sm leading-relaxed">
                Her Empire Era is the AI business concierge for women founders — Victoria helps you plan, price, brand,
                and market your business so you stop piecing together templates and start building.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card/30 p-5">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gold">Who it's for</h4>
              <p className="text-sm leading-relaxed">
                Women entrepreneurs and aspiring founders — from a first idea to an established brand — who want to use
                AI to move faster without tech overwhelm. Also women seeking grants and business resources.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card/30 p-5">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gold">Core promise</h4>
              <p className="text-sm leading-relaxed">
                "Your empire starts with a prompt." You get a private AI concierge that does the work <em>with</em> you —
                not just advice, but execution.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card/30 p-5">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gold">Differentiators</h4>
              <ul className="space-y-1 text-sm leading-relaxed">
                <li>• 56-prompt vault (not generic — strategist-grade)</li>
                <li>• 200+ AI side hustle Opportunity Center</li>
                <li>• Victoria remembers your business context</li>
                <li>• Grant writing & business plan services</li>
                <li>• Luxury brand experience, not another tool</li>
              </ul>
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-gold/30 bg-gold/5 p-5">
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gold">Taglines to rotate</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Your empire starts with a prompt.",
                "Build the empire your audience already believes you have.",
                "An empire needs an operation, not more advice.",
                "Your private AI business concierge.",
                "Stop planning. Start selling.",
              ].map((t) => (
                <span key={t} className="rounded-full border border-border/50 bg-background/40 px-3 py-1 text-xs text-foreground/80">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Collapsible>
      </Section>

      {/* Social Media Captions */}
      <Section className="py-12 md:py-16">
        <SectionHeader
          icon={Megaphone}
          title="Ready-to-Use Social Media Captions"
          subtitle="8 captions — copy, paste, post. Each links to a specific page on your site."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {CAPTIONS.map((c) => (
            <CaptionCard key={c.platform} caption={c} />
          ))}
        </div>
      </Section>

      {/* Content Calendar */}
      <Section className="py-12 md:py-16">
        <Collapsible title="30-Day Content Calendar" icon={Calendar} defaultOpen>
          <p className="mb-4 text-sm text-muted-foreground">
            Repeat this 12-post rotation weekly for 4 weeks. 2 posts per day across Instagram, TikTok, and Facebook.
            Rotate the captions above to match each slot.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Day</th>
                  <th className="pb-2 pr-4 font-medium">Platform</th>
                  <th className="pb-2 pr-4 font-medium">Content</th>
                  <th className="pb-2 font-medium">Link</th>
                </tr>
              </thead>
              <tbody>
                {CALENDAR.map((row, i) => (
                  <tr key={i} className="border-b border-border/20 align-top">
                    <td className="py-3 pr-4 font-medium text-gold">{row.day}</td>
                    <td className="py-3 pr-4 text-foreground/90">{row.platform}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{row.content}</td>
                    <td className="py-3 text-xs text-blush">{row.link}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Collapsible>
      </Section>

      {/* SEO Content Plan */}
      <Section className="py-12 md:py-16">
        <Collapsible title="SEO Content Plan — Keywords to Win" icon={TrendingUp}>
          <p className="mb-4 text-sm text-muted-foreground">
            These are the search terms your ideal audience types into Google. "Done ✓" pages already exist; "Optimize"
            pages need their metadata/headlines tightened; "New" pages should be built to capture that traffic.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Keyword</th>
                  <th className="pb-2 pr-4 font-medium">Search Intent</th>
                  <th className="pb-2 pr-4 font-medium">Page</th>
                  <th className="pb-2 font-medium">Priority</th>
                </tr>
              </thead>
              <tbody>
                {SEO_PAGES.map((row) => (
                  <tr key={row.keyword} className="border-b border-border/20 align-top">
                    <td className="py-3 pr-4 font-medium text-foreground/90">{row.keyword}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{row.intent}</td>
                    <td className="py-3 pr-4 text-xs text-blush">{row.page}</td>
                    <td className="py-3">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          row.priority.includes("Done")
                            ? "bg-green-500/15 text-green-400"
                            : row.priority === "High"
                              ? "bg-gold/15 text-gold"
                              : row.priority === "Medium"
                                ? "bg-blush/15 text-blush"
                                : "bg-muted/30 text-muted-foreground",
                        )}
                      >
                        {row.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Tip: Each new SEO page should have 800+ words, a clear H1 with the keyword, a comparison table or list, and
            a CTA to /join or /membership.
          </p>
        </Collapsible>
      </Section>

      {/* Email Marketing */}
      <Section className="py-12 md:py-16">
        <Collapsible title="Email Welcome Sequence (6 emails)" icon={Mail}>
          <p className="mb-4 text-sm text-muted-foreground">
            Set this up in your email tool (Mailchimp, ConvertKit, or Lovable app emails). Triggered when someone signs
            up free at /join. Note: promotional newsletters aren't supported by Lovable app emails — use a dedicated
            email service for this sequence.
          </p>
          <div className="space-y-4">
            {EMAIL_SEQUENCE.map((email) => (
              <div key={email.day} className="rounded-xl border border-border/50 bg-card/30 p-5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-blush/15 px-3 py-1 text-xs font-medium text-blush">{email.day}</span>
                  <CopyButton text={`Subject: ${email.subject}\n\n${email.body}`} />
                </div>
                <p className="font-medium text-foreground/90">{email.subject}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{email.body}</p>
              </div>
            ))}
          </div>
        </Collapsible>
      </Section>

      {/* Partnerships */}
      <Section className="py-12 md:py-16">
        <Collapsible title="Partnerships & Outreach Plan" icon={Users}>
          <div className="grid gap-4 md:grid-cols-2">
            {PARTNERSHIPS.map((p) => (
              <div key={p.type} className="rounded-xl border border-border/50 bg-card/30 p-5">
                <h4 className="mb-2 text-sm font-semibold text-gold">{p.type}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.action}</p>
              </div>
            ))}
          </div>
        </Collapsible>
      </Section>

      {/* 4-Week Action Plan */}
      <Section className="py-12 md:py-16">
        <Collapsible title="4-Week Action Plan" icon={Rocket} defaultOpen>
          <div className="grid gap-4 md:grid-cols-2">
            {ACTION_PLAN.map((step) => (
              <div key={step.week} className="rounded-xl border border-gold/30 bg-gold/5 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                    {step.week.replace("Week ", "")}
                  </span>
                  <h4 className="font-display text-lg font-light">{step.week} — {step.title}</h4>
                </div>
                <ul className="space-y-2">
                  {step.tasks.map((task, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold/60" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Collapsible>
      </Section>

      {/* KPIs */}
      <Section className="py-12 md:py-16">
        <Collapsible title="KPIs — What to Track" icon={Target}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">Metric</th>
                  <th className="pb-2 pr-4 font-medium">Target</th>
                  <th className="pb-2 font-medium">How to Measure</th>
                </tr>
              </thead>
              <tbody>
                {KPIs.map((kpi) => (
                  <tr key={kpi.metric} className="border-b border-border/20 align-top">
                    <td className="py-3 pr-4 font-medium text-foreground/90">{kpi.metric}</td>
                    <td className="py-3 pr-4 text-gold">{kpi.target}</td>
                    <td className="py-3 text-muted-foreground">{kpi.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Collapsible>
      </Section>

      {/* Quick links */}
      <Section className="py-12 md:py-16">
        <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-gold" />
            <h3 className="font-display text-lg font-light md:text-xl">Your marketing funnel at a glance</h3>
          </div>
          <div className="mt-5 grid gap-3 text-sm md:grid-cols-4">
            {[
              { step: "1. Attract", desc: "Social posts + SEO pages drive traffic to /join and /free-prompts", link: "herempireera.com/join" },
              { step: "2. Capture", desc: "Free signup → /welcome onboarding checklist", link: "herempireera.com/welcome" },
              { step: "3. Nurture", desc: "6-email sequence over 14 days builds trust", link: "Email tool" },
              { step: "4. Convert", desc: "Member $19.99 · Elite $49.99 · VIP $99 or /services lead", link: "herempireera.com/membership" },
            ].map((f) => (
              <div key={f.step} className="rounded-xl border border-border/40 bg-background/40 p-4">
                <p className="font-semibold text-gold">{f.step}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                <p className="mt-2 text-xs text-blush">{f.link}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
