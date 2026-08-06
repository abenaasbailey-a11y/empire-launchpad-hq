import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

/** Shared provider that points the AI SDK at the Lovable AI Gateway. */
export function createLovableAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "lovable-ai-gateway",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: { "Lovable-API-Key": apiKey },
  });
}