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
const QUARTERS = [C.coral, C.yellow, C.cyan, C.violet];
const R = 110;

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Four quarter-circles fly in and lock into a single logo mark.
  const assemble = spring({ frame, fps, config: { damping: 13, stiffness: 90 } });
  const logoSpin = interpolate(frame, [0, 40], [-180, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const slide = interpolate(frame, [18, 34], [0, -365], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.ink,
        fontFamily: FONT,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: R * 2,
          height: R * 2,
          transform: `translateX(${slide}px) rotate(${logoSpin}deg)`,
        }}
      >
        {QUARTERS.map((col, i) => {
          const dx = i === 0 || i === 3 ? -1 : 1;
          const dy = i < 2 ? -1 : 1;
          const off = (1 - assemble) * 400;
          const radius = [`${R}px 0 0 0`, `0 ${R}px 0 0`, `0 0 ${R}px 0`, `0 0 0 ${R}px`][i];
          return (
            <div
              key={col}
              style={{
                position: "absolute",
                width: R,
                height: R,
                left: dx < 0 ? 0 : R,
                top: dy < 0 ? 0 : R,
                backgroundColor: col,
                borderRadius: radius,
                transform: `translate(${dx * off}px, ${dy * off}px)`,
              }}
            />
          );
        })}
      </div>

      <div style={{ position: "absolute", left: 960 - 365 + R + 80, color: C.cream }}>
        <MaskedText
          text="Claude"
          delay={24}
          style={{ fontSize: 170, fontWeight: 900, letterSpacing: -6 }}
        />
        <MaskedText
          text="Motion Designer"
          delay={30}
          stagger={1}
          style={{ fontSize: 56, fontWeight: 400, color: C.yellow, marginTop: 6 }}
        />
        <div
          style={{
            marginTop: 30,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 8,
            opacity: interpolate(frame, [40, 50], [0, 0.7], clamp),
          }}
        >
          SHOWREEL 2026 — AVAILABLE FOR HIRE
        </div>
      </div>
    </AbsoluteFill>
  );
};
