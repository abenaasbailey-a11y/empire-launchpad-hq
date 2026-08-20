-- Allow anonymous visitors to insert their email into the lead capture form.
-- Email leads are public (no auth), but only admins can read them back.
GRANT INSERT ON public.email_leads TO anon;

CREATE POLICY "Anyone can submit their email"
  ON public.email_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);