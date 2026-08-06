ALTER TABLE public.profiles
  ADD COLUMN victoria_picks_week_offset integer NOT NULL DEFAULT 0,
  ADD COLUMN victoria_picks_last_week_key text;

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
