import { AbsoluteFill, useCurrentFrame, interpolate, spring, Img, staticFile } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_BODY } from "../brand";

/**
 * Scene 5 — Close.
 * Crown + "Start free" message + domain. A resolved, confident ending.
 */
export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();

  const crownScale = spring({ frame, fps: 30, config: { damping: 16, stiffness: 110 } });
  const crownOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });

  const msgOpacity = interpolate(frame, [12, 32], [0, 1], { extrapolateRight: "clamp" });
  const msgY = interpolate(frame, [12, 32], [16, 0], { extrapolateRight: "clamp" });

  const urlOpacity = interpolate(frame, [28, 44], [0, 1], { extrapolateRight: "clamp" });

  const ruleScale = interpolate(frame, [34, 52], [0, 1], { extrapolateRight: "clamp" });

  // Gentle continuous glow on the crown.
  const glow = 0.4 + 0.2 * Math.sin(frame / 10);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          opacity: crownOpacity,
          transform: `scale(${crownScale})`,
          filter: `drop-shadow(0 0 28px rgba(212,175,55,${glow}))`,
        }}
      >
        <Img src={staticFile("images/crown-mark.png")} style={{ width: 150, height: 150 }} />
      </div>

      <h2
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 300,
          fontSize: 72,
          color: COLORS.cream,
          marginTop: 32,
          opacity: msgOpacity,
          transform: `translateY(${msgY}px)`,
          textAlign: "center",
        }}
      >
        Start free at{" "}
        <span style={{ color: COLORS.gold, fontStyle: "italic" }}>yourempireconcierge.com</span>
      </h2>

      <div
        style={{
          width: 100,
          height: 2,
          marginTop: 36,
          background: COLORS.gold,
          opacity: 0.8,
          transform: `scaleX(${ruleScale})`,
        }}
      />

      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: 22,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: COLORS.blush,
          marginTop: 28,
          opacity: urlOpacity,
        }}
      >
        Your era starts now
      </p>
    </AbsoluteFill>
  );
};
