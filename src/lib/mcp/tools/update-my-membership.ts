import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "update_my_membership",
  title: "Update my membership name",
  description: "Update the display name on the signed-in member's Her Empire Era profile.",
  inputSchema: {
    full_name: z.string().trim().min(1).max(120).describe("The member's display name."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ full_name }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("profiles")
      .update({ full_name })
      .eq("id", ctx.getUserId()!)
      .select("id, full_name")
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data) {
      return { content: [{ type: "text", text: "No membership profile found to update." }], isError: true };
    }
    return {
      content: [{ type: "text", text: `Updated name to ${data.full_name}` }],
      structuredContent: { profile: { full_name: data.full_name } },
    };
  },
});