import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_my_membership",
  title: "Get my membership",
  description:
    "Read the signed-in member's Her Empire Era membership profile: name, email and join date.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, created_at, updated_at")
      .eq("id", ctx.getUserId()!)
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    const profile = {
      full_name: data?.full_name ?? null,
      email: ctx.getUserEmail() ?? null,
      member_since: data?.created_at ?? null,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(profile) }],
      structuredContent: { profile },
    };
  },
});