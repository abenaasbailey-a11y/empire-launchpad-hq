import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  updatePickNote,
  updatePickSteps,
  type SavedPickNote,
} from "@/lib/victoria-picks.functions";

const STATUS_LABELS: Record<string, string> = {
  not_started: "Not started",
  saved: "Saved",
  in_progress: "In progress",
  completed: "Completed",
};

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-border/60 rounded-xl border p-4">
      <p className="text-muted-foreground text-[0.6rem] tracking-[0.22em] uppercase">{label}</p>
      <p className="mt-1.5 text-sm">{value}</p>
    </div>
  );
}

/**
 * Full detail view for a saved Victoria idea, with an inline editor for the
 * member's "why this fits you" note.
 */
export function IdeaDetailDrawer({
  entry,
  onOpenChange,
}: {
  entry: SavedPickNote | null;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const saveNote = useServerFn(updatePickNote);
  const saveSteps = useServerFn(updatePickSteps);
  const [draft, setDraft] = useState("");
  const [checked, setChecked] = useState<number[]>([]);

  useEffect(() => {
    setDraft(entry?.note ?? "");
  }, [entry?.id, entry?.note]);

  useEffect(() => {
    setChecked(entry?.completedSteps ?? []);
  }, [entry?.id, entry?.completedSteps]);

  const mutation = useMutation({
    mutationFn: (note: string) => saveNote({ data: { id: entry!.id, note } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["victoria-saved-notes"] });
      toast.success("Note updated");
    },
    onError: (error: Error) => toast.error(error.message || "Could not save that note."),
  });

  const stepsMutation = useMutation({
    mutationFn: (completedSteps: number[]) =>
      saveSteps({ data: { id: entry!.id, completedSteps } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["victoria-saved-notes"] });
    },
    onError: (error: Error) => {
      setChecked(entry?.completedSteps ?? []);
      toast.error(error.message || "Could not save your progress.");
    },
  });

  function toggleStep(index: number) {
    const next = checked.includes(index)
      ? checked.filter((i) => i !== index)
      : [...checked, index].sort((a, b) => a - b);
    setChecked(next);
    stepsMutation.mutate(next);
  }

  const hustle = entry?.hustle ?? null;
  const dirty = entry ? draft.trim() !== entry.note.trim() : false;
  const steps = hustle?.first_steps ?? [];
  const doneCount = checked.filter((i) => i < steps.length).length;

  return (
    <Sheet open={entry !== null} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto sm:max-w-lg"
        aria-describedby={undefined}
      >
        {entry && (
          <>
            <SheetHeader className="text-left">
              <p className="text-muted-foreground text-[0.62rem] tracking-[0.22em] uppercase">
                {entry.weekKey}
                {hustle?.category ? ` · ${hustle.category}` : ""}
                {hustle?.level ? ` · ${hustle.level}` : ""}
                {` · ${STATUS_LABELS[entry.status] ?? entry.status}`}
              </p>
              <SheetTitle className="font-display text-2xl font-light">
                {hustle?.title ?? "Saved idea"}
              </SheetTitle>
              {hustle?.summary && (
                <SheetDescription className="text-sm leading-relaxed">
                  {hustle.summary}
                </SheetDescription>
              )}
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {hustle && (
                <div className="grid grid-cols-2 gap-3">
                  <Meta label="Earning potential" value={hustle.earning_potential} />
                  <Meta label="Startup cost" value={hustle.startup_cost} />
                </div>
              )}

              {hustle?.tools?.length ? (
                <div>
                  <p className="text-muted-foreground text-[0.62rem] tracking-[0.22em] uppercase">
                    Tools
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {hustle.tools.map((tool) => (
                      <span
                        key={tool}
                        className="border-border text-muted-foreground rounded-full border px-3 py-1 text-xs"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {steps.length ? (
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-muted-foreground text-[0.62rem] tracking-[0.22em] uppercase">
                      First steps
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {doneCount}/{steps.length} done
                      {stepsMutation.isPending && " · saving…"}
                    </p>
                  </div>
                  <Progress
                    value={steps.length ? (doneCount / steps.length) * 100 : 0}
                    className="mt-3 h-1"
                  />
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                    {steps.map((step, index) => {
                      const done = checked.includes(index);
                      return (
                        <li key={step}>
                          <button
                            type="button"
                            onClick={() => toggleStep(index)}
                            aria-pressed={done}
                            className="border-border/60 hover:border-gold/50 flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors"
                          >
                            <span
                              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                                done ? "border-gold bg-gold/20 text-gold" : "border-border"
                              }`}
                            >
                              {done && <Check className="h-3 w-3" />}
                            </span>
                            <span
                              className={
                                done
                                  ? "text-muted-foreground/60 line-through"
                                  : "text-muted-foreground"
                              }
                            >
                              {step}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}

              <div className="border-border/60 border-t pt-6">
                <label
                  htmlFor="fit-note"
                  className="text-muted-foreground text-[0.62rem] tracking-[0.22em] uppercase"
                >
                  Why this fits you
                </label>
                <Textarea
                  id="fit-note"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  rows={5}
                  maxLength={500}
                  className="mt-2 resize-none text-sm leading-relaxed"
                  placeholder="Make Victoria's note your own…"
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-muted-foreground text-xs">{draft.trim().length}/500</p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setDraft(entry.note)}
                      disabled={!dirty || mutation.isPending}
                    >
                      Reset
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => mutation.mutate(draft.trim())}
                      disabled={!dirty || mutation.isPending}
                    >
                      {mutation.isPending && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
                      Save note
                    </Button>
                  </div>
                </div>
              </div>

              {hustle?.slug && (
                <Link
                  to="/opportunity-center"
                  className="text-gold inline-block text-xs tracking-[0.14em] uppercase underline-offset-4 hover:underline"
                >
                  View in Opportunity Center
                </Link>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
