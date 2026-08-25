import { getStripeEnvironmentSafe, isPaymentsConfigured } from "@/lib/stripe";

export function PaymentTestModeBanner() {
  if (!isPaymentsConfigured()) {
    return (
      <div className="border-destructive/40 bg-destructive/10 text-destructive w-full border-b px-4 py-2 text-center text-xs tracking-wide">
        Checkout is not configured yet. Complete payment go-live to accept real payments.
      </div>
    );
  }

  if (getStripeEnvironmentSafe() !== "sandbox") return null;

  return (
    <div className="border-gold/30 bg-gold/10 text-gold w-full border-b px-4 py-2 text-center text-xs tracking-wide">
      All payments made in the preview are in test mode.{" "}
      <a
        href="https://docs.lovable.dev/features/payments#test-and-live-environments"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline"
      >
        Read more
      </a>
    </div>
  );
}
