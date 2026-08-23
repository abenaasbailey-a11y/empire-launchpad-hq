import { createFileRoute } from "@tanstack/react-router";
import { APPLE_PAY_DOMAIN_ASSOCIATION } from "@/lib/apple-pay-domain-association.server";

// Serves the Apple Pay domain association file at the well-known path so
// Paddle/Apple can verify yourempireconcierge.com for Apple Pay checkout.
// route: /.well-known/apple-developer-merchantid-domain-association
export const Route = createFileRoute(
  "/.well-known/apple-developer-merchantid-domain-association",
)({
  server: {
    handlers: {
      GET: async () => {
        return new Response(APPLE_PAY_DOMAIN_ASSOCIATION, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=UTF-8",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
