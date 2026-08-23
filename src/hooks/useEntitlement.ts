import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyEntitlement, type Entitlement } from "@/lib/entitlement.functions";

/**
 * Client-side view of the signed-in account's membership entitlement.
 * UX only — every premium read/run is also enforced on the server.
 */
export function useEntitlement() {
  const fetchEntitlement = useServerFn(getMyEntitlement);

  const query = useQuery<Entitlement>({
    queryKey: ["entitlement"],
    queryFn: () => fetchEntitlement(),
    staleTime: 30_000,
  });

  const data = query.data;
  return {
    isLoading: query.isLoading,
    refetch: query.refetch,
    isMember: Boolean(data?.member),
    used: data?.used ?? 0,
    limit: data?.limit ?? null,
    remaining: data?.remaining ?? null,
    outOfRuns: Boolean(data && !data.member && (data.remaining ?? 0) <= 0),
  };
}
