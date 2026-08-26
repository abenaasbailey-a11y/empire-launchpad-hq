import { useCallback, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getStripeEnvironmentSafe } from "@/lib/stripe";
import { createBillingPortalLink } from "@/lib/billing.functions";

/**
 * Opens Stripe's hosted billing portal in a new tab. This is the single place
 * members change plans, update cards or cancel, so we never create a second
 * subscription for the same account.
 */
export function useBillingPortal(returnPath = "/dashboard") {
  const createPortal = useServerFn(createBillingPortalLink);
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openPortal = useCallback(async () => {
    setOpening(true);
    setError(null);
    try {
      const returnUrl =
        typeof window === "undefined" ? undefined : `${window.location.origin}${returnPath}`;
      const { url } = await createPortal({
        data: {
          environment: getStripeEnvironmentSafe(),
          ...(returnUrl ? { returnUrl } : {}),
        },
      });
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "We could not open your billing portal just now.",
      );
    } finally {
      setOpening(false);
    }
  }, [createPortal, returnPath]);

  return { openPortal, opening, error };
}
