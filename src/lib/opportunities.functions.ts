import { createServerFn } from "@tanstack/react-start";

export interface SideHustle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  level: string;
  earning_potential: string;
  startup_cost: string;
  tools: string[];
  first_steps: string[];
  is_free_preview: boolean;
}

/**
 * Public read of the Empire Opportunity Center library.
 * Runs with the publishable key so the page can be server-rendered for
 * visitors arriving from social media before they have an account.
 */
export const listSideHustles = createServerFn({ method: "GET" }).handler(async () => {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env['SUPABASE_URL']!,
    process.env['SUPABASE_PUBLISHABLE_KEY']!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );

  const select =
    "id, slug, title, summary, category, level, earning_potential, startup_cost, tools, first_steps, is_free_preview";
  const { data, error } = await supabase
    .from("side_hustles")
    .select(select as string)
    .order("is_free_preview", { ascending: false })
    .order("title", { ascending: true })
    .returns<SideHustle[]>();

  if (error) throw new Error(error.message);
  return data ?? [];
});
