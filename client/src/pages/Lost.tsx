import { FC } from "react";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { HeadNav } from "../navigation/HeadNav";
import { BackgroundOption } from "../models/backgroundOption";
import { BackgroundCredit } from "../components/BackgroundCredit";
import shadow from "./../styles/shadows.module.scss";

export const Lost: FC<{ backgroundImageControl: BackgroundImageControl }> = ({
  backgroundImageControl,
}) => {
  backgroundImageControl.setValue(BackgroundOption.LOST);
  return (
    <div>
      <HeadNav />
      <div className={`${shadow.light} text-center m-3`}>
        This page does not exist, please go back home
      </div>
      <BackgroundCredit artistName="pixaguck" />
    </div>
  );
};
