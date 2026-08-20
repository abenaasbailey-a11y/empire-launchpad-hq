/**
 * Server-only AI runner for the Empire Prompt Vault.
 * Calls the Lovable AI Gateway to generate a response for a filled prompt.
 */
import { generateText } from "ai";

export interface VictoriaRunResult {
  text: string;
  model: string;
}

/**
 * Run a filled prompt through Victoria (Lovable AI Gateway) and return the text.
 */
export async function runPromptWithVictoria(
  filledPrompt: string,
  apiKey: string,
): Promise<VictoriaRunResult> {
  const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
  const provider = createLovableAiGatewayProvider(apiKey);
  const model = provider("gemini-2.5-flash");

  const { text } = await generateText({
    model,
    system:
      "You are Victoria, the AI business concierge for Her Empire Era, a luxury platform for women entrepreneurs. " +
      "Respond with warmth, clarity, and professional polish. Be specific and actionable. " +
      "Format with clear headings and bullet points where helpful.",
    prompt: filledPrompt,
  });

  return { text, model: "gemini-2.5-flash" };
}
