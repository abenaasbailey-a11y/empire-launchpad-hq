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
  /** Lowest membership tier that may open this prompt. */
  min_tier?: string;
  is_published: boolean;
  sort_order: number;
  copy_count: number;
  save_count: number;
}

export const MIN_TIER_OPTIONS = [
  { value: "member", label: "All members" },
  { value: "elite", label: "Elite and VIP only" },
  { value: "vip", label: "VIP only" },
] as const;

export function minTierLabel(value: string | null | undefined): string {
  return MIN_TIER_OPTIONS.find((o) => o.value === (value ?? "member"))?.label ?? "All members";
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
  { slug: "Marketing", name: "Marketing", tagline: "Positioning, brand, launches, and campaigns" },
  { slug: "Social Media", name: "Social Media", tagline: "Reels, captions, carousels, and hooks" },
  { slug: "Grants & Funding", name: "Grants & Funding", tagline: "Research and drafting tools (educational)" },
  { slug: "Business Planning", name: "Business Planning", tagline: "Plans, models, and growth roadmaps" },
  { slug: "Emails", name: "Emails", tagline: "Outreach, proposals, follow-ups, and newsletters" },
  {
    slug: "Personal Brand",
    name: "Personal Brand",
    tagline: "Professional profiles, intros, and interview prep",
  },
  { slug: "Productivity", name: "Productivity", tagline: "Priorities, systems, and focus" },
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
