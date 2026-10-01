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

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // A coral disc bursts open then collapses to reveal the title.
  const burst = spring({ frame, fps, config: { damping: 12 } });
  const collapse = interpolate(frame, [18, 34], [1, 0], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const discSize = burst * collapse * 2600;

  const lineDraw = interpolate(frame, [0, 40], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.quad),
  });

  const label = "CLAUDE  ·  MOTION DESIGN  ·  2026";
  const typed = Math.floor(interpolate(frame, [40, 70], [0, label.length], clamp));
  const underline = interpolate(frame, [34, 60], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, fontFamily: FONT }}>
      {/* Grid lines drawing in from the centre */}
      <svg width={width} height={height} style={{ position: "absolute" }}>
        {new Array(13).fill(0).map((_, i) => {
          const x = (i / 12) * width;
          return (
            <line
              key={`v${i}`}
              x1={x}
              x2={x}
              y1={height / 2 - (height / 2) * lineDraw}
              y2={height / 2 + (height / 2) * lineDraw}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth={2}
            />
          );
        })}
        {new Array(7).fill(0).map((_, i) => {
          const y = (i / 6) * height;
          return (
            <line
              key={`h${i}`}
              y1={y}
              y2={y}
              x1={width / 2 - (width / 2) * lineDraw}
              x2={width / 2 + (width / 2) * lineDraw}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth={2}
            />
          );
        })}
      </svg>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            position: "absolute",
            width: discSize,
            height: discSize,
            borderRadius: "50%",
            backgroundColor: C.coral,
          }}
        />
        <MaskedText
          text="SHOWREEL"
          delay={28}
          stagger={2}
          style={{ fontSize: 260, fontWeight: 900, color: C.cream, letterSpacing: -8 }}
        />
        <div style={{ display: "flex", gap: 0, width: 1240, height: 14, marginTop: 20 }}>
          {PALETTE.map((col, i) => (
            <div
              key={col}
              style={{
                flex: 1,
                backgroundColor: col,
                transform: `scaleX(${interpolate(underline, [i * 0.12, i * 0.12 + 0.5], [0, 1], clamp)})`,
                transformOrigin: "left",
              }}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 36,
            fontWeight: 600,
            color: C.cream,
            letterSpacing: 8,
            whiteSpace: "pre",
            height: 44,
          }}
        >
          {label.slice(0, typed)}
          <span style={{ opacity: frame % 16 < 8 ? 1 : 0, color: C.coral }}>▍</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
