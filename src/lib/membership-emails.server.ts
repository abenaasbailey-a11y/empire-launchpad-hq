import { createClient } from "@supabase/supabase-js";
import { sendTemplateEmail } from "@/lib/email-templates/send-email";
import type { StripeEnv } from "@/lib/stripe.server";

/**
 * Member-facing subscription notifications (receipts, renewals, cancellations,
 * failed payments). Every send is best-effort: an email problem must never make
 * the payments webhook fail, because Stripe would then retry the whole event
 * and duplicate the database work.
 */

const PLAN_NAMES: Record<string, string> = {
  empire_member_monthly: "Empire Member",
  empire_elite_monthly: "Empire Elite",
  empire_vip_monthly: "Empire VIP",
};

export function planNameFromPriceId(priceId: string | null | undefined): string {
  if (!priceId) return "Empire Member";
  return PLAN_NAMES[priceId] ?? "Empire Member";
}

export function formatMoney(amountCents: number | null | undefined, currency = "usd"): string {
  if (typeof amountCents !== "number") return "";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amountCents / 100);
  } catch {
    return `${(amountCents / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
}

export function formatDate(value: number | string | null | undefined): string {
  if (value == null) return "";
  const date = typeof value === "number" ? new Date(value * 1000) : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function firstNameFrom(fullName: string | null | undefined, email: string | null): string {
  const source = (fullName ?? "").trim();
  if (source) return source.split(/\s+/)[0]!;
  const local = email?.split("@")[0] ?? "";
  if (!local) return "";
  const cleaned = local.replace(/[._+-]+/g, " ").trim();
  if (!cleaned) return "";
  const first = cleaned.split(" ")[0]!;
  return first.charAt(0).toUpperCase() + first.slice(1);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _admin: any = null;
function admin() {
  if (!_admin) {
    _admin = createClient(
      process.env["SUPABASE_URL"]!,
      process.env["SUPABASE_SERVICE_ROLE_KEY"]!,
    );
  }
  return _admin;
}

export interface Recipient {
  email: string;
  firstName: string;
}

/**
 * Resolves who to email. Stripe's own email is preferred (it is the address the
 * customer typed at checkout); the account email is the fallback.
 */
export async function resolveRecipient(input: {
  email?: string | null;
  userId?: string | null;
}): Promise<Recipient | null> {
  let email = input.email?.trim() || null;
  let fullName: string | null = null;

  if (input.userId) {
    try {
      const { data } = await admin().auth.admin.getUserById(input.userId);
      const user = data?.user;
      if (user) {
        email = email ?? user.email ?? null;
        fullName =
          (user.user_metadata?.["full_name"] as string | undefined) ??
          (user.user_metadata?.["name"] as string | undefined) ??
          null;
      }
    } catch (e) {
      console.error("Membership emails: could not load account for recipient", e);
    }
  }

  if (!email) return null;
  return { email, firstName: firstNameFrom(fullName, email) };
}

async function send(
  template: string,
  to: string,
  idempotencyKey: string,
  templateData: Record<string, unknown>,
) {
  try {
    const result = await sendTemplateEmail(template, to, { templateData, idempotencyKey });
    if (!result.sent) {
      console.log(`Membership emails: ${template} skipped (${result.reason})`);
    }
  } catch (e) {
    console.error(`Membership emails: ${template} failed to send`, e);
  }
}

export async function sendMembershipReceipt(args: {
  recipient: Recipient;
  env: StripeEnv;
  eventId: string;
  planName: string;
  amount: string;
  paidOn: string;
  renewsOn: string;
  invoiceUrl?: string | null;
  isRenewal: boolean;
}) {
  await send("membership-receipt", args.recipient.email, `receipt-${args.eventId}`, {
    firstName: args.recipient.firstName,
    planName: args.planName,
    amount: args.amount,
    paidOn: args.paidOn,
    renewsOn: args.renewsOn,
    invoiceUrl: args.invoiceUrl ?? undefined,
    isRenewal: args.isRenewal,
    testMode: args.env === "sandbox",
  });
}

export async function sendCancellationScheduled(args: {
  recipient: Recipient;
  env: StripeEnv;
  eventId: string;
  planName: string;
  accessUntil: string;
}) {
  await send(
    "membership-cancel-scheduled",
    args.recipient.email,
    `cancel-scheduled-${args.eventId}`,
    {
      firstName: args.recipient.firstName,
      planName: args.planName,
      accessUntil: args.accessUntil,
      testMode: args.env === "sandbox",
    },
  );
}

export async function sendMembershipEnded(args: {
  recipient: Recipient;
  env: StripeEnv;
  eventId: string;
  planName: string;
}) {
  await send("membership-ended", args.recipient.email, `ended-${args.eventId}`, {
    firstName: args.recipient.firstName,
    planName: args.planName,
    testMode: args.env === "sandbox",
  });
}

export async function sendPaymentFailed(args: {
  recipient: Recipient;
  env: StripeEnv;
  eventId: string;
  planName: string;
  amount: string;
  retryOn: string;
  invoiceUrl?: string | null;
}) {
  await send("membership-payment-failed", args.recipient.email, `failed-${args.eventId}`, {
    firstName: args.recipient.firstName,
    planName: args.planName,
    amount: args.amount,
    retryOn: args.retryOn,
    invoiceUrl: args.invoiceUrl ?? undefined,
    testMode: args.env === "sandbox",
  });
}
