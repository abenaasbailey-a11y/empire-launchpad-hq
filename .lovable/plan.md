# Empire Prompt Vault — Build Plan

## Goal
Build the full Empire Prompt Vault feature: a searchable library of 56 professional AI prompts across 7 categories, with copy/customize, favorites, recently-used history, admin management, and an **educational-only disclaimer on the Grants & Funding category and every grant-related prompt detail** so it's clear prompts don't guarantee funding.

## Current state
- **Database layer is DONE.** The `prompts`, `prompt_favorites`, and `prompt_usage` tables already exist with RLS policies, triggers (`prompt_favorites_count`, `prompt_usage_count`), and SECURITY DEFINER count-sync functions (`sync_prompt_save_count`, `sync_prompt_copy_count`). No DB migration needed except the seed data.
- **Application layer is missing.** No routes, components, server functions, or prompt seed data exist yet.

## Categories (7)
1. Marketing & Brand Strategy
2. Social Media & Content
3. Sales & Pitching
4. Operations & Systems
5. Finance & Pricing
6. Grants & Funding  ← gets the educational disclaimer
7. Personal Development & Mindset

## Files to create

### 1. Seed migration — `supabase/migrations/<ts>_seed_vault_prompts.sql`
- `INSERT INTO public.prompts (slug, title, category, description, body, is_featured, is_published, sort_order)` for all 56 prompts (8 per category).
- Each `body` contains the full prompt text with `{{fill_in_the_blank}}` placeholders where applicable.
- Grants & Funding prompts get `description` text that includes the educational framing.
- Uses `ON CONFLICT (slug) DO NOTHING` so it's safe to re-run.

### 2. Types + server functions — `src/lib/prompt-vault.functions.ts`
Thin `createServerFn` wrappers (module scope = imports + exported fns only):
- `listPrompts` (GET, public via publishable key) — returns published prompts for SSR.
- `listFavoritePromptIds` (GET, `requireSupabaseAuth`) — member's favorited prompt IDs.
- `listRecentPromptIds` (GET, `requireSupabaseAuth`) — recently-used prompt IDs from `prompt_usage`.
- `togglePromptFavorite` (POST, `requireSupabaseAuth`) — insert/delete in `prompt_favorites`.
- `recordPromptCopy` (POST, `requireSupabaseAuth`) — insert into `prompt_usage` (triggers count sync).
- Admin CRUD: `adminCreatePrompt`, `adminUpdatePrompt`, `adminDeletePrompt`, `adminTogglePublish` (POST, `requireSupabaseAuth` + manual `has_role` check via `context.supabase`).

### 3. AI runner helper — `src/lib/prompt-runner.server.ts`
- `runPromptWithVictoria(promptBody, filledFields, apiKey)` — calls Lovable AI Gateway (Gemini) via `createLovableAiGatewayProvider`, returns generated text. Used by "Use with Empire Builder AI".
- `runPromptFunction` (POST, `requireSupabaseAuth`) — server fn wrapper that calls the helper.

### 4. Prompt Card component — `src/components/prompt-vault/PromptCard.tsx`
- Displays title, category, description, save/copy counts.
- Favorite (heart) toggle button.
- "Copy" button — copies filled prompt to clipboard, records usage.
- "Customize" expand — reveals fill-in-the-blank inputs for `{{placeholders}}`, live-updates the prompt preview.
- "Use with Empire Builder AI" button — opens a modal/expandable area that sends the filled prompt to Victoria via the runner and shows the response.
- **Grants & Funding disclaimer banner** rendered on the card when `category === "Grants & Funding"`.

### 5. Vault route — `src/routes/_authenticated/prompt-vault.tsx`
- Member-gated (under `_authenticated/`).
- Hero section with luxury styling (eyebrow, heading-glow, gold rule).
- Search input + category filter chips (horizontal scroll on mobile).
- Stats row (favorites, recently used counts).
- Grid of `PromptCard` components.
- "Favorites" and "Recently Used" toggle views.
- **Grants & Funding category-level disclaimer** displayed when that category filter is active.
- `head()` with unique title/description/og tags, canonical `https://yourempireconcierge.com/prompt-vault`.
- Footer matching existing pattern.

### 6. Admin route — `src/routes/_authenticated/prompt-vault-admin.tsx`
- Admin-gated (`useIsAdmin`).
- Table/list of all prompts with edit, hide/show, delete actions.
- "Add prompt" form (title, category, description, body, featured, published).
- Inline edit form.
- Reuses the same luxury styling.

### 7. Dashboard link — edit `src/routes/_authenticated/dashboard.tsx`
- Add a "Prompt Vault" button in the hero CTA row next to "Open the Opportunity Center".

## Educational disclaimer (Grants & Funding)
**Category-level banner** (shown on vault page when Grants & Funding filter active):
> Educational use only. These prompts are tools to help you research and prepare grant and funding applications — they do not guarantee funding, awards, or approval. Always verify requirements with the specific funder and review all submissions with a qualified professional before applying.

**Card-level badge** (shown on every Grants & Funding prompt card, in the detail/expand view):
> ⚠ Educational only — prompts do not guarantee funding.

## Styling
- Reuse existing luxury tokens: `font-display`, `text-gold`, `bg-gold`, `eyebrow`, `eyebrow-blush`, `bg-blush-wash`, `text-blush`, `heading-glow`, `GoldRule`, `BlushRule`, `Section`, `SectionHeading`.
- Cards: `border-border bg-card/50 rounded-2xl border backdrop-blur-sm`.
- Buttons: `variant="gold"`, `variant="lux"`.
- No new CSS needed — all tokens exist.

## Build order
1. Seed migration → run it.
2. `prompt-vault.functions.ts` + `prompt-runner.server.ts`.
3. `PromptCard.tsx`.
4. `prompt-vault.tsx` route.
5. `prompt-vault-admin.tsx` route.
6. Dashboard link.
7. Typecheck (`tsgo`) + verify in preview.

## Verification
- `tsgo` typecheck passes.
- Preview shows `/prompt-vault` with 56 prompts, search, filters, favorites, copy.
- Grants & Funding category shows the disclaimer banner + card badges.
- Admin page shows CRUD actions.
- Dashboard has the Prompt Vault link.
