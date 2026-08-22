import { loadFont as loadCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadJost } from "@remotion/google-fonts/Jost";

const { fontFamily: cormorant } = loadCormorant("normal", {
  weights: ["300", "400", "500", "600"],
  subsets: ["latin"],
});
const { fontFamily: jost } = loadJost("normal", {
  weights: ["300", "400", "500"],
  subsets: ["latin"],
});

export const FONT_DISPLAY = cormorant;
export const FONT_BODY = jost;

// Brand palette — warm near-black, gold, cream, blush.
export const COLORS = {
  background: "#1A1612",
  backgroundDeep: "#131009",
  card: "#241F1A",
  cardBorder: "rgba(212, 175, 55, 0.22)",
  gold: "#D4AF37",
  goldLight: "#E8C76A",
  goldDeep: "#B8902F",
  cream: "#F2EDE3",
  blush: "#D9B5A8",
  blushSoft: "#E8C9BE",
  muted: "#B8A89A",
  userBubble: "rgba(217, 181, 168, 0.16)",
  userBubbleBorder: "rgba(217, 181, 168, 0.40)",
  vicBubble: "rgba(212, 175, 55, 0.07)",
  vicBubbleBorder: "rgba(212, 175, 55, 0.35)",
};

export const GOLD_GRADIENT = `linear-gradient(100deg, ${COLORS.goldDeep}, ${COLORS.goldLight}, ${COLORS.gold})`;
