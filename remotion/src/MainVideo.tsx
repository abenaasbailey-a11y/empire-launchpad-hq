import { AbsoluteFill, Series } from "remotion";
import { PersistentBackground } from "./components/PersistentBackground";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "./brand";

/**
 * MainVideo — the full product demo.
 *
 * Timeline (660 frames = 22s @ 30fps):
 *   0–110   Scene 1  Brand open (crown + wordmark + tagline)
 * 110–240   Scene 2  Victoria intro
 * 240–490   Scene 3  Chat demo (live conversation)
 * 490–600   Scene 4  Capabilities grid
 * 600–660   Scene 5  Close (crown + domain)
 *
 * Each scene fades in/out against the persistent ambient background.
 */
export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Soft global fade at the very start and end.
  const globalOpacity = interpolate(
    frame,
    [0, 6, 654, 660],
    [0, 1, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ background: COLORS.backgroundDeep, opacity: globalOpacity }}>
      <PersistentBackground />
      <Series>
        <Series.Sequence durationInFrames={110}>
          <SceneWrap>
            <Scene1 />
          </SceneWrap>
        </Series.Sequence>
        <Series.Sequence durationInFrames={130}>
          <SceneWrap>
            <Scene2 />
          </SceneWrap>
        </Series.Sequence>
        <Series.Sequence durationInFrames={250}>
          <SceneWrap>
            <Scene3 />
          </SceneWrap>
        </Series.Sequence>
        <Series.Sequence durationInFrames={110}>
          <SceneWrap>
            <Scene4 />
          </SceneWrap>
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <SceneWrap>
            <Scene5 />
          </SceneWrap>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

/**
 * Wraps a scene with a gentle fade in/out so cuts between scenes feel soft
 * without hiding the persistent background.
 */
const SceneWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AbsoluteFill style={{ zIndex: 1 }}>{children}</AbsoluteFill>;
};
