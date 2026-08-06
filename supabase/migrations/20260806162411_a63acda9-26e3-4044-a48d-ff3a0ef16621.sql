CREATE TABLE public.victoria_pick_notes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  side_hustle_id uuid NOT NULL REFERENCES public.side_hustles(id) ON DELETE CASCADE,
  week_key text NOT NULL,
  note text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, side_hustle_id, week_key)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.victoria_pick_notes TO authenticated;
GRANT ALL ON public.victoria_pick_notes TO service_role;

ALTER TABLE public.victoria_pick_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members manage their own Victoria notes"
ON public.victoria_pick_notes FOR ALL TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER victoria_pick_notes_set_updated_at
BEFORE UPDATE ON public.victoria_pick_notes
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX victoria_pick_notes_user_created_idx ON public.victoria_pick_notes (user_id, created_at DESC);