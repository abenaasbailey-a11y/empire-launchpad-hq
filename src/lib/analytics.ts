/**
 * Google Analytics (GA4) via gtag.js.
 * The measurement ID comes from the linked Google Analytics connector.
 * Every helper is a no-op when the ID or the browser is unavailable, so the
 * app renders and server-renders normally without analytics configured.
 */
const MEASUREMENT_ID = import.meta.env['VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY'] as
  | string
  | undefined;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === "undefined" || !MEASUREMENT_ID) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  const gtag: Gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, { send_page_view: true });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}

export function trackPageView(path: string) {
  trackEvent("page_view", { page_path: path, page_location: window.location.href });
}

/** Fired whenever a visitor taps any "Start Free" call to action. */
export function trackStartFreeClick(location: string) {
  trackEvent("start_free_click", { cta_location: location });
}

/** Fired once a free membership is actually created. */
export function trackSignup(method: "email" | "google") {
  trackEvent("sign_up", { method });
}
