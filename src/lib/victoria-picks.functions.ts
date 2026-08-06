import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface WeeklyPicksResult {
  week: string;
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
 */
export const getWeeklyPicks = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<WeeklyPicksResult> => {
    const { shortlist, addVictoriaNotes, weekKey } = await import("./victoria-picks.server");
    const { supabase, userId } = context;

    const [libraryRes, signalsRes, profileRes] = await Promise.all([
      supabase
        .from("side_hustles")
        .select("id, slug, title, summary, category, level, earning_potential, startup_cost"),
      supabase.from("member_side_hustles").select("side_hustle_id, is_favorite, status"),
      supabase.from("profiles").select("full_name").eq("id", userId).maybeSingle(),
    ]);

    if (libraryRes.error) throw new Error(libraryRes.error.message);
    if (signalsRes.error) throw new Error(signalsRes.error.message);

    const library = libraryRes.data ?? [];
    const signals = signalsRes.data ?? [];
    const week = weekKey();
    const picks = shortlist(library, signals, week);
    const firstName = profileRes.data?.full_name?.split(" ")[0] ?? null;

    return { week, picks: await addVictoriaNotes(picks, signals, library, firstName) };
  });