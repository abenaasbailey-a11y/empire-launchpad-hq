import { useRef, useState } from "react";
import { Play, Pause, RefreshCw } from "lucide-react";
import { GoldRule } from "@/components/landing/Section";

/**
 * Product demo video section.
 * Shows the 22-second Victoria demo video in a luxury-framed player so
 * visitors can quickly understand how Victoria works and why she's valuable.
 */
export function VideoDemoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  function togglePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.muted = true;
      const attempt = el.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => {
          // Fall back to native controls if the browser blocks scripted playback.
          el.controls = true;
          setIsPlaying(false);
        });
      }
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  }


  function handleEnded() {
    setIsPlaying(false);
    const el = videoRef.current;
    if (el) el.currentTime = 0;
  }

  function handleReplay() {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    void el.play();
    setIsPlaying(true);
    setHasStarted(true);
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <GoldRule className="mx-auto" />
      <div className="border-border bg-card/40 shadow-[var(--shadow-lux)] relative mt-8 overflow-hidden rounded-3xl border backdrop-blur-sm">
        {/* Video */}
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster="/og-image.jpg"
            preload="metadata"
            playsInline
            onEnded={handleEnded}
            onClick={togglePlay}
          >
            <source src="/victoria-demo.mp4" type="video/mp4" />
          </video>

          {/* Play overlay */}
          {!isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              className="group absolute inset-0 flex items-center justify-center bg-black/35 transition-colors hover:bg-black/20"
              aria-label={hasStarted ? "Play demo video" : "Play the Victoria demo video"}
            >
              <span className="bg-gold/90 text-primary-foreground group-hover:bg-gold flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-105 md:h-20 md:w-20">
                <Play className="ml-1 h-7 w-7 fill-current md:h-8 md:w-8" />
              </span>
            </button>
          )}

          {/* Pause indicator while playing */}
          {isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/70"
              aria-label="Pause demo video"
            >
              <Pause className="h-4 w-4 fill-current" />
            </button>
          )}
        </div>

        {/* Caption bar */}
        <div className="border-border flex items-center justify-between gap-3 border-t px-5 py-4 md:px-7">
          <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
            {hasStarted ? "Victoria demo · 22s" : "Watch a 22-second demo"}
          </p>
          {hasStarted && (
            <button
              type="button"
              onClick={handleReplay}
              className="text-muted-foreground hover:text-gold flex items-center gap-1.5 text-[0.65rem] tracking-[0.16em] uppercase transition-colors"
              aria-label="Replay demo video"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Replay
            </button>
          )}
        </div>
      </div>

      <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed">
        From a viral reel to a priced offer — see how Victoria turns a single
        message into done work, in your voice, in minutes.
      </p>
    </div>
  );
}
