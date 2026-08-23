import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Free accounts get this many Empire Builder AI runs per calendar month. */
export const FREE_AI_RUNS_PER_MONTH = 10;

export type Entitlement = {
  member: boolean;
  used: number;
  limit: number | null;
  remaining: number | null;
};

/**
 * Server-side source of truth for what the signed-in account may use.
 * Backed by the security-definer `my_entitlement` function so the answer cannot
 * be faked from the browser.
 */
export const getMyEntitlement = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Entitlement> => {
    const { data, error } = await context.supabase.rpc("my_entitlement", {
      free_limit: FREE_AI_RUNS_PER_MONTH,
    });
    if (error) throw new Error(error.message);
    const row = (data ?? {}) as Partial<Entitlement>;
    return {
      member: Boolean(row.member),
      used: Number(row.used ?? 0),
      limit: row.limit === null || row.limit === undefined ? null : Number(row.limit),
      remaining:
        row.remaining === null || row.remaining === undefined ? null : Number(row.remaining),
    };
  });
