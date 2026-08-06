import { generateText, Output } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

export interface PickCandidate {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  level: string;
  earning_potential: string;
  startup_cost: string;
}

export interface MemberSignal {
  side_hustle_id: string;
  is_favorite: boolean;
  status: string;
}

export interface VictoriaPick extends PickCandidate {
  note: string;
}

/** ISO-week key: recommendations stay the same all week, then rotate. */
export function weekKey(date = new Date()): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - yearStart) / 86_400_000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

/**
 * Monday-to-Sunday UTC window for the given date, plus the exact instant the
 * next rotation happens (used client-side to auto-refresh after 7 days).
 */
export function weekWindow(date = new Date()): {
  week: string;
  startsAt: string;
  endsAt: string;
  refreshAt: string;
} {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  const start = new Date(d.getTime() - (day - 1) * 86_400_000);
  const end = new Date(start.getTime() + 6 * 86_400_000);
  const refresh = new Date(start.getTime() + 7 * 86_400_000);
  return {
    week: weekKey(date),
    startsAt: start.toISOString(),
    endsAt: end.toISOString(),
    refreshAt: refresh.toISOString(),
  };
}

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const LEVEL_ORDER = ["Beginner", "Intermediate", "Advanced"];

/**
 * Scores the library against what the member has already saved / started /
 * completed, then rotates the shortlist with a weekly seed so the section
 * feels fresh every week without ever repeating something they already track.
 */
export function shortlist(
  library: PickCandidate[],
  signals: MemberSignal[],
  week: string,
  count = 3,
): PickCandidate[] {
  const tracked = new Set(signals.map((s) => s.side_hustle_id));
  const favored = signals.filter((s) => s.is_favorite).map((s) => s.side_hustle_id);
  const completed = signals.filter((s) => s.status === "completed").map((s) => s.side_hustle_id);

  const byId = new Map(library.map((h) => [h.id, h]));
  const lovedCategories = new Map<string, number>();
  for (const id of favored) {
    const c = byId.get(id)?.category;
    if (c) lovedCategories.set(c, (lovedCategories.get(c) ?? 0) + 2);
  }
  for (const s of signals.filter((x) => x.status === "in_progress")) {
    const c = byId.get(s.side_hustle_id)?.category;
    if (c) lovedCategories.set(c, (lovedCategories.get(c) ?? 0) + 1);
  }

  // Progress raises the ceiling: completing ideas nudges toward harder ones.
  const reached = Math.max(
    0,
    ...signals.map((s) => LEVEL_ORDER.indexOf(byId.get(s.side_hustle_id)?.level ?? "Beginner")),
  );
  const targetLevel = Math.min(LEVEL_ORDER.length - 1, completed.length >= 2 ? reached + 1 : reached);

  return library
    .filter((h) => !tracked.has(h.id))
    .map((h) => {
      const levelGap = Math.abs(LEVEL_ORDER.indexOf(h.level) - targetLevel);
      const score =
        (lovedCategories.get(h.category) ?? 0) * 3 -
        levelGap * 2 +
        (hash(`${week}:${h.id}`) % 5) / 2; // weekly rotation among close matches
      return { hustle: h, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((entry) => entry.hustle);
}

function fallbackNote(h: PickCandidate, hasSignals: boolean): string {
  return hasSignals
    ? `This is the natural next move from what you have been saving in ${h.category} — ${h.level.toLowerCase()} level, ${h.earning_potential}.`
    : `A strong first empire move: ${h.level.toLowerCase()} level, ${h.startup_cost} to start, ${h.earning_potential}.`;
}

/** Adds Victoria's voice to each pick, degrading gracefully if AI is unavailable. */
export async function addVictoriaNotes(
  picks: PickCandidate[],
  signals: MemberSignal[],
  library: PickCandidate[],
  firstName?: string | null,
): Promise<VictoriaPick[]> {
  const hasSignals = signals.length > 0;
  const key = process.env['LOVABLE_API_KEY'];
  if (!key || picks.length === 0) {
    return picks.map((h) => ({ ...h, note: fallbackNote(h, hasSignals) }));
  }

  const byId = new Map(library.map((h) => [h.id, h]));
  const history = signals
    .map((s) => {
      const h = byId.get(s.side_hustle_id);
      if (!h) return null;
      return `- ${h.title} (${h.category}, ${h.level}) — ${s.status}${s.is_favorite ? ", favourited" : ""}`;
    })
    .filter(Boolean)
    .join("\n");

  try {
    const gateway = createLovableAiGatewayProvider(key);
    const { output } = await generateText({
      model: gateway("google/gemini-3.6-flash"),
      system:
        "You are Victoria, a warm, precise, luxury AI business concierge for women entrepreneurs. " +
        "Write in second person, British-leaning plain English, no emojis, no hype, no exclamation marks. " +
        "Each note is one sentence, max 28 words, explaining why this idea suits her right now based on her saved ideas and progress.",
      prompt:
        `Member${firstName ? ` name: ${firstName}` : ""}\n\n` +
        `What she has saved or started:\n${history || "Nothing yet — she is just beginning."}\n\n` +
        `This week's recommendations:\n` +
        picks
          .map(
            (h) =>
              `id: ${h.id}\ntitle: ${h.title}\ncategory: ${h.category}\nlevel: ${h.level}\npotential: ${h.earning_potential}\nsummary: ${h.summary}`,
          )
          .join("\n\n") +
        `\n\nReturn one note per recommendation, keyed by id.`,
      output: Output.object({
        schema: z.object({
          notes: z.array(z.object({ id: z.string(), note: z.string() })),
        }),
      }),
    });

    const noteById = new Map(output.notes.map((n) => [n.id, n.note]));
    return picks.map((h) => ({ ...h, note: noteById.get(h.id) ?? fallbackNote(h, hasSignals) }));
  } catch (error) {
    console.error("[victoria-picks] AI note generation failed", error);
    return picks.map((h) => ({ ...h, note: fallbackNote(h, hasSignals) }));
  }
}