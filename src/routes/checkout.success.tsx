import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const TITLE = "Payment Confirmed — Her Empire Era";
const DESCRIPTION =
  "Your payment is confirmed. Here's what happens next with your Her Empire Era project.";

export const Route = createFileRoute("/checkout/success")({
  component: CheckoutSuccess,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
});

function CheckoutSuccess() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-5 py-20">
      <div className="border-gold/30 bg-card/50 w-full max-w-xl rounded-2xl border p-8 text-center backdrop-blur-sm md:p-12">
        <div className="bg-gold/10 text-gold mx-auto flex h-14 w-14 items-center justify-center rounded-full">
          <Check className="h-7 w-7" />
        </div>
        <p className="text-gold mt-6 text-[0.65rem] tracking-[0.24em] uppercase">
          Payment confirmed
        </p>
        <h1 className="font-display mt-3 text-3xl font-light md:text-4xl">
          Welcome to your <span className="text-gold">empire era</span>
        </h1>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          Thank you — your payment went through and your project is officially in the queue. Your
          receipt is on its way to the email you used at checkout.
        </p>

        <div className="mt-8 space-y-4 text-left">
          <div className="border-border flex gap-3 rounded-xl border p-4">
            <Mail className="text-blush mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-card-foreground/80 text-sm leading-relaxed">
              Watch your inbox — we'll email you within 24 hours to collect the details we need to
              start writing.
            </p>
          </div>
          <div className="border-border flex gap-3 rounded-xl border p-4">
            <Clock className="text-blush mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-card-foreground/80 text-sm leading-relaxed">
              Your draft arrives within the turnaround listed for your service, with one revision
              round included.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="lux" asChild>
            <Link to="/services" hash="order">
              Send us your project details
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
