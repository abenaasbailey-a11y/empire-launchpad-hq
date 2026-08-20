DELETE FROM public.prompts
WHERE category IN (
  'marketing',
  'social-media',
  'grants-funding',
  'productivity',
  'professional-emails',
  'resumes-career',
  'business-planning'
);