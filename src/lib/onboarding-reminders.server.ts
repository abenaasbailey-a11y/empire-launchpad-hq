import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendTemplateEmail } from "@/lib/email-templates/send-email";

/**
 * Nudges members whose /welcome onboarding checklist is still incomplete.
 * Runs from a scheduled public route; each member gets at most MAX_REMINDERS
 * emails, spaced REMINDER_GAP_DAYS apart, starting FIRST_DELAY_HOURS after signup.
 */

const STEPS = [
  {
    key: "victoria",
    title: "Meet Victoria",
    body: "Tell Victoria your offer, your audience and your goals — she drafts content, pricing and plans in your voice, 24/7.",
  },
  {
    key: "prompt-vault",
    title: "Browse the Prompt Vault",
    body: "56 ready-to-run prompts for marketing, grants, résumés and content. Copy, paste and let the AI do the heavy lifting.",
  },
  {
    key: "opportunities",
    title: "Find your next move",
    body: "The Opportunity Center matches side hustles to your skills and goals with an AI recommendation engine.",
  },
] as const;

const MAX_REMINDERS = 3;
const REMINDER_GAP_DAYS = 3;
const FIRST_DELAY_HOURS = 24;
const MAX_SENDS_PER_RUN = 50;

function firstNameFrom(fullName: string | null | undefined, email: string | null): string {
  const source = (fullName ?? "").trim();
  if (source) return source.split(/\s+/)[0]!;
  const local = email?.split("@")[0] ?? "";
  const cleaned = local.replace(/[._+-]+/g, " ").trim();
  if (!cleaned) return "";
  const first = cleaned.split(" ")[0]!;
  return first.charAt(0).toUpperCase() + first.slice(1);
}

function hoursSince(iso: string | null | undefined): number {
  if (!iso) return Number.POSITIVE_INFINITY;
  const ms = Date.now() - new Date(iso).getTime();
  return Number.isNaN(ms) ? Number.POSITIVE_INFINITY : ms / 3_600_000;
}

export interface ReminderRunResult {
  candidates: number;
  sent: number;
  skipped: number;
  errors: number;
}

export async function runOnboardingReminders(): Promise<ReminderRunResult> {
  const result: ReminderRunResult = { candidates: 0, sent: 0, skipped: 0, errors: 0 };

  // Members (auth users) — reminders only make sense for accounts with emails.
  const users: { id: string; email: string | null; created_at: string }[] = [];
  for (let page = 1; page <= 5; page += 1) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error(error.message);
    for (const user of data.users) {
      users.push({
        id: user.id,
        email: user.email ?? null,
        created_at: user.created_at,
      });
    }
    if (data.users.length < 200) break;
  }

  const { data: progressRows, error: progressError } = await supabaseAdmin
    .from("onboarding_progress")
    .select("user_id, completed_steps, reminder_count, reminder_sent_at");
  if (progressError) throw new Error(progressError.message);

  const { data: profileRows } = await supabaseAdmin.from("profiles").select("id, full_name");
  const names = new Map((profileRows ?? []).map((row) => [row.id, row.full_name]));
  const progress = new Map((progressRows ?? []).map((row) => [row.user_id, row]));

  for (const user of users) {
    if (!user.email) continue;
    if (hoursSince(user.created_at) < FIRST_DELAY_HOURS) continue;

    const row = progress.get(user.id);
    const completed = Array.isArray(row?.completed_steps) ? row!.completed_steps : [];
    const nextStep = STEPS.find((step) => !completed.includes(step.key));
    if (!nextStep) continue;

    const reminderCount = row?.reminder_count ?? 0;
    if (reminderCount >= MAX_REMINDERS) continue;
    if (hoursSince(row?.reminder_sent_at) < REMINDER_GAP_DAYS * 24) continue;

    result.candidates += 1;
    if (result.sent >= MAX_SENDS_PER_RUN) {
      result.skipped += 1;
      continue;
    }

    try {
      const send = await sendTemplateEmail("onboarding-reminder", user.email, {
        idempotencyKey: `onboarding-reminder-${user.id}-${reminderCount + 1}`,
        templateData: {
          name: firstNameFrom(names.get(user.id), user.email),
          nextStepTitle: nextStep.title,
          nextStepBody: nextStep.body,
          completedCount: completed.length,
          totalSteps: STEPS.length,
        },
      });

      const { error } = await supabaseAdmin.from("onboarding_progress").upsert(
        {
          user_id: user.id,
          completed_steps: completed,
          reminder_count: reminderCount + 1,
          reminder_sent_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );
      if (error) throw new Error(error.message);

      if (send.sent) result.sent += 1;
      else result.skipped += 1;
    } catch (error) {
      result.errors += 1;
      console.error("[onboarding-reminders] send failed", error);
    }
  }

  return result;
}
