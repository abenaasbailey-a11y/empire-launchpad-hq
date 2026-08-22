/**
 * Grant data for the /grants-for-women SEO page.
 * Every entry is a real, named program women entrepreneurs can apply to.
 * Amounts and details reflect publicly available information as of 2025-2026;
 * always verify on the provider's site before applying.
 */

export type GrantCategory =
  | "Monthly & Rolling"
  | "Startup & Early-Stage"
  | "Women of Color"
  | "Established Business"
  | "Industry-Specific";

export interface Grant {
  name: string;
  provider: string;
  amount: string;
  category: GrantCategory;
  eligibility: string;
  deadline: string;
  url: string;
  notes: string;
}

export const GRANT_CATEGORIES: GrantCategory[] = [
  "Monthly & Rolling",
  "Startup & Early-Stage",
  "Women of Color",
  "Established Business",
  "Industry-Specific",
];

export const GRANTS: Grant[] = [
  {
    name: "Amber Grant",
    provider: "WomensNet",
    amount: "$10,000 monthly + $25,000 year-end",
    category: "Monthly & Rolling",
    eligibility:
      "Women entrepreneurs at any stage. U.S.-based. Simple online application — no business plan required.",
    deadline: "Rolling — last day of every month",
    url: "https://www.womensnet.com/amber-grant/",
    notes: "One of the easiest grants to apply for. Winners are announced the following month.",
  },
  {
    name: "IFundWomen Universal Grant Program",
    provider: "IFundWomen",
    amount: "$500–$10,000+ (varies by round)",
    category: "Monthly & Rolling",
    eligibility:
      "Women-owned businesses in the U.S. Must have a verified IFundWomen profile and complete the grant application.",
    deadline: "Multiple rounds per year — rolling",
    url: "https://ifundwomen.com/grants",
    notes: "IFundWomen runs several branded grant rounds throughout the year. Keep your profile updated.",
  },
  {
    name: "Hello Alice Small Business Grants",
    provider: "Hello Alice",
    amount: "$5,000–$25,000 (varies by program)",
    category: "Monthly & Rolling",
    eligibility:
      "U.S.-based small business owners. Create a free Hello Alice account and complete your business profile to be matched.",
    deadline: "Multiple programs — rolling deadlines",
    url: "https://helloalice.com/grants",
    notes: "Hello Alice matches you to grants based on your profile. Apply to each open program individually.",
  },
  {
    name: "Comcast RISE Investment Fund",
    provider: "Comcast",
    amount: "$5,000 monetary + marketing services",
    category: "Women of Color",
    eligibility:
      "Women-owned businesses owned by women of color, especially in media, tech, and communications. U.S.-based.",
    deadline: "Annual — typically opens spring",
    url: "https://www.comcastrise.com/",
    notes: "Includes marketing and technology services in addition to the cash grant.",
  },
  {
    name: "SoGal Black Founder Startup Grant",
    provider: "SoGal Foundation",
    amount: "$10,000",
    category: "Women of Color",
    eligibility:
      "Black women or non-binary entrepreneurs. Must have a scalable business idea or early-stage company. U.S.-based.",
    deadline: "Rolling — multiple cohorts",
    url: "https://sogalfoundation.org/grant/",
    notes: "Recipients also receive mentorship and access to the SoGal investor network.",
  },
  {
    name: "The Fearless Fund Strivers Grant",
    provider: "Fearless Fund",
    amount: "$20,000",
    category: "Women of Color",
    eligibility:
      "Women of color founders of early-stage businesses. Must be a U.S.-based, revenue-generating company.",
    deadline: "Annual — check for current cycle",
    url: "https://fearlessfund.com/",
    notes: "Includes access to mentorship and a founder community.",
  },
  {
    name: "Tory Burch Foundation Fellows Program",
    provider: "Tory Burch Foundation",
    amount: "$5,000 grant + 1-year fellowship",
    category: "Startup & Early-Stage",
    eligibility:
      "Women entrepreneurs with an early-stage business (at least 1 year old). U.S.-based. Must complete an application and be selected.",
    deadline: "Annual — typically opens spring",
    url: "https://www.toryburchfoundation.org/fellows/",
    notes: "Fellows receive business education, networking, and mentorship in addition to the grant.",
  },
  {
    name: "Cartier Women's Initiative",
    provider: "Cartier",
    amount: "$30,000–$100,000",
    category: "Startup & Early-Stage",
    eligibility:
      "Women founders of impact-driven businesses. Must be the founder or co-founder with equity stake. International program.",
    deadline: "Annual — applications open mid-year",
    url: "https://www.cartierwomensinitiative.com/",
    notes: "One of the largest grants for women. Includes executive coaching and media exposure.",
  },
  {
    name: "Visa She's Next Grant Program",
    provider: "Visa",
    amount: "$10,000 + coaching",
    category: "Startup & Early-Stage",
    eligibility:
      "Women-owned small businesses. U.S.-based. Must submit a business application through the program portal.",
    deadline: "Annual — varies by region",
    url: "https://usa.visa.com/small-business/she-s-next.html",
    notes: "Winners receive one year of coaching from IFundWomen.",
  },
  {
    name: "Eileen Fisher Business Grant",
    provider: "Eileen Fisher",
    amount: "$12,500",
    category: "Established Business",
    eligibility:
      "Women-owned businesses focused on social or environmental impact. Must be at least 3 years old with revenue.",
    deadline: "Annual — typically spring",
    url: "https://eileenfisher.com/business-grant",
    notes: "Emphasizes sustainability and community impact.",
  },
  {
    name: "FedEx Small Business Grant Contest",
    provider: "FedEx",
    amount: "$30,000–$50,000",
    category: "Established Business",
    eligibility:
      "Operating U.S. business that has been shipping with FedEx for at least 6 months. Must submit a profile and story.",
    deadline: "Annual — typically opens early spring",
    url: "https://smallbusinessgrant.fedex.com/",
    notes: "Winners are chosen by public vote and judging panel. Not women-exclusive but women win frequently.",
  },
  {
    name: "NASE Growth Grants",
    provider: "National Association for the Self-Employed",
    amount: "$4,000",
    category: "Established Business",
    eligibility:
      "NASE members in good standing. Must show a clear business need for the grant. U.S.-based sole proprietors and small businesses.",
    deadline: "Rolling — quarterly reviews",
    url: "https://www.nase.org/benefits/growth-grants",
    notes: "Requires NASE membership ($11.95/month). Multiple grants awarded each quarter.",
  },
  {
    name: "Girlboss Foundation Grant",
    provider: "Girlboss",
    amount: "$15,000",
    category: "Startup & Early-Stage",
    eligibility:
      "Women and non-binary entrepreneurs in creative, design, fashion, music, or arts. U.S.-based.",
    deadline: "Bi-annual — spring and fall",
    url: "https://girlboss.com/foundation",
    notes: "Focused on creative and design-forward businesses.",
  },
  {
    name: "Small Business Innovation Research (SBIR) Program",
    provider: "U.S. Government (11 agencies)",
    amount: "$50,000–$1.75M (across phases)",
    category: "Industry-Specific",
    eligibility:
      "U.S.-based for-profit businesses with fewer than 500 employees focused on research and technology.",
    deadline: "Varies by agency — rolling",
    url: "https://www.sbir.gov/",
    notes: "Not women-exclusive, but women-owned firms get priority consideration. Best for tech and science businesses.",
  },
  {
    name: "Grants.gov",
    provider: "U.S. Federal Government",
    amount: "Varies by opportunity",
    category: "Industry-Specific",
    eligibility:
      "Varies by grant. Search and filter for business grants by category, agency, and eligibility.",
    deadline: "Rolling — multiple open at any time",
    url: "https://www.grants.gov/",
    notes: "The official federal grants portal. Use the advanced search and filter by 'business' to find relevant opportunities.",
  },
  {
    name: "Open Meadows Foundation Grants",
    provider: "Open Meadows Foundation",
    amount: "$2,000",
    category: "Industry-Specific",
    eligibility:
      "Projects led by and for women and girls, particularly those focused on social justice, environment, or community building.",
    deadline: "Bi-annual — spring and fall",
    url: "https://openmeadows.org/",
    notes: "Best for nonprofit or community-focused ventures led by women.",
  },
];

