import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { FREE_AI_RUNS_PER_MONTH } from "@/lib/entitlement.functions";

/** Sends a filled Prompt Vault prompt to Empire Builder AI and returns the answer. */
export const runVaultPrompt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { prompt: string }) => {
    const prompt = String(input?.prompt ?? "").trim();
    if (prompt.length < 20) throw new Error("This prompt looks empty. Add a little more detail.");
    return { prompt: prompt.slice(0, 8000) };
  })
  .handler(async ({ data, context }): Promise<{ text: string; error?: string; limitReached?: boolean }> => {
    // Members run unlimited prompts; free accounts are metered server-side so the
    // cap cannot be bypassed from the browser.
    const { data: usage, error: usageError } = await context.supabase.rpc("consume_ai_run", {
      free_limit: FREE_AI_RUNS_PER_MONTH,
    });
    if (usageError) {
      console.error("[prompt-vault] usage check failed", usageError);
      return { text: "", error: "We could not verify your account just now. Please try again." };
    }
    const allowed = Boolean((usage as { allowed?: boolean } | null)?.allowed);
    if (!allowed) {
      return {
        text: "",
        error: `You've used all ${FREE_AI_RUNS_PER_MONTH} free AI runs this month. Become a member for unlimited runs and the full vault.`,
        limitReached: true,
      };
    }

    const { runPromptWithEmpireBuilder } = await import("./prompt-runner.server");
    try {
      return { text: await runPromptWithEmpireBuilder(data.prompt) };
    } catch (error) {
      console.error("[prompt-vault] Empire Builder AI failed", error);
      return {
        text: "",
        error: "Empire Builder AI is unavailable right now. Copy the prompt and try again shortly.",
      };
    }
  });
