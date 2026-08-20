import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GoldRule } from "@/components/landing/Section";
import { runVaultPrompt } from "@/lib/prompt-vault.functions";
import {
  categoryName,
  extractFields,
  fieldLabel,
  fillPrompt,
  type VaultPrompt,
} from "@/lib/prompt-vault";

export function PromptCard({
  prompt,
  isFavorite,
  onToggleFavorite,
  onUse,
}: {
  prompt: VaultPrompt;
  isFavorite: boolean;
  onToggleFavorite: (prompt: VaultPrompt) => void;
  onUse: (prompt: VaultPrompt) => void;
}) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [aiText, setAiText] = useState("");
  const [running, setRunning] = useState(false);
  const runPrompt = useServerFn(runVaultPrompt);

  const fields = useMemo(() => extractFields(prompt.body), [prompt.body]);
  const filled = useMemo(() => fillPrompt(prompt.body, values), [prompt.body, values]);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(filled);
      toast.success("Prompt copied. Paste it into any AI assistant.");
      onUse(prompt);
    } catch {
      toast.error("Copy failed. Select the text and copy it manually.");
    }
  }

  async function handleRun() {
    setRunning(true);
    setAiText("");
    try {
      const result = await runPrompt({ data: { prompt: filled } });
      if (result.error) toast.error(result.error);
      else {
        setAiText(result.text);
        onUse(prompt);
      }
    } catch {
      toast.error("Empire Builder AI could not finish that request. Please try again.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <article className="border-border bg-card/50 flex flex-col rounded-2xl border p-6 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <GoldRule />
        <button
          type="button"
          onClick={() => onToggleFavorite(prompt)}
          aria-label={isFavorite ? "Remove from favourites" : "Save to favourites"}
          className="text-muted-foreground hover:text-blush -mt-1 text-lg leading-none transition-colors"
        >
          <span className={isFavorite ? "text-gold" : ""}>{isFavorite ? "★" : "☆"}</span>
        </button>
      </div>
      <p className="text-muted-foreground mt-5 text-[0.6rem] tracking-[0.22em] uppercase">
        {categoryName(prompt.category)}
      </p>
      <h3 className="font-display mt-2 text-xl leading-snug font-light">{prompt.title}</h3>
      <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
        {prompt.description}
      </p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="lux" size="sm" className="mt-6 self-start">
            Use this prompt
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90svh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-light">{prompt.title}</DialogTitle>
            <DialogDescription>{prompt.description}</DialogDescription>
          </DialogHeader>

          {fields.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field} className="grid gap-1.5">
                  <Label htmlFor={`${prompt.id}-${field}`} className="text-xs">
                    {fieldLabel(field)}
                  </Label>
                  <Input
                    id={`${prompt.id}-${field}`}
                    value={values[field] ?? ""}
                    placeholder={fieldLabel(field)}
                    onChange={(e) => setValues((v) => ({ ...v, [field]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="grid gap-1.5">
            <Label className="text-xs">Your prompt</Label>
            <Textarea readOnly value={filled} className="h-56 font-mono text-xs leading-relaxed" />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="gold" size="sm" onClick={copyToClipboard}>
              Copy prompt
            </Button>
            <Button variant="lux" size="sm" onClick={handleRun} disabled={running}>
              {running ? "Empire Builder AI is working…" : "Use with Empire Builder AI"}
            </Button>
          </div>

          {aiText && (
            <div className="border-border bg-background/60 rounded-xl border p-4">
              <p className="eyebrow eyebrow-blush">Empire Builder AI</p>
              <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">{aiText}</p>
              <Button
                variant="lux"
                size="sm"
                className="mt-4"
                onClick={() => {
                  void navigator.clipboard.writeText(aiText);
                  toast.success("Response copied.");
                }}
              >
                Copy response
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </article>
  );
}