CREATE TABLE public.prompts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  body text NOT NULL,
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  copy_count integer NOT NULL DEFAULT 0,
  save_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.prompts TO authenticated;
GRANT ALL ON public.prompts TO service_role;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can read published prompts"
  ON public.prompts FOR SELECT TO authenticated
  USING (is_published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can add prompts"
  ON public.prompts FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can edit prompts"
  ON public.prompts FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete prompts"
  ON public.prompts FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER prompts_set_updated_at
  BEFORE UPDATE ON public.prompts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.prompt_favorites (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id uuid NOT NULL REFERENCES public.prompts(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, prompt_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.prompt_favorites TO authenticated;
GRANT ALL ON public.prompt_favorites TO service_role;
ALTER TABLE public.prompt_favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members manage their own prompt favourites"
  ON public.prompt_favorites FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.prompt_usage (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id uuid NOT NULL REFERENCES public.prompts(id) ON DELETE CASCADE,
  action text NOT NULL DEFAULT 'copy',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX prompt_usage_user_created_idx ON public.prompt_usage (user_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.prompt_usage TO authenticated;
GRANT ALL ON public.prompt_usage TO service_role;
ALTER TABLE public.prompt_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members manage their own prompt history"
  ON public.prompt_usage FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.sync_prompt_save_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.prompts SET save_count = save_count + 1 WHERE id = NEW.prompt_id;
    RETURN NEW;
  ELSE
    UPDATE public.prompts SET save_count = GREATEST(save_count - 1, 0) WHERE id = OLD.prompt_id;
    RETURN OLD;
  END IF;
END;
$$;

CREATE TRIGGER prompt_favorites_count
  AFTER INSERT OR DELETE ON public.prompt_favorites
  FOR EACH ROW EXECUTE FUNCTION public.sync_prompt_save_count();

CREATE OR REPLACE FUNCTION public.sync_prompt_copy_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.action = 'copy' THEN
    UPDATE public.prompts SET copy_count = copy_count + 1 WHERE id = NEW.prompt_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER prompt_usage_count
  AFTER INSERT ON public.prompt_usage
  FOR EACH ROW EXECUTE FUNCTION public.sync_prompt_copy_count();