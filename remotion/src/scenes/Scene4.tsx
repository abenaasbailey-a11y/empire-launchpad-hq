import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_BODY } from "../brand";

const CAPS = [
  { icon: "✦", label: "Price with confidence" },
  { icon: "✎", label: "Content in your voice" },
  { icon: "◈", label: "Grant narratives" },
  { icon: "❖", label: "Launch plans" },
  { icon: "✉", label: "Email & follow-up" },
  { icon: "★", label: "Résumés & bios" },
];

/**
 * Scene 4 — Capabilities grid.
 * Six things Victoria handles, staggered in.
 */
export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();

  const headOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 220px" }}>
      <h2
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 300,
          fontSize: 64,
          textAlign: "center",
          color: COLORS.cream,
          opacity: headOpacity,
          marginBottom: 60,
        }}
      >
        Ask once. <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Watch it get handled.</span>
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 28,
          width: "100%",
          maxWidth: 1180,
        }}
      >
        {CAPS.map((c, i) => {
          const delay = 8 + i * 7;
          const s = spring({ frame: frame - delay, fps: 30, config: { damping: 18, stiffness: 120 } });
          const op = interpolate(frame - delay, [0, 10], [0, 1], { extrapolateRight: "clamp" });
          const y = interpolate(s, [0, 1], [28, 0]);
          return (
            <div
              key={c.label}
              style={{
                opacity: op,
                transform: `translateY(${y}px)`,
                background: COLORS.card,
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: 20,
                padding: "34px 30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 18,
              }}
            >
              <span
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(212,175,55,0.12)",
                  color: COLORS.gold,
                  fontSize: 24,
                }}
              >
                {c.icon}
              </span>
              <span style={{ fontFamily: FONT_BODY, fontSize: 23, fontWeight: 400, color: COLORS.cream }}>
                {c.label}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
