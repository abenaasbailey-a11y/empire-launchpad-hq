/**
 * Shared client-safe types and helpers for the Empire Prompt Vault.
 * No server-only imports here — this module is safe to import anywhere.
 */

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
  copy_count: number;
  save_count: number;
}

export interface CategoryDef {
  slug: string;
  name: string;
  tagline: string;
}

/**
 * Canonical category list. The `slug` matches the value stored in the
 * `prompts.category` column in the database; `name` is the display label.
 */
export const PROMPT_CATEGORIES: CategoryDef[] = [
  { slug: "Marketing & Brand Strategy", name: "Marketing & Brand", tagline: "Positioning, identity, and launch strategy" },
  { slug: "Social Media & Content", name: "Social & Content", tagline: "Reels, captions, newsletters, and SEO" },
  { slug: "Sales & Pitching", name: "Sales & Pitching", tagline: "Pitches, scripts, and objection handling" },
  { slug: "Operations & Systems", name: "Operations", tagline: "SOPs, projects, and automation" },
  { slug: "Finance & Pricing", name: "Finance & Pricing", tagline: "Pricing, margins, and cash flow" },
  { slug: "Grants & Funding", name: "Grants & Funding", tagline: "Research and drafting tools (educational)" },
  { slug: "Personal Development & Mindset", name: "Mindset", tagline: "Routines, goals, and confidence" },
];

export const GRANTS_CATEGORY = "Grants & Funding";

export const GRANTS_DISCLAIMER =
  "Educational use only. These prompts are tools to help you research and prepare grant and funding applications — they do not guarantee funding, awards, or approval. Always verify requirements with the specific funder and review all submissions with a qualified professional before applying.";

export const GRANTS_CARD_BADGE = "Educational only — prompts do not guarantee funding.";

/** Return the display name for a category slug. Falls back to the raw value. */
export function categoryName(slug: string): string {
  const found = PROMPT_CATEGORIES.find((c) => c.slug === slug);
  return found ? found.name : slug;
}

/** Convert a raw field key like "business_name" into "Business name". */
export function fieldLabel(field: string): string {
  return field
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

/**
 * Extract {{placeholder}} fields from a prompt body.
 * Returns unique field names in order of first appearance.
 */
export function extractFields(body: string): string[] {
  const matches = body.matchAll(/\{\{\s*([a-zA-Z0-9_ -]+)\s*\}\}/g);
  const seen = new Set<string>();
  const fields: string[] = [];
  for (const m of matches) {
    const name = m[1]!.trim();
    if (!seen.has(name)) {
      seen.add(name);
      fields.push(name);
    }
  }
  return fields;
}

/**
 * Replace {{placeholder}} tokens in a prompt body with provided values.
 * Unfilled placeholders are left as-is so the user can see what's missing.
 */
export function fillPrompt(body: string, values: Record<string, string>): string {
  return body.replace(/\{\{\s*([a-zA-Z0-9_ -]+)\s*\}\}/g, (match, name: string) => {
    const key = name.trim();
    const val = values[key];
    return val && val.trim() ? val.trim() : match;
  });
}
