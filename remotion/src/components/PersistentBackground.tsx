import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../brand";

/**
 * Persistent ambient background: warm near-black with a slow drifting gold glow
 * and a faint vignette. Spans the full video behind every scene.
 */
export const PersistentBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Two soft gold orbs drifting slowly in opposite directions.
  const orbAX = interpolate(frame, [0, 570], [-8, 8], { extrapolateRight: "clamp" });
  const orbBY = interpolate(frame, [0, 570], [6, -6], { extrapolateRight: "clamp" });
  const pulse = 0.5 + 0.5 * Math.sin((frame / 570) * Math.PI * 2);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, ${COLORS.background} 0%, ${COLORS.backgroundDeep} 75%)`,
      }}
    >
      {/* Drifting gold orb A — top left */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: `${42 + orbAX}%`,
          width: 760,
          height: 760,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(212,175,55,${0.10 + 0.04 * pulse}) 0%, transparent 65%)`,
          filter: "blur(20px)",
        }}
      />
      {/* Drifting blush orb B — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          right: `${44 - orbBY}%`,
          width: 620,
          height: 620,
          transform: "translate(50%, 50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(217,181,168,${0.07 + 0.03 * (1 - pulse)}) 0%, transparent 65%)`,
          filter: "blur(24px)",
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
