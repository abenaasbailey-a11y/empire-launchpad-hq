import { useCallback, useState } from "react";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { supabase } from "@/integrations/supabase/client";

export type CheckoutOptions = {
  priceId: string;
  quantity?: number | undefined;
  customerEmail?: string | undefined;
  serviceTitle?: string | undefined;
  successUrl?: string | undefined;
};

type OpenOptions = CheckoutOptions & { userId: string; returnUrl: string };

/**
 * Opens the inline payment form for a member. Purchases must be tied to a
 * member account so the order, entitlement and billing portal all resolve.
 */
export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [options, setOptions] = useState<OpenOptions | null>(null);

  const openCheckout = useCallback(async (opts: CheckoutOptions) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) {
        setNeedsAuth(true);
        return;
      }
      setOptions({
        ...opts,
        userId: user.id,
        customerEmail: opts.customerEmail ?? user.email ?? undefined,
        returnUrl:
          opts.successUrl ||
          `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout could not be opened.");
    } finally {
      setLoading(false);
    }
  }, []);

  const closeCheckout = useCallback(() => setOptions(null), []);

  const checkoutElement = options ? (
    <StripeEmbeddedCheckout
      priceId={options.priceId}
      quantity={options.quantity}
      customerEmail={options.customerEmail}
      userId={options.userId}
      serviceTitle={options.serviceTitle}
      returnUrl={options.returnUrl}
    />
  ) : null;

  return {
    openCheckout,
    closeCheckout,
    loading,
    error,
    needsAuth,
    isOpen: Boolean(options),
    checkoutElement,
    clearNeedsAuth: () => setNeedsAuth(false),
  };
}
