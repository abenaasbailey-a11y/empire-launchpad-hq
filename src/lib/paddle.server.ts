/**
 * Server-only Paddle helpers. Never import this from client code.
 */

export type PaddleEnv = "sandbox" | "live";

const API_BASE: Record<PaddleEnv, string> = {
  sandbox: "https://sandbox-api.paddle.com",
  live: "https://api.paddle.com",
};

function apiKey(env: PaddleEnv): string {
  const key =
    env === "live" ? process.env["PADDLE_LIVE_API_KEY"] : process.env["PADDLE_SANDBOX_API_KEY"];
  if (!key) throw new Error(`Missing Paddle API key for ${env}`);
  return key;
}

function webhookSecret(env: PaddleEnv): string {
  const secret =
    env === "live"
      ? process.env["PAYMENTS_LIVE_WEBHOOK_SECRET"]
      : process.env["PAYMENTS_SANDBOX_WEBHOOK_SECRET"];
  if (!secret) throw new Error(`Missing Paddle webhook secret for ${env}`);
  return secret;
}

export async function paddleFetch(
  env: PaddleEnv,
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(`${API_BASE[env]}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey(env)}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Paddle API ${response.status}: ${body.slice(0, 300)}`);
  }
  return response;
}

function hexToBytes(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i += 1) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  return out;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}

export type PaddleWebhookEvent = {
  event_type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

/**
 * Verifies the `Paddle-Signature` header (ts + h1 HMAC-SHA256 over `ts:rawBody`)
 * and returns the parsed event. Throws when the signature does not match.
 */
export async function verifyWebhook(
  request: Request,
  env: PaddleEnv,
): Promise<PaddleWebhookEvent> {
  const header = request.headers.get("paddle-signature");
  const rawBody = await request.text();
  if (!header) throw new Error("Missing Paddle-Signature header");

  let ts = "";
  let h1 = "";
  for (const part of header.split(";")) {
    const [k, v] = part.split("=");
    if (k?.trim() === "ts") ts = v?.trim() ?? "";
    if (k?.trim() === "h1") h1 = v?.trim() ?? "";
  }
  if (!ts || !h1) throw new Error("Malformed Paddle-Signature header");

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(webhookSecret(env)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${ts}:${rawBody}`)),
  );

  if (!timingSafeEqual(signature, hexToBytes(h1))) {
    throw new Error("Invalid Paddle webhook signature");
  }

  return JSON.parse(rawBody) as PaddleWebhookEvent;
}
