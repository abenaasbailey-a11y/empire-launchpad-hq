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

export const VAULT_CATEGORIES = [
  "Marketing & Brand Strategy",
  "Social Media & Content",
  "Sales & Pitching",
  "Operations & Systems",
  "Finance & Pricing",
  "Grants & Funding",
  "Personal Development & Mindset",
] as const;

export const GRANTS_CATEGORY = "Grants & Funding";

export const GRANTS_DISCLAIMER =
  "Educational use only. These prompts are tools to help you research and prepare grant and funding applications — they do not guarantee funding, awards, or approval. Always verify requirements with the specific funder and review all submissions with a qualified professional before applying.";

export const GRANTS_CARD_BADGE = "Educational only — prompts do not guarantee funding.";

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

/** Convert a field name like "business_name" into "Business name" for labels. */
export function prettifyField(name: string): string {
  return name
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}
