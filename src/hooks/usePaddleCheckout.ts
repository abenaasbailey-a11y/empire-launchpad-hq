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

  const openCheckout = async (options: CheckoutOptions) => {
    setLoading(true);
    setError(null);
    try {
      await initializePaddle();
      const paddlePriceId = await getPaddlePriceId(options.priceId);

      const { data } = await supabase.auth.getUser();
      const user = data.user;

      const customData: Record<string, string> = {};
      if (user?.id) customData["userId"] = user.id;
      if (options.serviceTitle) customData["serviceTitle"] = options.serviceTitle;

      window.Paddle.Checkout.open({
        items: [{ priceId: paddlePriceId, quantity: options.quantity ?? 1 }],
        customer: options.customerEmail
          ? { email: options.customerEmail }
          : user?.email
            ? { email: user.email }
            : undefined,
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

  return { openCheckout, loading, error };
}
