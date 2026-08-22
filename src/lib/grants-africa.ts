/**
 * Grant data for the /grants-african-women SEO page.
 * Every entry is a real, named program women entrepreneurs in Africa
 * can apply to or participate in. Amounts and details reflect publicly
 * available information as of 2025-2026; always verify on the
 * provider's site before applying.
 */

export type AfricaGrantCategory =
  | "Pan-African"
  | "Nigeria"
  | "Ghana & West Africa"
  | "Kenya & East Africa"
  | "South Africa";

export interface AfricaGrant {
  name: string;
  provider: string;
  amount: string;
  category: AfricaGrantCategory;
  eligibility: string;
  deadline: string;
  url: string;
  notes: string;
}

export const AFRICA_GRANT_CATEGORIES: AfricaGrantCategory[] = [
  "Pan-African",
  "Nigeria",
  "Ghana & West Africa",
  "Kenya & East Africa",
  "South Africa",
];

export const AFRICA_GRANTS: AfricaGrant[] = [
  {
    name: "Tony Elumelu Foundation Entrepreneurship Programme",
    provider: "Tony Elumelu Foundation (TEF)",
    amount: "$5,000 (₦7M+) seed capital",
    category: "Pan-African",
    eligibility:
      "African entrepreneurs aged 18+ with a business idea or early-stage business (under 3 years). Open to all 54 African countries. Must complete the 12-week TEF training programme to receive funding.",
    deadline: "Annual — applications open January–March",
    url: "https://www.tonyelumelufoundation.org/apply",
    notes: "Africa's largest entrepreneurship programme — over 20,000 entrepreneurs funded since 2015. Women are strongly encouraged to apply.",
  },
  {
    name: "Africa Business Heroes Prize",
    provider: "Jack Ma Foundation",
    amount: "Up to $150,000",
    category: "Pan-African",
    eligibility:
      "African founders of businesses registered and operating in Africa. Must be the founder or co-founder with at least 6 months of operations. English and French applications accepted.",
    deadline: "Annual — applications open April–June",
    url: "https://africabusinessheroes.org/",
    notes: "Top 10 finalists share $1.5M in prize money. Includes mentorship from Alibaba executives and global visibility.",
  },
  {
    name: "Cartier Women's Initiative — Sub-Saharan Africa",
    provider: "Cartier",
    amount: "$30,000–$100,000",
    category: "Pan-African",
    eligibility:
      "Women founders of impact-driven businesses based in Sub-Saharan Africa. Must be the founder or co-founder with equity stake and at least 1 year of revenue-generating operations.",
    deadline: "Annual — applications typically open mid-year",
    url: "https://www.cartierwomensinitiative.com/",
    notes: "Regional award for Sub-Saharan Africa. Winners receive funding, executive coaching from INSEAD, and international media exposure.",
  },
  {
    name: "African Women's Development Fund (AWDF) Grants",
    provider: "AWDF",
    amount: "$5,000–$50,000 (varies by programme)",
    category: "Pan-African",
    eligibility:
      "Women-led organisations and initiatives across Africa working on women's rights, economic empowerment, or community development. Must be locally registered in an African country.",
    deadline: "Multiple programmes — rolling cycles",
    url: "https://awdf.org/",
    notes: "AWDF has funded over 2,000 women's organisations across 42 African countries since 2001.",
  },
  {
    name: "AWIEF Awards & Accelerator",
    provider: "Africa Women Innovation & Entrepreneurship Forum",
    amount: "Cash prizes + investor access (varies)",
    category: "Pan-African",
    eligibility:
      "Women entrepreneurs and innovators operating in Africa across six categories: technology, agriculture, energy, manufacturing, services, and social enterprise.",
    deadline: "Annual — nominations open mid-year",
    url: "https://www.awieforum.com/",
    notes: "Winners gain access to the AWIEF investor network and accelerator programme. Finalists presented at the annual AWIEF conference.",
  },
  {
    name: "SheTrades Initiative",
    provider: "International Trade Centre (ITC)",
    amount: "Free market access + grants (varies by programme)",
    category: "Pan-African",
    eligibility:
      "Women-owned businesses in Africa seeking to export and access international markets. Free to join — create a verified SheTrades profile to be matched with buyers and opportunities.",
    deadline: "Rolling — free to join anytime",
    url: "https://www.shetrades.com/",
    notes: "Backed by the ITC (a joint UN/WTO agency). Connects over 5 million women entrepreneurs to global markets by 2030.",
  },
  {
    name: "Mastercard Foundation Programmes",
    provider: "Mastercard Foundation",
    amount: "$2,000–$50,000+ (varies by programme)",
    category: "Pan-African",
    eligibility:
      "Young African entrepreneurs (18–35) and women-led businesses. Programmes vary by country and focus — agriculture, digital skills, and youth employment.",
    deadline: "Multiple programmes — rolling",
    url: "https://mastercardfdn.org/",
    notes: "The Mastercard Foundation has committed over $2 billion to African youth programmes. Partner with local organisations like EFI, CAMFED, and EDC in each country.",
  },
  {
    name: "AECF Funding (Agribusiness & Rural)",
    provider: "Africa Enterprise Challenge Fund",
    amount: "$25,000–$1,500,000",
    category: "Pan-African",
    eligibility:
      "African agribusinesses and rural enterprises in target countries (Kenya, Uganda, Tanzania, Nigeria, Ghana, Côte d'Ivoire, and others). Must demonstrate impact on rural communities.",
    deadline: "Multiple funding windows — check for open calls",
    url: "https://www.aecfafrica.org/",
    notes: "AECF has funded over 400 businesses across 24 African countries. Women-led agribusinesses receive priority in several funding windows.",
  },
  {
    name: "Standard Chartered Women in Tech Incubator",
    provider: "Standard Chartered Bank",
    amount: "$10,000 seed funding + training",
    category: "Nigeria",
    eligibility:
      "Women-led tech startups in Nigeria (also operates in Kenya, Ghana, and other African markets). Must have a working prototype or early-stage product.",
    deadline: "Annual cohorts — applications open quarterly",
    url: "https://www.sc.com/en/women-in-tech/",
    notes: "Each cohort selects up to 10 women-led startups. Includes mentorship, networking, and pitch opportunities with investors.",
  },
  {
    name: "LSETF Loan & Grant Programme",
    provider: "Lagos State Employment Trust Fund",
    amount: "₦250,000–₦5,000,000 (low-interest loans + grants)",
    category: "Nigeria",
    eligibility:
      "Lagos State residents aged 18+ with a registered or informal business in Lagos. Must have a Lagos State Residents Registration Agency (LASRRA) number.",
    deadline: "Rolling — apply online anytime",
    url: "https://www.lsetf.ng/",
    notes: "LSETF also runs the W-TIVE (Women in Technology & Innovation for Vocational Employment) programme specifically for women entrepreneurs in Lagos.",
  },
  {
    name: "Shell LiveWIRE Nigeria",
    provider: "Shell Petroleum Development Company",
    amount: "₦2,000,000+ grant + business training",
    category: "Nigeria",
    eligibility:
      "Nigerian entrepreneurs aged 18–35 with an innovative business idea or early-stage business in the Niger Delta region and beyond.",
    deadline: "Annual — applications open via the programme portal",
    url: "https://www.shell.com.ng/sustainability/communities/livewire.html",
    notes: "Shell LiveWIRE also operates in Egypt and other African markets. Women are strongly encouraged to apply.",
  },
  {
    name: "MEST Africa Training & Seed Fund",
    provider: "Meltwater Entrepreneurial School of Technology",
    amount: "$50,000–$100,000 seed investment",
    category: "Ghana & West Africa",
    eligibility:
      "Tech entrepreneurs across Africa — apply to the 12-month MEST training programme in Accra, Ghana. Open to founders with a software or tech-driven business idea.",
    deadline: "Annual — applications open September–December",
    url: "https://mest.org/",
    notes: "MEST has invested in over 80 startups across 15 African countries. The programme is free and includes housing, meals, and a monthly stipend.",
  },
  {
    name: "Ghana Enterprises Agency (GEA) Programmes",
    provider: "Ghana Enterprises Agency",
    amount: "₵5,000–₵100,000 (grants + soft loans)",
    category: "Ghana & West Africa",
    eligibility:
      "Ghanaian micro, small, and medium enterprises (MSMEs). Women and youth-owned businesses receive priority in several GEA programmes. Must be registered with the GEA.",
    deadline: "Multiple programmes — rolling",
    url: "https://gea.gov.gh/",
    notes: "GEA administers the World Bank-funded Ghana Jobs and Skills Project and the Rural Enterprises Programme — both open to women entrepreneurs.",
  },
  {
    name: "Kenya Climate Innovation Center (KCIC)",
    provider: "KCIC (supported by World Bank & Danida)",
    amount: "$5,000–$50,000+ (grants + advisory)",
    category: "Kenya & East Africa",
    eligibility:
      "Kenyan entrepreneurs with climate-smart business ideas in renewable energy, agribusiness, water, or green technology. Must demonstrate environmental and social impact.",
    deadline: "Rolling — apply via KCIC portal",
    url: "https://www.kenyacic.org/",
    notes: "KCIC has supported over 300 green businesses in Kenya. Women-led climate enterprises receive dedicated support and funding.",
  },
  {
    name: "Women in Energy — Kenya (WEK) Grants",
    provider: "Energy Africa & partners",
    amount: "$2,000–$25,000",
    category: "Kenya & East Africa",
    eligibility:
      "Women entrepreneurs in Kenya and East Africa working in clean energy, solar, and energy access. Must have a registered business or community project.",
    deadline: "Annual — check for open calls",
    url: "https://www.energy4impact.org/",
    notes: "Energy4Impact and partners run women-focused energy entrepreneurship programmes across Kenya, Uganda, and Tanzania.",
  },
  {
    name: "SAB Foundation Social Innovation Awards",
    provider: "South African Breweries (SAB) Foundation",
    amount: "R200,000–R1,300,000",
    category: "South Africa",
    eligibility:
      "South African entrepreneurs with innovative products or services that benefit women, youth, children, or people with disabilities. Must be a registered South African business.",
    deadline: "Annual — applications open May–June",
    url: "https://www.sabfoundation.co.za/",
    notes: "Over R80 million awarded since 2011. Women-led businesses and rural innovations are prioritised. Includes the Foundation Thembalihle DeafBlind award.",
  },
];

