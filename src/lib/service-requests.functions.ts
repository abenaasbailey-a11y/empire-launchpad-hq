import { createServerFn } from "@tanstack/react-start";

const VALID_SERVICES = [
  "Government Grant Writing",
  "Private & Foundation Grants",
  "Business Plan",
  "Résumé & Cover Letter Makeover",
  "Social Media Content Package",
  "Email Marketing Sequence",
  "Custom / Not Sure",
] as const;

/**
 * Captures a service request from the public Services page.
 * Public on purpose: visitors submit an order without an account.
 */
export const captureServiceRequest = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      name: string;
      email: string;
      phone?: string | undefined;
      service_type: string;
      business_name?: string | undefined;
      details: string;
      budget?: string | undefined;
    }) => {
      const name = String(input?.name ?? "").trim();
      if (!name || name.length > 120) {
        throw new Error("Please enter your name.");
      }

      const email = String(input?.email ?? "").trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
        throw new Error("Please enter a valid email address.");
      }

      const service_type = String(input?.service_type ?? "").trim();
      if (!VALID_SERVICES.includes(service_type as (typeof VALID_SERVICES)[number])) {
        throw new Error("Please choose a service.");
      }

      const details = String(input?.details ?? "").trim();
      if (!details || details.length < 10) {
        throw new Error("Please tell us a bit about what you need (at least 10 characters).");
      }
      if (details.length > 5000) {
        throw new Error("Please keep your details under 5,000 characters.");
      }

      const clean = (v: unknown, max = 200) => {
        const s = String(v ?? "").trim();
        return s ? s.slice(0, max) : null;
      };

      return {
        name,
        email,
        phone: clean(input?.phone, 40),
        service_type,
        business_name: clean(input?.business_name, 200),
        details,
        budget: clean(input?.budget, 100),
      };
    },
  )
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("service_requests").insert(data);
    if (error) {
      console.error("[services] capture failed", error.message);
      throw new Error("We could not submit your request just now. Please try again.");
    }
    return { ok: true };
  });

export const servicesList = VALID_SERVICES;
