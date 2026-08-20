import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Sends a filled Prompt Vault prompt to Empire Builder AI and returns the answer. */
export const runVaultPrompt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { prompt: string }) => {
    const prompt = String(input?.prompt ?? "").trim();
    if (prompt.length < 20) throw new Error("This prompt looks empty. Add a little more detail.");
    return { prompt: prompt.slice(0, 8000) };
  })
  .handler(async ({ data }): Promise<{ text: string; error?: string }> => {
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