export const GRANTS_FAQ = [
  {
    q: "Can I really get a grant to start a business as a woman?",
    a: "Yes. There are dozens of grants specifically for women entrepreneurs, and many accept applications on a rolling basis. The Amber Grant, IFundWomen, and Hello Alice are the three easiest to start with because they have simple applications and frequent deadlines. You don't need to be an established business to qualify for all of them — several target founders at the idea or early-stage phase.",
  },
  {
    q: "Do I need to pay back a grant?",
    a: "No. Grants are not loans — you don't repay them and you don't give up equity. They are free money awarded to help you build your business. The trade-off is that they are competitive, so you'll need a clear story about what your business does and why the grant will help it grow.",
  },
  {
    q: "How do I write a winning grant application?",
    a: "Start with a one-sentence summary of what your business does and who it serves. Then explain exactly how the grant money will be used (be specific — equipment, marketing, inventory, hiring). Include any traction you have: revenue, customers, press, or partnerships. Keep it under the word limit and proofread. Many grant providers care more about clarity and momentum than a polished business plan.",
  },
  {
    q: "How many grants should I apply for?",
    a: "Apply for at least three to five at a time. Grant cycles are competitive, and each application gets easier once you've written your business summary once. Track deadlines in a spreadsheet and set reminders for the ones with rolling deadlines so you can reapply if you don't win the first round.",
  },
  {
    q: "Are there grants specifically for women of color?",
    a: "Yes. The SoGal Black Founder Startup Grant, Comcast RISE, and the Fearless Fund Strivers Grant are all specifically for women of color entrepreneurs. These programs also include mentorship and networking, which can be as valuable as the funding itself.",
  },
  {
    q: "Can Victoria AI help me write my grant application?",
    a: "Yes. When you join Her Empire Era free, you get access to Victoria AI and the Empire Prompt Vault, which includes grant-writing prompts. Victoria can help you draft your application, organize your business summary, and refine your answers — then you review and submit it yourself.",
  },
];
