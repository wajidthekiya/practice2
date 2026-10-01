import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const BARS = [0.45, 0.7, 0.55, 0.9, 0.65, 1, 0.8];
const PARTICLES = 70;

export const Data: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const count = Math.round(
    interpolate(frame, [5, 45], [0, 60], { ...clamp, easing: Easing.out(Easing.cubic) }),
  );
  const burst = interpolate(frame, [40, 75], [0, 1], { ...clamp, easing: Easing.out(Easing.exp) });

  return (
    <AbsoluteFill style={{ backgroundColor: C.violet, fontFamily: FONT, overflow: "hidden" }}>
      {/* Particle burst from the counter once it lands */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {new Array(PARTICLES).fill(0).map((_, i) => {
          const angle = random(`a${i}`) * Math.PI * 2;
          const dist = 300 + random(`d${i}`) * 900;
          const size = 8 + random(`s${i}`) * 26;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "30%",
                width: size,
                height: size,
                borderRadius: i % 4 === 0 ? 4 : "50%",
                backgroundColor: [C.yellow, C.cream, C.mint, C.coral][i % 4],
                transform: `translate(${Math.cos(angle) * dist * burst}px, ${Math.sin(angle) * dist * burst}px) scale(${burst > 0 ? 1 - burst * 0.6 : 0})`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          left: 140,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: C.cream,
        }}
      >
        <div style={{ fontSize: 340, fontWeight: 900, lineHeight: 0.9, letterSpacing: -12, fontVariantNumeric: "tabular-nums" }}>
          {count}
        </div>
        <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: 10, marginTop: 20 }}>
          FRAMES / SECOND
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 400,
            marginTop: 30,
            opacity: interpolate(frame, [35, 50], [0, 1], clamp),
            transform: `translateY(${interpolate(frame, [35, 50], [30, 0], clamp)}px)`,
          }}
        >
          Every one of them considered.
        </div>
      </div>

      {/* Bar chart grows with staggered springs */}
      <div
        style={{
          position: "absolute",
          right: 140,
          bottom: 180,
          height: 640,
          display: "flex",
          alignItems: "flex-end",
          gap: 28,
        }}
      >
        {BARS.map((h, i) => {
          const grow = spring({ frame: frame - 8 - i * 4, fps, config: { damping: 11 } });
          return (
            <div
              key={i}
              style={{
                width: 70,
                height: 640 * h * grow,
                borderRadius: "14px 14px 0 0",
                backgroundColor: i === 5 ? C.yellow : "rgba(244,239,230,0.85)",
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          right: 140,
          bottom: 172,
          width: 658,
          height: 4,
          backgroundColor: C.cream,
          transform: `scaleX(${interpolate(frame, [0, 20], [0, 1], clamp)})`,
          transformOrigin: "left",
        }}
      />
    </AbsoluteFill>
  );
};
