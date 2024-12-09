import { FC, useEffect } from "react";
import { ClassicButton } from "../components/ClassicButton";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { BackgroundOption } from "../models/backgroundOption";
import { BackgroundCredit } from "../components/BackgroundCredit";

export const PlayingOptions: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.PRIMARY);
  }, [backgroundImageControl]);

  return (
    <div className="text-center mt-5 pt-5">
      <div className="mt-5">
        <ClassicButton
          icon="bi-file-arrow-down"
          label={"Host Game"}
          to="/hostGame"
        />
        <br />
        <ClassicButton
          icon="bi-arrow-return-right"
          label={"Join Game"}
          to="/joinGame"
        />
      </div>
      <BackgroundCredit artistName="pixaguck" />
    </div>
  );
};
