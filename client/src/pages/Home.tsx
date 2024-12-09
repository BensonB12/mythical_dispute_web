import { FC } from "react";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { BackgroundOption } from "../models/backgroundOption";

export const Home: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  backgroundImageControl.setValue(BackgroundOption.PRIMARY);
  return <div>This is the main page</div>;
};
