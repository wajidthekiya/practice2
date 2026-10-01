import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const helloWorldSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  color: zColor(),
});

export const HelloWorld: React.FC<z.infer<typeof helloWorldSchema>> = ({
  title,
  subtitle,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 200 } });
  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
        opacity: fadeOut,
      }}
    >
      <h1
        style={{
          fontSize: 120,
          fontWeight: "bold",
          color,
          margin: 0,
          transform: `scale(${titleScale})`,
        }}
      >
        {title}
      </h1>
      <p style={{ fontSize: 48, color: "#555", opacity: subtitleOpacity }}>
        {subtitle}
      </p>
    </AbsoluteFill>
  );
};
