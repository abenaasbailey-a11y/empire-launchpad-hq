import { AbsoluteFill, useCurrentFrame, interpolate, spring, Img, staticFile } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_BODY } from "../brand";

/**
 * Scene 1 — Brand open.
 * Crown mark shimmers in, wordmark reveals, tagline settles.
 */
export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  const crownScale = spring({ frame, fps: 30, config: { damping: 18, stiffness: 120 } });
  const crownOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const wordmarkOpacity = interpolate(frame, [16, 40], [0, 1], { extrapolateRight: "clamp" });
  const wordmarkY = interpolate(frame, [16, 40], [14, 0], { extrapolateRight: "clamp" });

  const taglineOpacity = interpolate(frame, [40, 62], [0, 1], { extrapolateRight: "clamp" });
  const taglineSpacing = interpolate(frame, [40, 62], [0.5, 0.34], { extrapolateRight: "clamp" });

  // Shimmer sweep across the crown.
  const shine = interpolate(frame, [10, 48], [0, 1], { extrapolateRight: "clamp" });

  const ruleScale = interpolate(frame, [52, 72], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {/* Crown */}
      <div
        style={{
          opacity: crownOpacity,
          transform: `scale(${crownScale})`,
          filter: `drop-shadow(0 0 30px rgba(212,175,55,${0.35 + 0.2 * Math.sin(shine * Math.PI)}))`,
        }}
      >
        <Img src={staticFile("images/crown-mark.png")} style={{ width: 220, height: 220 }} />
      </div>

      {/* Wordmark */}
      <h1
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 300,
          fontSize: 92,
          letterSpacing: "0.04em",
          marginTop: 36,
          opacity: wordmarkOpacity,
          transform: `translateY(${wordmarkY}px)`,
        }}
      >
        <span style={{ color: COLORS.cream }}>HER EMPIRE </span>
        <span style={{ color: COLORS.gold, fontWeight: 500 }}>ERA</span>
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 400,
          fontSize: 24,
          letterSpacing: `${taglineSpacing}em`,
          textTransform: "uppercase",
          color: COLORS.blush,
          marginTop: 28,
          opacity: taglineOpacity,
        }}
      >
        Your empire starts with a prompt
      </p>

      {/* Gold rule */}
      <div
        style={{
          width: 120,
          height: 2,
          marginTop: 40,
          background: COLORS.gold,
          opacity: 0.85,
          transform: `scaleX(${ruleScale})`,
        }}
      />
    </AbsoluteFill>
  );
};
