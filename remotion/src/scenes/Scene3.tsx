import { AbsoluteFill, useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_BODY } from "../brand";

type Msg = {
  from: "her" | "v";
  text: string;
  start: number;
  typeWindow: number;
};

const MESSAGES: Msg[] = [
  {
    from: "her",
    text: "Victoria, I have 400 new followers. What do I send them tonight?",
    start: 6,
    typeWindow: 44,
  },
  {
    from: "v",
    text:
      "Here's a 3-touch welcome sequence in your voice: a warm hello, your signature offer, and a soft close. Want it scheduled for 7:30pm when your audience is most active?",
    start: 60,
    typeWindow: 76,
  },
  {
    from: "her",
    text: "Yes. And price my new coaching package.",
    start: 150,
    typeWindow: 30,
  },
  {
    from: "v",
    text:
      "Based on your results, I'd position it at $1,850 with a 3-payment option. The sales page headline is drafted — review inside your dashboard.",
    start: 192,
    typeWindow: 52,
  },
];

const ChatMessage: React.FC<{ msg: Msg; frame: number }> = ({ msg, frame }) => {
  const isUser = msg.from === "her";
  const elapsed = frame - msg.start;

  // Not shown yet.
  if (elapsed < 0) return null;

  // Typing progress.
  const progress = Math.min(1, elapsed / msg.typeWindow);
  const typedLen = Math.floor(progress * msg.text.length);
  const typed = msg.text.slice(0, typedLen);
  const stillTyping = progress < 1 && elapsed >= 0;

  // Entrance spring.
  const enter = spring({ frame: elapsed, fps: 30, config: { damping: 20, stiffness: 140 } });
  const y = interpolate(enter, [0, 1], [16, 0]);
  const opacity = interpolate(elapsed, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          maxWidth: isUser ? 460 : 560,
          background: isUser ? COLORS.userBubble : COLORS.vicBubble,
          border: `1px solid ${isUser ? COLORS.userBubbleBorder : COLORS.vicBubbleBorder}`,
          borderRadius: isUser ? "20px 20px 6px 20px" : "20px 20px 20px 6px",
          padding: "18px 24px",
          fontFamily: FONT_BODY,
          fontSize: 23,
          lineHeight: 1.55,
          color: COLORS.cream,
          backdropFilter: "blur(2px)",
        }}
      >
        {isUser && (
          <div style={{ fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.blush, marginBottom: 6 }}>
            You
          </div>
        )}
        <span>{typed}</span>
        {stillTyping && !isUser && (
          <span style={{ color: COLORS.gold, marginLeft: 2, animation: undefined }}>▍</span>
        )}
      </div>
    </div>
  );
};

/**
 * Scene 3 — Chat demo.
 * A live conversation between a member and Victoria, typed out in real time.
 */
export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(frame, [0, 14], [12, 0], { extrapolateRight: "clamp" });

  // Victoria avatar pulse.
  const pulse = 0.5 + 0.5 * Math.sin(frame / 9);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 220px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 1040,
          background: `linear-gradient(160deg, ${COLORS.card}, rgba(36,31,26,0.7))`,
          border: `1px solid ${COLORS.cardBorder}`,
          borderRadius: 28,
          boxShadow: "0 40px 80px -30px rgba(0,0,0,0.8)",
          overflow: "hidden",
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
        }}
      >
        {/* Chat header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "22px 30px",
            borderBottom: `1px solid ${COLORS.cardBorder}`,
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT_DISPLAY,
              fontSize: 24,
              fontWeight: 500,
              color: COLORS.background,
              background: COLORS.gold,
              boxShadow: `0 0 18px rgba(212,175,55,${0.3 + 0.25 * pulse})`,
            }}
          >
            V
          </div>
          <div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 500, color: COLORS.cream }}>
              Victoria
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6EE7A0", opacity: 0.5 + 0.5 * pulse }} />
              <span style={{ fontFamily: FONT_BODY, fontSize: 15, letterSpacing: "0.14em", textTransform: "uppercase", color: COLORS.muted }}>
                Online · trained on your brand
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22, padding: "30px" }}>
          {MESSAGES.map((m, i) => (
            <ChatMessage key={i} msg={m} frame={frame} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
