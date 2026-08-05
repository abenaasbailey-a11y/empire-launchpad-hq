import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Returns whether the signed-in member has the `admin` role.
 * The role lives in the `user_roles` table and is checked through the
 * `has_role` security-definer function, so it cannot be faked from the browser.
 */
export function useIsAdmin() {
  const { data, isLoading } = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return false;
      const { data: isAdmin, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (error) return false;
      return Boolean(isAdmin);
    },
    staleTime: 60_000,
  });

  return { isAdmin: data === true, isLoading };
}
