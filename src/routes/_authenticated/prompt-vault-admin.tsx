import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/components/landing/Section";
import { useIsAdmin } from "@/hooks/use-admin";
import {
  MIN_TIER_OPTIONS,
  PROMPT_CATEGORIES,
  categoryName,
  minTierLabel,
  type VaultPrompt,
} from "@/lib/prompt-vault";

export const Route = createFileRoute("/_authenticated/prompt-vault-admin")({
  component: PromptVaultAdminPage,
  head: () => ({
    meta: [
      { title: "Manage the Prompt Vault — Her Empire Era" },
      { name: "description", content: "Administrator tools for the Empire Prompt Vault." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const emptyDraft = {
  title: "",
  category: PROMPT_CATEGORIES[0]!.slug,
  description: "",
  body: "",
  min_tier: "member",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function PromptVaultAdminPage() {
  const { isAdmin, isLoading: adminLoading } = useIsAdmin();
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: prompts = [] } = useQuery({
    queryKey: ["vault-prompts-admin"],
    enabled: isAdmin,
    queryFn: async (): Promise<VaultPrompt[]> => {
      const { data, error } = await supabase
        .from("prompts")
        .select(
          "id, slug, title, category, description, body, is_featured, is_published, sort_order, save_count, copy_count, min_tier",
        )
        .order("category", { ascending: true })
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  function refresh() {
    void queryClient.invalidateQueries({ queryKey: ["vault-prompts-admin"] });
    void queryClient.invalidateQueries({ queryKey: ["vault-prompts"] });
  }

  const save = useMutation({
    mutationFn: async () => {
      const payload = {
        title: draft.title.trim(),
        category: draft.category,
        description: draft.description.trim(),
        body: draft.body.trim(),
        min_tier: draft.min_tier,
      };
      if (!payload.title || !payload.description || !payload.body) {
        throw new Error("Title, description and prompt text are all required.");
      }
      if (editingId) {
        const { error } = await supabase.from("prompts").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("prompts").insert({
          ...payload,
          slug: `${slugify(payload.title)}-${payload.category}`,
          sort_order: prompts.length + 1,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editingId ? "Prompt updated." : "Prompt added.");
      setDraft(emptyDraft);
      setEditingId(null);
      refresh();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const togglePublished = useMutation({
    mutationFn: async (prompt: VaultPrompt) => {
      const { error } = await supabase
        .from("prompts")
        .update({ is_published: !prompt.is_published })
        .eq("id", prompt.id);
      if (error) throw error;
    },
    onSuccess: refresh,
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: async (prompt: VaultPrompt) => {
      const { error } = await supabase.from("prompts").delete().eq("id", prompt.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Prompt deleted.");
      refresh();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  if (adminLoading) {
    return (
      <Section>
        <p className="text-muted-foreground text-sm">Checking your access…</p>
      </Section>
    );
  }

  if (!isAdmin) {
    return (
      <Section>
        <h1 className="font-display text-3xl font-light">Administrators only</h1>
        <p className="text-muted-foreground mt-4 text-sm">
          This page manages the Prompt Vault library.
        </p>
        <Button variant="lux" size="sm" className="mt-6" asChild>
          <Link to="/prompt-vault">Back to the vault</Link>
        </Button>
      </Section>
    );
  }

  const totalSaves = prompts.reduce((sum, p) => sum + p.save_count, 0);
  const totalCopies = prompts.reduce((sum, p) => sum + p.copy_count, 0);

  return (
    <main>
      <Section>
        <p className="eyebrow eyebrow-blush">Admin only</p>
        <h1 className="font-display mt-5 text-4xl leading-[1.08] font-light md:text-5xl">
          Manage the Prompt Vault
        </h1>
        <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
          {prompts.length} prompts · {totalSaves} saves · {totalCopies} uses
        </p>
        <Button variant="lux" size="sm" className="mt-6" asChild>
          <Link to="/prompt-vault">Open the member view</Link>
        </Button>

        <div className="border-border bg-card/50 mt-12 rounded-2xl border p-6 md:p-8">
          <h2 className="font-display text-2xl font-light">
            {editingId ? "Edit prompt" : "Add a prompt"}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="p-title" className="text-xs">
                Title
              </Label>
              <Input
                id="p-title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="p-category" className="text-xs">
                Category
              </Label>
              <select
                id="p-category"
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                className="border-input bg-background h-9 rounded-md border px-3 text-sm"
              >
                {PROMPT_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 grid gap-1.5 md:max-w-xs">
            <Label htmlFor="p-tier" className="text-xs">
              Who can open it
            </Label>
            <select
              id="p-tier"
              value={draft.min_tier}
              onChange={(e) => setDraft({ ...draft, min_tier: e.target.value })}
              className="border-input bg-background h-9 rounded-md border px-3 text-sm"
            >
              {MIN_TIER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 grid gap-1.5">
            <Label htmlFor="p-desc" className="text-xs">
              Short description
            </Label>
            <Input
              id="p-desc"
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            />
          </div>
          <div className="mt-4 grid gap-1.5">
            <Label htmlFor="p-body" className="text-xs">
              Prompt text — use [BRACKETS] for fields members fill in
            </Label>
            <Textarea
              id="p-body"
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              className="h-56 font-mono text-xs"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="gold" size="sm" onClick={() => save.mutate()} disabled={save.isPending}>
              {editingId ? "Save changes" : "Add prompt"}
            </Button>
            {editingId && (
              <Button
                variant="lux"
                size="sm"
                onClick={() => {
                  setEditingId(null);
                  setDraft(emptyDraft);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>

        <div className="mt-12 grid gap-4">
          {prompts.map((p) => (
            <div
              key={p.id}
              className="border-border bg-card/50 flex flex-wrap items-center justify-between gap-4 rounded-xl border p-5"
            >
              <div className="min-w-0">
                <p className="text-muted-foreground text-[0.6rem] tracking-[0.22em] uppercase">
                  {categoryName(p.category)} · {p.save_count} saves · {p.copy_count} uses
                  {p.is_published ? "" : " · hidden"} · {minTierLabel(p.min_tier)}
                </p>
                <h3 className="font-display mt-1 text-lg font-light">{p.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="lux"
                  size="sm"
                  onClick={() => {
                    setEditingId(p.id);
                    setDraft({
                      title: p.title,
                      category: p.category,
                      description: p.description,
                      body: p.body,
                      min_tier: p.min_tier ?? "member",
                    });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Edit
                </Button>
                <Button variant="lux" size="sm" onClick={() => togglePublished.mutate(p)}>
                  {p.is_published ? "Hide" : "Publish"}
                </Button>
                <Button variant="lux" size="sm" onClick={() => remove.mutate(p)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}