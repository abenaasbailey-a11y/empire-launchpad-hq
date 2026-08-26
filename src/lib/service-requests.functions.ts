import { createServerFn } from "@tanstack/react-start";
import { SERVICE_NAMES } from "@/lib/services-catalog";

const VALID_SERVICES: readonly string[] = SERVICE_NAMES;


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
      paddle_transaction_id?: string | undefined;
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
        paddle_transaction_id: clean(input?.paddle_transaction_id, 120),
      };
    },
  )
  .handler(async ({ data }): Promise<{ ok: boolean }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // When the request follows a paid checkout, attach it to that order (and the
    // buyer's account) so admins see payment and project details together.
    let order_id: string | null = null;
    let user_id: string | null = null;
    if (data.paddle_transaction_id) {
      const { data: order } = await supabaseAdmin
        .from("orders")
        .select("id, user_id")
        .eq("paddle_transaction_id", data.paddle_transaction_id)
        .maybeSingle();
      order_id = order?.id ?? null;
      user_id = order?.user_id ?? null;
    }

    const { error } = await supabaseAdmin
      .from("service_requests")
      .insert({ ...data, order_id, user_id });
    if (error) {
      console.error("[services] capture failed", error.message);
      throw new Error("We could not submit your request just now. Please try again.");
    }
    return { ok: true };
  });

export const servicesList = VALID_SERVICES;