export const AFRICA_GRANTS_FAQ = [
  {
    q: "Can I apply for these grants if I live outside Africa?",
    a: "Most of these grants require your business to be registered and operating in an African country. The Tony Elumelu Foundation, Africa Business Heroes, and Cartier Women's Initiative are open to founders across all 54 African countries. If you're a member of the African diaspora, you may still qualify if your business is based in Africa — check each programme's eligibility carefully.",
  },
  {
    q: "Do I need to pay back any of this funding?",
    a: "No. Grants are free money — you don't repay them and you don't give up equity. Programmes like LSETF and GEA offer low-interest loans (not grants), which are clearly labelled. Seed investment programmes like MEST Africa provide funding in exchange for equity, which is different from a grant. Always read the terms before applying.",
  },
  {
    q: "What documents do I need to apply for an African business grant?",
    a: "Most programmes require: (1) a business summary or pitch deck, (2) proof of registration (CAC in Nigeria, RWP in Ghana, CR12 in Kenya, CIPC in South Africa), (3) a valid ID, and (4) bank details. The Tony Elumelu Foundation and SheTrades accept applications from unregistered businesses at the idea stage. Write your one-page business summary first — you'll reuse it for every application.",
  },
  {
    q: "Which grant is easiest to apply for as a woman in Africa?",
    a: "SheTrades is free to join and requires only a profile — no application or deadline. The Tony Elumelu Foundation programme is the most accessible funded programme: the application is online, open to all 54 countries, and over 1,000 entrepreneurs are selected each year. Start with those two, then apply to the AWIEF Awards and Cartier Women's Initiative once your business is established.",
  },
  {
    q: "Are there grants specifically for women in tech in Africa?",
    a: "Yes. Standard Chartered Women in Tech operates in Nigeria, Kenya, Ghana, and other markets. MEST Africa in Accra funds women-led tech startups. The GSMA Innovation Fund supports women in digital inclusion across Africa. If your business uses technology — even at a basic level like mobile payments or e-commerce — you may qualify for multiple tech-focused programmes.",
  },
  {
    q: "Can Victoria AI help me write my grant application in Africa?",
    a: "Yes. When you join Her Empire Era free, you get access to Victoria AI and the Empire Prompt Vault — including grant-writing prompts tailored for African entrepreneurs. Victoria can help you draft your application in English, structure your business summary for programmes like TEF and Cartier, and refine your answers before you submit.",
  },
];
