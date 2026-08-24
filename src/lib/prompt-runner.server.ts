/**
 * Server-only AI runner for the Empire Prompt Vault.
 * Calls the Lovable AI Gateway to generate a response for a filled prompt.
 */
import { generateText } from "ai";

/**
 * Run a filled prompt through Empire Builder AI (Lovable AI Gateway)
 * and return the generated text.
 */
export async function runPromptWithEmpireBuilder(filledPrompt: string): Promise<string> {
  const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured.");

  const provider = createLovableAiGatewayProvider(apiKey);
  const model = provider("google/gemini-3.6-flash");

  const { text } = await generateText({
    model,
    system:
      "You are Victoria, the AI business concierge for Her Empire Era, a luxury platform for women entrepreneurs. " +
      "Respond with warmth, clarity, and professional polish. Be specific and actionable. " +
      "Format with clear headings and bullet points where helpful.",
    prompt: filledPrompt,
  });

  return text;
}
