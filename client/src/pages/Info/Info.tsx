import { FC, useEffect } from "react";
import { BackgroundImageControl } from "../../controls/useBackgroundImageControl";
import { BackgroundOption } from "../../models/backgroundOption";
import { HeadNav } from "../../navigation/HeadNav";
import { InfoDisplay } from "./InfoDisplay";

export const Info: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.NONE);
  }, [backgroundImageControl]);

  return (
    <div className="bg-lightest h-100">
      <HeadNav />
      <div className="px-3">
        <InfoDisplay
          icon={"bi-question-square"}
          label={"How to Play"}
          information={
            "This is a two player drafting game. The goal is to recruit animals and end with the best values."
          }
        />
        <InfoDisplay
          icon={"bi-sliders2"}
          label={"Strategy Tips"}
          information={
            "While drafting, find out what your opponent is drafting. Are they going heavy into water? What are they passing to you, what are they taking that you passed?"
          }
        />
        <InfoDisplay
          icon={"bi-people"}
          label={"The Creator"}
          information={
            "The original goal for this game was to help a College Student create a mobile app before graduating. The dev is big into MTG, as that is where the drafting pattern came from."
          }
        />
      </div>
    </div>
  );
};
