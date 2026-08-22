import { createServerFn } from "@tanstack/react-start";

export const resolvePaddlePrice = createServerFn({ method: "GET" })
  .inputValidator((data: { priceId: string; environment: "sandbox" | "live" }) => data)
  .handler(async ({ data }) => {
    const { paddleFetch } = await import("@/lib/paddle.server");
    const response = await paddleFetch(
      data.environment,
      `/prices?external_id=${encodeURIComponent(data.priceId)}&status=active`,
    );
    const result = (await response.json()) as { data?: Array<{ id: string }> };
    if (!result.data?.length) throw new Error(`Price not found: ${data.priceId}`);
    return result.data[0]!.id;
  });
