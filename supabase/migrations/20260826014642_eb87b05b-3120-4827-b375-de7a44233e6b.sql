-- 1. Map a human-readable price ID to a membership tier rank.
CREATE OR REPLACE FUNCTION public.plan_tier_rank(_price_id text)
RETURNS integer
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE
    WHEN _price_id IS NULL THEN 0
    WHEN _price_id LIKE 'empire_vip%' THEN 3
    WHEN _price_id LIKE 'empire_elite%' THEN 2
    WHEN _price_id LIKE 'empire_%' THEN 1
    ELSE 0
  END;
$$;

CREATE OR REPLACE FUNCTION public.tier_name(_rank integer)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE _rank WHEN 3 THEN 'vip' WHEN 2 THEN 'elite' WHEN 1 THEN 'member' ELSE 'free' END;
$$;

-- 2. Environment-scoped membership rank. Cancelled members keep access
--    until the end of the period they already paid for.
CREATE OR REPLACE FUNCTION public.membership_rank(user_uuid uuid, check_env text)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(MAX(public.plan_tier_rank(price_id)), 0)
  FROM public.subscriptions
  WHERE user_id = user_uuid
    AND environment = check_env
    AND (
      (status IN ('active', 'trialing', 'past_due')
        AND (current_period_end IS NULL OR current_period_end > now()))
      OR (status IN ('canceled', 'paused') AND current_period_end > now())
    );
$$;

CREATE OR REPLACE FUNCTION public.has_env_membership(user_uuid uuid, check_env text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.membership_rank(user_uuid, check_env) > 0;
$$;

-- 3. Entitlement + metering, both environment-aware and tier-aware.
CREATE OR REPLACE FUNCTION public.my_entitlement(free_limit integer DEFAULT 10, check_env text DEFAULT 'sandbox')
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  rank integer;
  mk text := to_char(now(), 'YYYY-MM');
  used integer;
BEGIN
  IF uid IS NULL THEN
    RETURN jsonb_build_object('member', false, 'tier', 'free', 'rank', 0, 'used', 0, 'limit', free_limit, 'remaining', 0);
  END IF;
  rank := public.membership_rank(uid, check_env);
  SELECT COALESCE(runs, 0) INTO used FROM public.ai_usage WHERE user_id = uid AND month_key = mk;
  used := COALESCE(used, 0);
  RETURN jsonb_build_object(
    'member', rank > 0,
    'tier', public.tier_name(rank),
    'rank', rank,
    'used', used,
    'limit', CASE WHEN rank > 0 THEN null ELSE free_limit END,
    'remaining', CASE WHEN rank > 0 THEN null ELSE GREATEST(free_limit - used, 0) END
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.consume_ai_run(free_limit integer DEFAULT 10, check_env text DEFAULT 'sandbox')
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  rank integer;
  mk text := to_char(now(), 'YYYY-MM');
  used integer;
BEGIN
  IF uid IS NULL THEN
    RETURN jsonb_build_object('allowed', false, 'member', false, 'tier', 'free', 'rank', 0, 'used', 0, 'limit', free_limit);
  END IF;

  rank := public.membership_rank(uid, check_env);
  IF rank > 0 THEN
    RETURN jsonb_build_object('allowed', true, 'member', true, 'tier', public.tier_name(rank), 'rank', rank, 'used', 0, 'limit', null);
  END IF;

  SELECT runs INTO used FROM public.ai_usage WHERE user_id = uid AND month_key = mk;
  used := COALESCE(used, 0);

  IF used >= free_limit THEN
    RETURN jsonb_build_object('allowed', false, 'member', false, 'tier', 'free', 'rank', 0, 'used', used, 'limit', free_limit);
  END IF;

  INSERT INTO public.ai_usage (user_id, month_key, runs, updated_at)
  VALUES (uid, mk, 1, now())
  ON CONFLICT (user_id, month_key)
  DO UPDATE SET runs = public.ai_usage.runs + 1, updated_at = now()
  RETURNING runs INTO used;

  RETURN jsonb_build_object('allowed', true, 'member', false, 'tier', 'free', 'rank', 0, 'used', used, 'limit', free_limit);
END;
$$;

-- 4. Prompts can now be reserved for a higher tier.
ALTER TABLE public.prompts
  ADD COLUMN IF NOT EXISTS min_tier text NOT NULL DEFAULT 'member';

ALTER TABLE public.prompts
  DROP CONSTRAINT IF EXISTS prompts_min_tier_check;
ALTER TABLE public.prompts
  ADD CONSTRAINT prompts_min_tier_check CHECK (min_tier IN ('member', 'elite', 'vip'));

-- Members see the vault at or below their tier; free samples stay public.
DROP POLICY IF EXISTS "Free samples for all, full vault for members" ON public.prompts;
CREATE POLICY "Free samples for all, tiered vault for members"
ON public.prompts FOR SELECT TO authenticated
USING (
  (is_published AND is_free)
  OR (
    is_published
    AND public.membership_rank(auth.uid(), 'sandbox') >= public.plan_tier_rank('empire_' || min_tier)
  )
  OR (
    is_published
    AND public.membership_rank(auth.uid(), 'live') >= public.plan_tier_rank('empire_' || min_tier)
  )
  OR public.has_role(auth.uid(), 'admin'::app_role)
);

-- 5. Execute privileges: signed-in members and server code only.
REVOKE ALL ON FUNCTION public.my_entitlement(integer, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.consume_ai_run(integer, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.membership_rank(uuid, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.has_env_membership(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_entitlement(integer, text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.consume_ai_run(integer, text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.membership_rank(uuid, text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_env_membership(uuid, text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.plan_tier_rank(text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.tier_name(integer) TO authenticated, service_role;