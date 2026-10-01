import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT } from "./theme";

const WORDS = ["MOVE", "WITH", "PURPOSE."];
const WORD_LEN = 22;

const Marquee: React.FC<{ y: number; speed: number; text: string }> = ({ y, speed, text }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 0,
        whiteSpace: "nowrap",
        fontSize: 140,
        fontWeight: 900,
        color: "transparent",
        WebkitTextStroke: "2px rgba(14,14,18,0.25)",
        transform: `translateX(${-800 + frame * speed}px)`,
      }}
    >
      {new Array(8).fill(text).join("  ")}
    </div>
  );
};

export const Kinetic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const idx = Math.min(WORDS.length - 1, Math.floor(frame / WORD_LEN));
  const local = frame - idx * WORD_LEN;
  const pop = spring({ frame: local, fps, config: { damping: 10, stiffness: 200 } });
  const isLast = idx === WORDS.length - 1;
  const lastSlam = isLast
    ? interpolate(local, [0, 6], [1.6, 1], { extrapolateRight: "clamp" })
    : 1;

  // Each word gets a different background flash.
  const bg = [C.coral, C.yellow, C.ink][idx];
  const fg = [C.ink, C.ink, C.coral][idx];

  const shake = isLast && local < 8 ? Math.sin(local * 3) * (8 - local) * 2 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: bg, fontFamily: FONT, overflow: "hidden" }}>
      <Marquee y={60} speed={9} text="KINETIC TYPE" />
      <Marquee y={430} speed={-7} text="RHYTHM TIMING EASING" />
      <Marquee y={800} speed={11} text="KINETIC TYPE" />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `translate(${shake}px, ${-shake}px)`,
        }}
      >
        <div
          style={{
            fontSize: isLast ? 280 : 360,
            fontWeight: 900,
            color: fg,
            letterSpacing: -10,
            transform: `scale(${pop * lastSlam}) skewX(${(1 - pop) * -20}deg)`,
          }}
        >
          {WORDS[idx]}
        </div>
      </AbsoluteFill>
      {/* Progress ticks */}
      <div style={{ position: "absolute", bottom: 70, left: 100, display: "flex", gap: 16 }}>
        {WORDS.map((w, i) => (
          <div
            key={w}
            style={{
              width: i === idx ? 90 : 30,
              height: 10,
              borderRadius: 5,
              backgroundColor: fg,
              opacity: i <= idx ? 1 : 0.3,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
