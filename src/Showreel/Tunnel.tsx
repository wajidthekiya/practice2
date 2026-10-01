import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MaskedText } from "./MaskedText";
import { C, FONT, PALETTE } from "./theme";

const RINGS = 16;

export const Tunnel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = interpolate(frame, [0, 90], [1, 1.5], { easing: Easing.inOut(Easing.sin) });

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, fontFamily: FONT, overflow: "hidden" }}>
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", transform: `scale(${zoom})` }}
      >
        {new Array(RINGS).fill(0).map((_, i) => {
          const enter = spring({ frame: frame - i * 1.5, fps, config: { damping: 15 } });
          const size = 140 + i * 110;
          // Inner rings lead, outer rings follow: a twisting wave.
          const rot = Math.sin((frame - i * 3) / 14) * 45 + frame * 0.8;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: size,
                height: size,
                border: `${i % 3 === 0 ? 8 : 3}px solid ${PALETTE[i % PALETTE.length]}`,
                borderRadius: interpolate(Math.sin(frame / 20 + i / 3), [-1, 1], [0, size / 2]),
                transform: `rotate(${rot}deg) scale(${enter})`,
                opacity: interpolate(i, [0, RINGS - 1], [1, 0.25]),
              }}
            />
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <MaskedText
          text="RHYTHM"
          delay={12}
          stagger={3}
          style={{ fontSize: 130, fontWeight: 900, color: C.cream, letterSpacing: 4 }}
        />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          right: 100,
          top: 80,
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: 6,
          color: C.cream,
        }}
      >
        02 / LOOPS & WAVES
      </div>
    </AbsoluteFill>
  );
};
