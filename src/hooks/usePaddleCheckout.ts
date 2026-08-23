import { useState } from "react";
import { getPaddlePriceId, initializePaddle } from "@/lib/paddle";
import { supabase } from "@/integrations/supabase/client";

export type CheckoutOptions = {
  priceId: string;
  quantity?: number;
  customerEmail?: string;
  serviceTitle?: string;
  successUrl?: string;
};

export function usePaddleCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);

  const openCheckout = async (options: CheckoutOptions) => {
    setLoading(true);
    setError(null);
    try {
      // Purchases must be tied to a member account so the order, entitlement and
      // billing portal all resolve to a real user.
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) {
        setNeedsAuth(true);
        return;
      }

      await initializePaddle();
      const paddlePriceId = await getPaddlePriceId(options.priceId);

      const customData: Record<string, string> = { userId: user.id };
      if (options.serviceTitle) customData["serviceTitle"] = options.serviceTitle;

      window.Paddle.Checkout.open({
        items: [{ priceId: paddlePriceId, quantity: options.quantity ?? 1 }],
        customer: { email: options.customerEmail ?? user.email ?? "" },
        customData: Object.keys(customData).length ? customData : undefined,
        settings: {
          displayMode: "overlay",
          successUrl: options.successUrl || `${window.location.origin}/checkout/success`,
          allowLogout: false,
          variant: "one-page",
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout could not be opened.");
    } finally {
      setLoading(false);
    }
  };

  return { openCheckout, loading, error, needsAuth, clearNeedsAuth: () => setNeedsAuth(false) };
}
