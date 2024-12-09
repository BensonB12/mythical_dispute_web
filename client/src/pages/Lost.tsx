import { FC, useEffect } from "react";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { HeadNav } from "../navigation/HeadNav";
import { BackgroundOption } from "../models/backgroundOption";
import { BackgroundCredit } from "../components/BackgroundCredit";
import shadow from "./../styles/shadows.module.scss";

export const Lost: FC<{ backgroundImageControl: BackgroundImageControl }> = ({
  backgroundImageControl,
}) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.LOST);
  }, [backgroundImageControl]);

  return (
    <div>
      <div className="bg-lightest">
        <HeadNav />
      </div>
      <div className={`${shadow.light} text-center m-3`}>
        This page does not exist, please go back home
      </div>
      <BackgroundCredit artistName="pixaguck" />
    </div>
  );
};
