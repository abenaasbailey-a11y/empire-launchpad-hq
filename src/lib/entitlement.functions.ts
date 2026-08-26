import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Free accounts get this many Empire Builder AI runs per calendar month. */
export const FREE_AI_RUNS_PER_MONTH = 10;

export type MemberTier = "free" | "member" | "elite" | "vip";

export type Entitlement = {
  member: boolean;
  tier: MemberTier;
  rank: number;
  used: number;
  limit: number | null;
  remaining: number | null;
};

const TIERS: MemberTier[] = ["free", "member", "elite", "vip"];

function normalizeTier(value: unknown): MemberTier {
  return TIERS.includes(value as MemberTier) ? (value as MemberTier) : "free";
}

/** Test-mode and live-mode purchases are kept strictly separate. */
export function normalizeEnv(value: unknown): "sandbox" | "live" {
  return value === "live" ? "live" : "sandbox";
}

/**
 * Server-side source of truth for what the signed-in account may use.
 * Backed by the security-definer `my_entitlement` function so the answer cannot
 * be faked from the browser, and scoped to the payment environment so a test
 * purchase never unlocks the live site.
 */
export const getMyEntitlement = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { environment?: "sandbox" | "live" } | undefined) => ({
    environment: normalizeEnv(input?.environment),
  }))
  .handler(async ({ data, context }): Promise<Entitlement> => {
    const { data: result, error } = await context.supabase.rpc("my_entitlement", {
      free_limit: FREE_AI_RUNS_PER_MONTH,
      check_env: data.environment,
    });
    if (error) throw new Error(error.message);
    const row = (result ?? {}) as Record<string, unknown>;
    return {
      member: Boolean(row["member"]),
      tier: normalizeTier(row["tier"]),
      rank: Number(row["rank"] ?? 0),
      used: Number(row["used"] ?? 0),
      limit: row["limit"] === null || row["limit"] === undefined ? null : Number(row["limit"]),
      remaining:
        row["remaining"] === null || row["remaining"] === undefined
          ? null
          : Number(row["remaining"]),
    };
  });
