import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MaskedText } from "./MaskedText";
import { C, FONT } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SIZE = 220;

const shapes: { color: string; style: React.CSSProperties }[] = [
  { color: C.coral, style: { borderRadius: "50%" } },
  { color: C.violet, style: { borderRadius: 24 } },
  { color: C.yellow, style: { clipPath: "polygon(50% 0, 100% 100%, 0 100%)" } },
  { color: C.cyan, style: { borderRadius: "50%", background: "transparent", border: `48px solid ${C.cyan}` } },
  { color: C.ink, style: { borderRadius: SIZE, height: SIZE / 2.2 } },
];

export const Shapes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 2: the row collapses into an orbit around the centre.
  const orbit = interpolate(frame, [42, 70], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const spin = interpolate(frame, [42, 100], [0, Math.PI * 1.2], {
    ...clamp,
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.cream, fontFamily: FONT }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {shapes.map((s, i) => {
          const enter = spring({
            frame: frame - i * 4,
            fps,
            config: { damping: 9, stiffness: 120 },
          });
          const rowX = (i - 2) * 300;
          const angle = (i / shapes.length) * Math.PI * 2 + spin;
          const orbitX = Math.cos(angle) * 330;
          const orbitY = Math.sin(angle) * 330;
          const x = interpolate(orbit, [0, 1], [rowX, orbitX]);
          const y = interpolate(orbit, [0, 1], [(1 - enter) * 700, orbitY]);
          const rotation = interpolate(frame, [0, 90], [0, 180]) * (i % 2 ? 1 : -1);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: SIZE,
                height: SIZE,
                backgroundColor: s.color,
                transform: `translate(${x}px, ${y}px) rotate(${rotation * orbit}deg) scale(${interpolate(enter, [0, 1], [0.3, 1])})`,
                boxSizing: "border-box",
                ...s.style,
              }}
            />
          );
        })}
        {/* Centre dot pops once the orbit forms */}
        <div
          style={{
            position: "absolute",
            width: 90,
            height: 90,
            borderRadius: "50%",
            backgroundColor: C.coral,
            transform: `scale(${spring({ frame: frame - 62, fps, config: { damping: 8 } })})`,
          }}
        />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 100, bottom: 70 }}>
        <MaskedText
          text="Shape."
          delay={50}
          style={{ fontSize: 150, fontWeight: 900, color: C.ink, letterSpacing: -4 }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: 100,
          top: 80,
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: 6,
          color: C.ink,
          opacity: interpolate(frame, [10, 25], [0, 1], clamp),
        }}
      >
        01 / GEOMETRY
      </div>
    </AbsoluteFill>
  );
};
