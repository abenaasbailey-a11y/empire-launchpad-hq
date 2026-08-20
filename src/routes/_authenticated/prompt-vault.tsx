import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/landing/Section";
import { PromptCard } from "@/components/prompt-vault/PromptCard";
import { useIsAdmin } from "@/hooks/use-admin";
import { PROMPT_CATEGORIES, GRANTS_CATEGORY, GRANTS_DISCLAIMER, type VaultPrompt } from "@/lib/prompt-vault";

export const Route = createFileRoute("/_authenticated/prompt-vault")({
  component: PromptVaultPage,
  head: () => ({
    meta: [
      { title: "The Empire Prompt Vault — Her Empire Era" },
      {
        name: "description",
        content:
          "A private library of professional AI prompts for marketing, funding, planning, emails, career and productivity.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type View = "all" | "favorites" | "recent";

function PromptVaultPage() {
  const queryClient = useQueryClient();
  const { isAdmin } = useIsAdmin();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [view, setView] = useState<View>("all");

  const { data: prompts = [], isLoading } = useQuery({
    queryKey: ["vault-prompts"],
    queryFn: async (): Promise<VaultPrompt[]> => {
      const { data, error } = await supabase
        .from("prompts")
        .select(
          "id, slug, title, category, description, body, is_featured, is_published, sort_order, save_count, copy_count",
        )
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ["vault-favorites"],
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase.from("prompt_favorites").select("prompt_id");
      if (error) throw error;
      return (data ?? []).map((r) => r.prompt_id);
    },
  });

  const { data: recentIds = [] } = useQuery({
    queryKey: ["vault-recent"],
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from("prompt_usage")
        .select("prompt_id, created_at")
        .order("created_at", { ascending: false })
        .limit(60);
      if (error) throw error;
      const seen: string[] = [];
      for (const row of data ?? []) if (!seen.includes(row.prompt_id)) seen.push(row.prompt_id);
      return seen.slice(0, 12);
    },
  });

  const toggleFavorite = useMutation({
    mutationFn: async (prompt: VaultPrompt) => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) return;
      if (favorites.includes(prompt.id)) {
        await supabase
          .from("prompt_favorites")
          .delete()
          .eq("prompt_id", prompt.id)
          .eq("user_id", userId);
      } else {
        await supabase
          .from("prompt_favorites")
          .insert({ prompt_id: prompt.id, user_id: userId });
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["vault-favorites"] });
      void queryClient.invalidateQueries({ queryKey: ["vault-prompts"] });
    },
  });

  const recordUse = useMutation({
    mutationFn: async (prompt: VaultPrompt) => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) return;
      await supabase.from("prompt_usage").insert({ prompt_id: prompt.id, user_id: userId });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["vault-recent"] });
    },
  });

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = prompts;
    if (view === "favorites") list = list.filter((p) => favorites.includes(p.id));
    if (view === "recent") {
      list = recentIds
        .map((id) => list.find((p) => p.id === id))
        .filter((p): p is VaultPrompt => Boolean(p));
    }
    if (category) list = list.filter((p) => p.category === category);
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    return list;
  }, [prompts, favorites, recentIds, view, category, search]);

  const countFor = (slug: string) => prompts.filter((p) => p.category === slug).length;

  return (
    <main>
      <header className="border-border/60 border-b">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-10">
          <Link
            to="/dashboard"
            className="font-display text-sm tracking-[0.18em] uppercase sm:text-lg sm:tracking-[0.22em]"
          >
            Her Empire <span className="text-gold">Era</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            {isAdmin && (
              <Button variant="lux" size="sm" asChild>
                <Link to="/prompt-vault-admin">Manage prompts</Link>
              </Button>
            )}
            <Button variant="lux" size="sm" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <Section>
        <p className="eyebrow eyebrow-blush">The Empire Prompt Vault</p>
        <h1 className="font-display heading-glow mt-5 max-w-3xl text-4xl leading-[1.08] font-light md:text-6xl">
          Professional prompts, ready when you are.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-[0.95rem] leading-relaxed">
          Fill in a few details, copy the prompt, or send it straight to Empire Builder AI. Every
          prompt is written to give you work you can use the same day.
        </p>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prompts by name, goal or category"
            className="md:max-w-md"
            aria-label="Search prompts"
          />
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["all", "All prompts"],
                ["favorites", "My favourites"],
                ["recent", "Recently used"],
              ] as const
            ).map(([key, label]) => (
              <Button
                key={key}
                variant={view === key ? "gold" : "lux"}
                size="sm"
                onClick={() => setView(key)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Button
            variant={category === null ? "gold" : "lux"}
            size="sm"
            onClick={() => setCategory(null)}
          >
            Every category
          </Button>
          {PROMPT_CATEGORIES.map((c) => (
            <Button
              key={c.slug}
              variant={category === c.slug ? "gold" : "lux"}
              size="sm"
              onClick={() => setCategory(c.slug)}
              title={c.tagline}
            >
              {c.name} ({countFor(c.slug)})
            </Button>
          ))}
        </div>

        {category === GRANTS_CATEGORY && (
          <div className="bg-blush/10 border-blush/30 mt-8 rounded-xl border px-5 py-4">
            <p className="text-blush text-[0.8rem] font-medium leading-relaxed">
              ⚠ {GRANTS_DISCLAIMER}
            </p>
          </div>
        )}

        {isLoading ? (
          <p className="text-muted-foreground mt-12 text-sm">Opening the vault…</p>
        ) : visible.length === 0 ? (
          <p className="text-muted-foreground mt-12 text-sm">
            {view === "favorites"
              ? "No favourites yet. Tap the star on any prompt to save it here."
              : view === "recent"
                ? "Nothing used yet. Copy or run a prompt and it will appear here."
                : "No prompts match that search."}
          </p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {visible.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                isFavorite={favorites.includes(prompt.id)}
                onToggleFavorite={(p) => toggleFavorite.mutate(p)}
                onUse={(p) => recordUse.mutate(p)}
              />
            ))}
          </div>
        )}

        <p className="text-muted-foreground mt-12 text-xs leading-relaxed">
          Grant and funding prompts provide educational and writing assistance only. They do not
          guarantee funding or grant approval.
        </p>
      </Section>
    </main>
  );
}