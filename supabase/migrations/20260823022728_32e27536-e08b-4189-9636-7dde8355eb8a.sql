-- 1. Membership entitlement helper that works in both payment environments
CREATE OR REPLACE FUNCTION public.has_any_active_subscription(user_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.subscriptions
    WHERE user_id = user_uuid
      AND status IN ('active', 'trialing', 'past_due')
      AND (current_period_end IS NULL OR current_period_end > now())
  );
$$;

REVOKE ALL ON FUNCTION public.has_any_active_subscription(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_any_active_subscription(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_any_active_subscription(uuid) TO authenticated, service_role;

-- 2. Free sample prompts vs member-only vault
ALTER TABLE public.prompts ADD COLUMN IF NOT EXISTS is_free boolean NOT NULL DEFAULT false;

WITH ranked AS (
  SELECT id, row_number() OVER (PARTITION BY category ORDER BY is_featured DESC, sort_order ASC, title ASC) AS rn
  FROM public.prompts
  WHERE is_published
)
UPDATE public.prompts p
SET is_free = true
FROM ranked r
WHERE p.id = r.id AND r.rn = 1;

DROP POLICY IF EXISTS "Members can read published prompts" ON public.prompts;
CREATE POLICY "Free samples for all, full vault for members"
  ON public.prompts FOR SELECT TO authenticated
  USING (
    (is_published AND is_free)
    OR (is_published AND public.has_any_active_subscription(auth.uid()))
    OR public.has_role(auth.uid(), 'admin'::app_role)
  );

-- 3. Metered AI usage for free accounts
CREATE TABLE IF NOT EXISTS public.ai_usage (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  month_key text NOT NULL,
  runs integer NOT NULL DEFAULT 0,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, month_key)
);

GRANT SELECT ON public.ai_usage TO authenticated;
GRANT ALL ON public.ai_usage TO service_role;
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Members can view their own AI usage" ON public.ai_usage;
CREATE POLICY "Members can view their own AI usage"
  ON public.ai_usage FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Consumes one AI run for the caller. Members are unlimited; free accounts are capped per month.
CREATE OR REPLACE FUNCTION public.consume_ai_run(free_limit integer DEFAULT 10)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  is_member boolean;
  mk text := to_char(now(), 'YYYY-MM');
  used integer;
BEGIN
  IF uid IS NULL THEN
    RETURN jsonb_build_object('allowed', false, 'member', false, 'used', 0, 'limit', free_limit);
  END IF;

  is_member := public.has_any_active_subscription(uid);
  IF is_member THEN
    RETURN jsonb_build_object('allowed', true, 'member', true, 'used', 0, 'limit', null);
  END IF;

  SELECT runs INTO used FROM public.ai_usage WHERE user_id = uid AND month_key = mk;
  used := COALESCE(used, 0);

  IF used >= free_limit THEN
    RETURN jsonb_build_object('allowed', false, 'member', false, 'used', used, 'limit', free_limit);
  END IF;

  INSERT INTO public.ai_usage (user_id, month_key, runs, updated_at)
  VALUES (uid, mk, 1, now())
  ON CONFLICT (user_id, month_key)
  DO UPDATE SET runs = public.ai_usage.runs + 1, updated_at = now()
  RETURNING runs INTO used;

  RETURN jsonb_build_object('allowed', true, 'member', false, 'used', used, 'limit', free_limit);
END;
$$;

REVOKE ALL ON FUNCTION public.consume_ai_run(integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.consume_ai_run(integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.consume_ai_run(integer) TO authenticated, service_role;

-- Read-only entitlement summary for the caller.
CREATE OR REPLACE FUNCTION public.my_entitlement(free_limit integer DEFAULT 10)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  is_member boolean;
  mk text := to_char(now(), 'YYYY-MM');
  used integer;
BEGIN
  IF uid IS NULL THEN
    RETURN jsonb_build_object('member', false, 'used', 0, 'limit', free_limit, 'remaining', 0);
  END IF;
  is_member := public.has_any_active_subscription(uid);
  SELECT COALESCE(runs, 0) INTO used FROM public.ai_usage WHERE user_id = uid AND month_key = mk;
  used := COALESCE(used, 0);
  RETURN jsonb_build_object(
    'member', is_member,
    'used', used,
    'limit', CASE WHEN is_member THEN null ELSE free_limit END,
    'remaining', CASE WHEN is_member THEN null ELSE GREATEST(free_limit - used, 0) END
  );
END;
$$;

REVOKE ALL ON FUNCTION public.my_entitlement(integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.my_entitlement(integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.my_entitlement(integer) TO authenticated, service_role;