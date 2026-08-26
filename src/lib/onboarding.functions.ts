import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** The three onboarding moves shown on /welcome. Keys are stored in the database. */
export const ONBOARDING_STEP_KEYS = ["victoria", "prompt-vault", "opportunities"] as const;
export type OnboardingStepKey = (typeof ONBOARDING_STEP_KEYS)[number];

function normalizeSteps(value: unknown): OnboardingStepKey[] {
  if (!Array.isArray(value)) return [];
  return ONBOARDING_STEP_KEYS.filter((key) => value.includes(key));
}

/** Reads the signed-in member's saved onboarding progress. */
export const getMyOnboarding = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ completed: OnboardingStepKey[] }> => {
    const { data, error } = await context.supabase
      .from("onboarding_progress")
      .select("completed_steps")
      .eq("user_id", context.userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { completed: normalizeSteps(data?.completed_steps) };
  });

/** Marks one onboarding step complete or incomplete and returns the saved state. */
export const setMyOnboardingStep = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { step: OnboardingStepKey; done: boolean }) => {
    if (!ONBOARDING_STEP_KEYS.includes(input?.step)) {
      throw new Error("Unknown onboarding step");
    }
    return { step: input.step, done: Boolean(input.done) };
  })
  .handler(async ({ data, context }): Promise<{ completed: OnboardingStepKey[] }> => {
    const { data: existing, error: readError } = await context.supabase
      .from("onboarding_progress")
      .select("completed_steps")
      .eq("user_id", context.userId)
      .maybeSingle();
    if (readError) throw new Error(readError.message);

    const current = new Set(normalizeSteps(existing?.completed_steps));
    if (data.done) current.add(data.step);
    else current.delete(data.step);
    const next = ONBOARDING_STEP_KEYS.filter((key) => current.has(key));

    const { error } = await context.supabase
      .from("onboarding_progress")
      .upsert(
        { user_id: context.userId, completed_steps: next, updated_at: new Date().toISOString() },
        { onConflict: "user_id" },
      );
    if (error) throw new Error(error.message);

    return { completed: next };
  });
