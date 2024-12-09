import { FC, useEffect } from "react";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { LoginButton } from "../features/auth/LoginButton";
import { BackgroundOption } from "../models/backgroundOption";

export const Profile: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.PRIMARY);
  }, [backgroundImageControl]);

  return (
    <div>
      <LoginButton />
    </div>
  );
};
