ALTER TABLE public.victoria_pick_notes
  ADD COLUMN IF NOT EXISTS completed_steps integer[] NOT NULL DEFAULT '{}'::integer[];