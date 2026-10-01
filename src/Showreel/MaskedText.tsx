import { spring, useCurrentFrame, useVideoConfig } from "remotion";

// Letters rise into view from behind a mask, one after another.
export const MaskedText: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, stagger = 2, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", ...style }}>
      {text.split("").map((char, i) => {
        const p = spring({
          frame: frame - delay - i * stagger,
          fps,
          config: { damping: 14, stiffness: 160 },
        });
        return (
          <span
            key={i}
            style={{ display: "inline-block", overflow: "hidden", lineHeight: 1 }}
          >
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${(1 - p) * 110}%) rotate(${(1 - p) * 12}deg)`,
                whiteSpace: "pre",
              }}
            >
              {char}
            </span>
          </span>
        );
      })}
    </div>
  );
};
