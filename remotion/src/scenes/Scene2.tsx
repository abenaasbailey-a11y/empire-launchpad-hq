import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_BODY } from "../brand";

/**
 * Scene 2 — Victoria intro.
 * Eyebrow + large statement introducing Victoria as the 24/7 concierge.
 */
export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  const eyebrowOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const eyebrowY = interpolate(frame, [0, 18], [10, 0], { extrapolateRight: "clamp" });

  const line1 = spring({ frame: frame - 12, fps: 30, config: { damping: 20, stiffness: 90 } });
  const line1Opacity = interpolate(line1, [0, 1], [0, 1]);
  const line1Y = interpolate(line1, [0, 1], [40, 0]);

  const line2 = spring({ frame: frame - 24, fps: 30, config: { damping: 20, stiffness: 90 } });
  const line2Opacity = interpolate(line2, [0, 1], [0, 1]);
  const line2Y = interpolate(line2, [0, 1], [40, 0]);

  const leadOpacity = interpolate(frame, [42, 62], [0, 1], { extrapolateRight: "clamp" });

  // Pulsing gold dot.
  const dotPulse = 0.5 + 0.5 * Math.sin(frame / 8);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 220px" }}>
      {/* Eyebrow with pulsing dot */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          opacity: eyebrowOpacity,
          transform: `translateY(${eyebrowY}px)`,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: COLORS.gold,
            opacity: 0.6 + 0.4 * dotPulse,
            boxShadow: `0 0 12px rgba(212,175,55,${0.4 + 0.3 * dotPulse})`,
          }}
        />
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 22,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: COLORS.gold,
          }}
        >
          Meet Victoria
        </span>
      </div>

      {/* Headline */}
      <h2
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 300,
          fontSize: 88,
          lineHeight: 1.06,
          marginTop: 36,
          textAlign: "center",
        }}
      >
        <span style={{ color: COLORS.cream, opacity: line1Opacity, display: "block", transform: `translateY(${line1Y}px)` }}>
          Your private AI
        </span>
        <span style={{ color: COLORS.gold, opacity: line2Opacity, display: "block", transform: `translateY(${line2Y}px)`, fontStyle: "italic" }}>
          business concierge.
        </span>
      </h2>

      {/* Lead */}
      <p
        style={{
          fontFamily: FONT_BODY,
          fontWeight: 300,
          fontSize: 30,
          lineHeight: 1.5,
          color: COLORS.muted,
          marginTop: 44,
          textAlign: "center",
          maxWidth: 980,
          opacity: leadOpacity,
        }}
      >
        She learns your goals, voice, and audience — then handles the work that
        usually slows you down. Planning, pricing, content, grants, and the daily
        decisions in between.
      </p>
    </AbsoluteFill>
  );
};
