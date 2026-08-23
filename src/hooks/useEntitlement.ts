import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getMyEntitlement, type Entitlement } from "@/lib/entitlement.functions";

/**
 * Client-side view of the signed-in account's membership entitlement.
 * UX only — every premium read/run is also enforced on the server.
 * Skips the call entirely for visitors with no session so public pages
 * (like /membership) never hit the auth-gated server function.
 */
export function useEntitlement() {
  const fetchEntitlement = useServerFn(getMyEntitlement);
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
    queryKey: ["entitlement"],
    queryFn: () => fetchEntitlement(),
    enabled: signedIn === true,
    staleTime: 30_000,
    retry: false,
  });

  const data = query.data;
  return {
    isLoading: signedIn === null || (signedIn === true && query.isLoading),
    signedIn: signedIn === true,
    refetch: query.refetch,
    isMember: Boolean(data?.member),
    used: data?.used ?? 0,
    limit: data?.limit ?? null,
    remaining: data?.remaining ?? null,
    outOfRuns: Boolean(data && !data.member && (data.remaining ?? 0) <= 0),
  };
}
