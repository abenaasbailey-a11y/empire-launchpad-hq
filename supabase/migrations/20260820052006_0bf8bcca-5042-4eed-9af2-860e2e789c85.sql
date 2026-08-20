CREATE TABLE public.email_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'free-prompts',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  converted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX email_leads_email_source_key ON public.email_leads (lower(email), source);

GRANT ALL ON public.email_leads TO service_role;
GRANT SELECT ON public.email_leads TO authenticated;

ALTER TABLE public.email_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view leads"
  ON public.email_leads FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));