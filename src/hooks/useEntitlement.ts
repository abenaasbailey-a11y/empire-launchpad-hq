import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironmentSafe } from "@/lib/stripe";
import {
  getMyEntitlement,
  type Entitlement,
  type MemberTier,
} from "@/lib/entitlement.functions";

export const ENTITLEMENT_QUERY_KEY = ["entitlement"] as const;

const TIER_LABEL: Record<MemberTier, string> = {
  free: "Free account",
  member: "Empire Member",
  elite: "Empire Elite",
  vip: "Empire VIP",
};

/**
 * Client-side view of the signed-in account's membership entitlement.
 * UX only — every premium read/run is also enforced on the server.
 * Skips the call entirely for visitors with no session so public pages
 * (like /membership) never hit the auth-gated server function.
 */
export function useEntitlement() {
  const fetchEntitlement = useServerFn(getMyEntitlement);
  const environment = getStripeEnvironmentSafe();
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    void supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) setSignedIn(Boolean(data.session));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const query = useQuery<Entitlement>({
    queryKey: [...ENTITLEMENT_QUERY_KEY, environment],
    queryFn: () => fetchEntitlement({ data: { environment } }),
    enabled: signedIn === true,
    staleTime: 30_000,
    retry: false,
  });

  const data = query.data;
  const tier = data?.tier ?? "free";
  const rank = data?.rank ?? 0;
  return {
    isLoading: signedIn === null || (signedIn === true && query.isLoading),
    signedIn: signedIn === true,
    refetch: query.refetch,
    environment,
    isMember: Boolean(data?.member),
    tier,
    tierLabel: TIER_LABEL[tier],
    rank,
    isElite: rank >= 2,
    isVip: rank >= 3,
    used: data?.used ?? 0,
    limit: data?.limit ?? null,
    remaining: data?.remaining ?? null,
    outOfRuns: Boolean(data && !data.member && (data.remaining ?? 0) <= 0),
  };
}
