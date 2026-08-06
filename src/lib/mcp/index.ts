import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getMyMembership from "./tools/get-my-membership";
import updateMyMembership from "./tools/update-my-membership";

// The OAuth issuer must be the direct Supabase host; the project ref is the only
// value that survives publish unchanged, and Vite inlines it at build time.
const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "empire-builder-access",
  title: "Empire Builder Access",
  version: "0.1.0",
  instructions:
    "Tools for Her Empire Era membership (Empire Builder Access). Use `get_my_membership` to read the signed-in member's profile and `update_my_membership` to change their display name.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getMyMembership, updateMyMembership],
});