/**
 * Server-only AI runner for the Empire Prompt Vault.
 * Calls the Lovable AI Gateway to generate a response for a filled prompt.
 */
import { generateText } from "ai";

/** Elite and VIP members run on the higher-quality model — the real "priority AI" perk. */
const MODEL_BY_RANK: Record<number, string> = {
  0: "google/gemini-3.6-flash",
  1: "google/gemini-3.6-flash",
  2: "google/gemini-3.6-pro",
  3: "google/gemini-3.6-pro",
};

/**
 * Run a filled prompt through Empire Builder AI (Lovable AI Gateway)
 * and return the generated text. `rank` is the caller's membership tier rank
 * (0 free, 1 Member, 2 Elite, 3 VIP) as resolved server-side.
 */
export async function runPromptWithEmpireBuilder(
  filledPrompt: string,
  rank = 0,
): Promise<string> {
  const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured.");

  const provider = createLovableAiGatewayProvider(apiKey);
  const model = provider(MODEL_BY_RANK[rank] ?? MODEL_BY_RANK[0]!);

  const { text } = await generateText({
    model,
    system:
      "You are Victoria, the AI business concierge for Her Empire Era, a luxury platform for women entrepreneurs. " +
      "Respond with warmth, clarity, and professional polish. Be specific and actionable. " +
      "Format with clear headings and bullet points where helpful." +
      (rank >= 2
        ? " This member is on a premium tier: go deeper, add concrete numbers, timelines and next steps."
        : ""),
    prompt: filledPrompt,
  });

  return text;
}
