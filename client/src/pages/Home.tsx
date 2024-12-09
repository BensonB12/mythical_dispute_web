import { FC } from "react";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { BackgroundOption } from "../models/backgroundOption";
import { Logo } from "../components/Logo";
import { HeadNav } from "../navigation/HeadNav";
import { ClassicButton } from "../components/ClassicButton";
import { BackgroundCredit } from "../components/BackgroundCredit";

export const Home: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  backgroundImageControl.setValue(BackgroundOption.PRIMARY);
  return (
    <div>
      <HeadNav />
      <div className="mb-5">
        <Logo />
      </div>
      <div className="text-center">
        <ClassicButton icon="bi-play-btn-fill" label={"Play"} />
        <br />
        <ClassicButton icon="bi-person-circle" label={"Profile"} />
      </div>
      <BackgroundCredit artistName="pixaguck" />
    </div>
  );
};
