import { linearTiming, springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Data } from "./Data";
import { Intro } from "./Intro";
import { Kinetic } from "./Kinetic";
import { Outro } from "./Outro";
import { Shapes } from "./Shapes";
import { Tunnel } from "./Tunnel";

// 6 scenes (510 frames) minus 5 transitions × 12 frames = 450 frames = 15s @ 30fps.
const T = 12;
const quick = springTiming({ config: { damping: 200 }, durationInFrames: T });

export const SHOWREEL_DURATION = 450;

export const Showreel: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <Intro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={quick} />
      <TransitionSeries.Sequence durationInFrames={90}>
        <Shapes />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={quick} />
      <TransitionSeries.Sequence durationInFrames={90}>
        <Kinetic />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-top-right" })} timing={quick} />
      <TransitionSeries.Sequence durationInFrames={90}>
        <Tunnel />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={quick} />
      <TransitionSeries.Sequence durationInFrames={75}>
        <Data />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={75}>
        <Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
