import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { normalizeEnv } from "@/lib/entitlement.functions";

/**
 * Victoria AI Grant Assistant — an Empire Elite feature.
 * Helps members draft a tailored grant application using their business details.
 * Gated server-side to rank >= 2 (Elite / VIP) so it cannot be bypassed.
 */
export const runGrantAssistant = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      grantName: string;
      businessName?: string | undefined;
      businessDescription: string;
      environment?: "sandbox" | "live" | undefined;
    }) => {
      const grantName = String(input?.grantName ?? "").trim();
      const businessDescription = String(input?.businessDescription ?? "").trim();
      const businessName = String(input?.businessName ?? "").trim();
      if (!grantName || !businessDescription) {
        throw new Error("Please fill in the grant name and your business description.");
      }
      return {
        grantName: grantName.slice(0, 200),
        businessName: businessName.slice(0, 200),
        businessDescription: businessDescription.slice(0, 4000),
        environment: normalizeEnv(input?.environment),
      };
    },
  )
  .handler(
    async ({
      data,
      context,
    }): Promise<{ text: string; error?: string; needsUpgrade?: boolean }> => {
      // Verify Elite+ membership (rank >= 2) server-side.
      const { data: result, error } = await context.supabase.rpc("my_entitlement", {
        free_limit: 0,
        check_env: data.environment,
      });
      if (error) {
        console.error("[grant-assistant] entitlement check failed", error);
        return { text: "", error: "We could not verify your account just now." };
      }
      const row = (result ?? {}) as { rank?: number };
      const rank = Number(row["rank"] ?? 0);
      if (rank < 2) {
        return {
          text: "",
          needsUpgrade: true,
          error:
            "The Grant Assistant is an Empire Elite feature. Upgrade to unlock AI-powered grant application help.",
        };
      }

      const prompt =
        `You are helping a woman entrepreneur apply for the "${data.grantName}" grant.\n\n` +
        `Business name: ${data.businessName || "Not specified"}\n` +
        `Business description: ${data.businessDescription}\n\n` +
        `Please draft a compelling grant application that includes:\n` +
        `1. A one-paragraph executive summary\n` +
        `2. Business overview (what they do, who they serve, traction so far)\n` +
        `3. How the grant funds will be used (be specific and realistic)\n` +
        `4. Community impact — how this business helps women, families, or the community\n` +
        `5. A closing statement that makes the application memorable\n\n` +
        `Keep the tone confident, professional, and authentic. Avoid generic filler — ` +
        `make every sentence specific to this business.`;

      const { runPromptWithEmpireBuilder } = await import("./prompt-runner.server");
      try {
        return { text: await runPromptWithEmpireBuilder(prompt, rank) };
      } catch (err) {
        console.error("[grant-assistant] AI failed", err);
        return { text: "", error: "Victoria AI is unavailable right now. Please try again shortly." };
      }
    },
  );
