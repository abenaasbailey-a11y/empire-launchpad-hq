import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

/** Runs a Prompt Vault prompt through Empire Builder AI and returns the response text. */
export async function runPromptWithEmpireBuilder(prompt: string): Promise<string> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("Empire Builder AI is not configured yet.");

  const gateway = createLovableAiGatewayProvider(key);

  const { text } = await generateText({
    model: gateway("google/gemini-3.6-flash"),
    system:
      "You are Empire Builder AI, the business concierge for Her Empire Era. You help women founders " +
      "with marketing, planning, funding, communication, career and productivity work. Be warm, " +
      "confident and specific. Use clear headings and short paragraphs. Never give legal, tax or " +
      "financial guarantees, and never promise grant approval.",
    prompt,
  });

  return text.trim();
}