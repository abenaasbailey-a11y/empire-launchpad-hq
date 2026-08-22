REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.sync_prompt_save_count() FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.sync_prompt_copy_count() FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM anon;