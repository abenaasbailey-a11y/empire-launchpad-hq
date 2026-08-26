GRANT SELECT ON public.prompts TO anon;

CREATE POLICY "Anonymous visitors can view free published prompts"
ON public.prompts
FOR SELECT
TO anon
USING (is_published AND is_free);