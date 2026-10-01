import { Composition } from "remotion";
import { HelloWorld, helloWorldSchema } from "./HelloWorld";
import { Showreel, SHOWREEL_DURATION } from "./Showreel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Showreel"
        component={Showreel}
        durationInFrames={SHOWREEL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={helloWorldSchema}
        defaultProps={{
          title: "Hello, Remotion!",
          subtitle: "Edit src/HelloWorld.tsx to get started",
          color: "#0b84f3",
        }}
      />
    </>
  );
};
