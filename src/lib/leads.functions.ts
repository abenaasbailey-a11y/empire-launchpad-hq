import { createServerFn } from "@tanstack/react-start";

/**
 * Saves a lead-magnet email opt-in. Public on purpose: this is the freebie
 * gate on the marketing page. Input is validated and normalised before any
 * database write, and nothing is ever read back to the browser.
 */
export const captureLead = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      email: string;
      source?: string;
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
    }) => {
      const email = String(input?.email ?? "")
        .trim()
        .toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
        throw new Error("Please enter a valid email address.");
      }
      const clean = (v: unknown) => {
        const s = String(v ?? "").trim();
        return s ? s.slice(0, 80) : null;
      };
      return {
        email,
        source: clean(input?.source) ?? "free-prompts",
        utm_source: clean(input?.utm_source),
        utm_medium: clean(input?.utm_medium),
        utm_campaign: clean(input?.utm_campaign),
      };
    },
  )
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("email_leads").insert(data);
    // A duplicate opt-in is a success from the visitor's point of view.
    if (error && error.code !== "23505") {
      console.error("[leads] capture failed", error.message);
      throw new Error("We could not save your email just now. Please try again.");
    }
    return { ok: true };
  });
