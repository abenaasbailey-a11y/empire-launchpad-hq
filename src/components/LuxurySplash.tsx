import { useEffect, useState } from "react";
import brandMark from "@/assets/hee-logo.png";

const HOLD_MS = 1600;
const FADE_MS = 600;
const SESSION_KEY = "hee-splash-shown";

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    // iOS Safari
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

/**
 * Branded 2-second opening animation for the installed app:
 * glowing gold crown, gold shimmer sweep, "Her Empire Era" in gold lettering,
 * then a soft fade into the app.
 */
export function LuxurySplash() {
  const [phase, setPhase] = useState<"hidden" | "visible" | "leaving">("hidden");

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).get("splash") === "1";
    if (window.sessionStorage.getItem(SESSION_KEY)) return;
    if (!forced) {
      if (window.self !== window.top) return; // never in preview iframes
      if (!isStandalone()) return; // installed-app experience only
    }
    window.sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("visible");
    const hold = forced ? 12000 : HOLD_MS;
    const leave = window.setTimeout(() => setPhase("leaving"), hold);
    const done = window.setTimeout(() => setPhase("hidden"), hold + FADE_MS);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black"
      style={{
        animation:
          phase === "leaving"
            ? `splash-veil-out ${FADE_MS}ms ease-in forwards`
            : undefined,
        pointerEvents: phase === "leaving" ? "none" : "auto",
      }}
    >
      <div
        className="relative"
        style={{
          animation:
            "splash-crown-in 900ms cubic-bezier(0.22,1,0.36,1) both, splash-crown-glow 2200ms ease-in-out infinite",
        }}
      >
        <img
          src={brandMark}
          alt=""
          width={1024}
          height={1024}
          className="h-44 w-44 object-contain sm:h-56 sm:w-56"
          style={{ animation: "splash-shine 1600ms 400ms ease-in-out" }}
        />
      </div>

      <div
        className="mt-6 h-px w-16 bg-gold/70"
        style={{ animation: "splash-rule-in 700ms 600ms ease-out both" }}
      />

      <p
        className="eyebrow mt-4"
        style={{ animation: "splash-word-in 900ms 800ms ease-out both" }}
      >
        Your Empire Concierge
      </p>
    </div>
  );
}
