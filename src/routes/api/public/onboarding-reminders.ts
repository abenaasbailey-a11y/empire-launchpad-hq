import { createFileRoute } from "@tanstack/react-router";

/**
 * Scheduled endpoint (pg_cron) that emails members whose onboarding checklist
 * is still incomplete. Callers must present the project's anon key.
 */
function authorized(request: Request): boolean {
  const expected = process.env["SUPABASE_ANON_KEY"];
  if (!expected) return false;
  const provided =
    request.headers.get("apikey") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    "";
  return provided.length > 0 && provided === expected;
}

async function handle(request: Request) {
  if (!authorized(request)) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { runOnboardingReminders } = await import("@/lib/onboarding-reminders.server");
    const result = await runOnboardingReminders();
    return Response.json({ ok: true, ...result });
  } catch (error) {
    console.error("[onboarding-reminders] run failed", error);
    return Response.json({ ok: false, error: "run_failed" }, { status: 500 });
  }
}

export const Route = createFileRoute("/api/public/onboarding-reminders")({
  server: {
    handlers: {
      POST: ({ request }) => handle(request),
      GET: ({ request }) => handle(request),
    },
  },
});
