ALTER TABLE public.onboarding_progress
  ADD COLUMN IF NOT EXISTS reminder_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS reminder_sent_at timestamptz;

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'onboarding-reminders-daily') THEN
    PERFORM cron.unschedule('onboarding-reminders-daily');
  END IF;
END $$;

SELECT cron.schedule(
  'onboarding-reminders-daily',
  '0 15 * * *',
  $$
  SELECT net.http_post(
    url := 'https://herempireera.com/api/public/onboarding-reminders',
    headers := '{"Content-Type": "application/json", "apikey": "sb_publishable_WO5IEuMS3aoP3Hwt5p1T3g_cA8h5zVJ"}'::jsonb,
    body := '{"source": "pg_cron"}'::jsonb
  );
  $$
);