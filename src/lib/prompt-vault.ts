/** Shared, browser-safe helpers for the Empire Prompt Vault. */

export interface VaultPrompt {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  body: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  save_count: number;
  copy_count: number;
}

export interface PromptCategory {
  slug: string;
  name: string;
  tagline: string;
}

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    slug: "marketing",
    name: "Marketing",
    tagline: "Strategy, audience, positioning and launches.",
  },
  {
    slug: "social-media",
    name: "Social Media",
    tagline: "Calendars, captions, reels and calls to action.",
  },
  {
    slug: "grants-funding",
    name: "Grants & Funding",
    tagline: "Applications, budgets, impact and readiness.",
  },
  {
    slug: "business-planning",
    name: "Business Planning",
    tagline: "Plans, pricing, goals and competitor research.",
  },
  {
    slug: "professional-emails",
    name: "Professional Emails",
    tagline: "Outreach, follow-ups, invoices and thank-yous.",
  },
  {
    slug: "resumes-career",
    name: "Résumés & Career",
    tagline: "Résumés, bios, cover letters and interviews.",
  },
  {
    slug: "productivity",
    name: "Productivity & Organization",
    tagline: "Schedules, routines, systems and action plans.",
  },
];

export function categoryName(slug: string): string {
  return PROMPT_CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

/** Extracts the unique [FIELD] placeholders from a prompt body, in order. */
export function extractFields(body: string): string[] {
  const found = body.match(/\[[A-Z0-9 ][A-Z0-9 _/-]*\]/g) ?? [];
  const seen: string[] = [];
  for (const raw of found) {
    const token = raw.slice(1, -1).trim();
    if (token && !seen.includes(token)) seen.push(token);
  }
  return seen;
}

/** Replaces every [FIELD] placeholder with the member's value (blanks stay as-is). */
export function fillPrompt(body: string, values: Record<string, string>): string {
  let filled = body;
  for (const [field, value] of Object.entries(values)) {
    const trimmed = value.trim();
    if (!trimmed) continue;
    filled = filled.split(`[${field}]`).join(trimmed);
  }
  return filled;
}

export function fieldLabel(field: string): string {
  return field
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}