import { FC, useEffect } from "react";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { BackgroundOption } from "../models/backgroundOption";
import { Logo } from "../components/Logo";
import { HeadNav } from "../navigation/HeadNav";
import { ClassicButton } from "../components/ClassicButton";
import { BackgroundCredit } from "../components/BackgroundCredit";

export const Home: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.PRIMARY);
  }, [backgroundImageControl]);

  return (
    <div>
      <HeadNav />
      <div className="mb-5 mt-3 mt-sm-none">
        <Logo />
      </div>
      <div className="text-center">
        <ClassicButton
          icon="bi-file-play"
          label={"Play"}
          to={"/playingOptions"}
        />
        <br />
        <ClassicButton
          icon="bi-person-circle"
          label={"Profile"}
          to={"/profile"}
        />
      </div>
      <BackgroundCredit artistName="pixaguck" />
    </div>
  );
};
