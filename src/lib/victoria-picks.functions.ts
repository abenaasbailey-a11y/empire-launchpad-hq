import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface SavedPickNote {
  id: string;
  note: string;
  weekKey: string;
  savedAt: string;
  /** Member's tracking state for this idea: not_started | saved | in_progress | completed */
  status: string;
  isFavorite: boolean;
  hustle: {
    id: string;
    slug: string;
    title: string;
    category: string;
    level: string;
    summary: string;
    earning_potential: string;
    startup_cost: string;
    tools: string[];
    first_steps: string[];
  } | null;
}

export interface WeeklyPicksResult {
  week: string;
  startsAt: string;
  endsAt: string;
  refreshAt: string;
  picks: Array<{
    id: string;
    slug: string;
    title: string;
    summary: string;
    category: string;
    level: string;
    earning_potential: string;
    startup_cost: string;
    note: string;
  }>;
}

/**
 * Victoria's weekly personalised picks for the signed-in member, built from
 * their favourites and progress. Stable for a whole ISO week, then rotates.
 * Members can also manually advance the week offset to see next week's picks early.
 */
export const getWeeklyPicks = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<WeeklyPicksResult> => {
    const { shortlist, addVictoriaNotes, weekKey, weekWindow, persistNotes } = await import("./victoria-picks.server");
    const { supabase, userId } = context;

    const [libraryRes, signalsRes, profileRes] = await Promise.all([
      supabase
        .from("side_hustles")
        .select("id, slug, title, summary, category, level, earning_potential, startup_cost"),
      supabase.from("member_side_hustles").select("side_hustle_id, is_favorite, status"),
      supabase
        .from("profiles")
        .select("full_name, victoria_picks_week_offset, victoria_picks_last_week_key")
        .eq("id", userId)
        .maybeSingle(),
    ]);

    if (libraryRes.error) throw new Error(libraryRes.error.message);
    if (signalsRes.error) throw new Error(signalsRes.error.message);

    const library = libraryRes.data ?? [];
    const signals = signalsRes.data ?? [];
    const currentWeek = weekKey();
    const profile = profileRes.data;

    // Reset the manual offset when a new natural ISO week begins.
    let weekOffset = profile?.victoria_picks_week_offset ?? 0;
    if ((profile?.victoria_picks_last_week_key ?? null) !== currentWeek) {
      weekOffset = 0;
      if (profile) {
        await supabase
          .from("profiles")
          .update({ victoria_picks_week_offset: 0, victoria_picks_last_week_key: currentWeek })
          .eq("id", userId);
      }
    }

    const window = weekWindow(new Date(), weekOffset);
    const week = window.week;
    const picks = shortlist(library, signals, week);
    const firstName = profile?.full_name?.split(" ")[0] ?? null;

    const noted = await addVictoriaNotes(picks, signals, library, firstName);
    await persistNotes(supabase, userId, week, noted);

    return {
      week,
      startsAt: window.startsAt,
      endsAt: window.endsAt,
      refreshAt: window.refreshAt,
      picks: noted,
    };
  });

/**
 * Manually advance Victoria's picks by one week and return the fresh set.
 * Resets the offset first if the stored week key belongs to a previous ISO week.
 */
export const refreshWeeklyPicks = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<WeeklyPicksResult> => {
    const { shortlist, addVictoriaNotes, weekKey, weekWindow, persistNotes } = await import("./victoria-picks.server");
    const { supabase, userId } = context;

    const [libraryRes, signalsRes, profileRes] = await Promise.all([
      supabase
        .from("side_hustles")
        .select("id, slug, title, summary, category, level, earning_potential, startup_cost"),
      supabase.from("member_side_hustles").select("side_hustle_id, is_favorite, status"),
      supabase
        .from("profiles")
        .select("full_name, victoria_picks_week_offset, victoria_picks_last_week_key")
        .eq("id", userId)
        .maybeSingle(),
    ]);

    if (libraryRes.error) throw new Error(libraryRes.error.message);
    if (signalsRes.error) throw new Error(signalsRes.error.message);

    const library = libraryRes.data ?? [];
    const signals = signalsRes.data ?? [];
    const currentWeek = weekKey();
    const profile = profileRes.data;

    let weekOffset = profile?.victoria_picks_week_offset ?? 0;
    if ((profile?.victoria_picks_last_week_key ?? null) !== currentWeek) {
      weekOffset = 0;
    }
    weekOffset += 1;

    const updateRes = await supabase
      .from("profiles")
      .update({ victoria_picks_week_offset: weekOffset, victoria_picks_last_week_key: currentWeek })
      .eq("id", userId)
      .select("victoria_picks_week_offset, victoria_picks_last_week_key")
      .single();
    if (updateRes.error) throw new Error(updateRes.error.message);

    const window = weekWindow(new Date(), weekOffset);
    const week = window.week;
    const picks = shortlist(library, signals, week);
    const firstName = profile?.full_name?.split(" ")[0] ?? null;

    const noted = await addVictoriaNotes(picks, signals, library, firstName);
    await persistNotes(supabase, userId, week, noted);

    return {
      week,
      startsAt: window.startsAt,
      endsAt: window.endsAt,
      refreshAt: window.refreshAt,
      picks: noted,
    };
  });

/**
 * Victoria's saved "why this fits you" notes, newest first, for the dashboard.
 */
export const getSavedPickNotes = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SavedPickNote[]> => {
    const { supabase } = context;
    const [notesRes, signalsRes] = await Promise.all([
      supabase
        .from("victoria_pick_notes")
        .select("id, note, week_key, created_at, side_hustles (id, slug, title, category, level)")
        .order("created_at", { ascending: false })
        .limit(120),
      supabase.from("member_side_hustles").select("side_hustle_id, is_favorite, status"),
    ]);
    if (notesRes.error) throw new Error(notesRes.error.message);
    if (signalsRes.error) throw new Error(signalsRes.error.message);

    const signalById = new Map((signalsRes.data ?? []).map((s) => [s.side_hustle_id, s]));

    return (notesRes.data ?? []).map((row) => ({
      id: row.id,
      note: row.note,
      weekKey: row.week_key,
      savedAt: row.created_at,
      status: signalById.get(row.side_hustles?.id ?? "")?.status ?? "not_started",
      isFavorite: signalById.get(row.side_hustles?.id ?? "")?.is_favorite ?? false,
      hustle: row.side_hustles ?? null,
    }));
  });
