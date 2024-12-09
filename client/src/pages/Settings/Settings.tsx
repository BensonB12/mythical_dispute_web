import { FC } from "react";
import { BackgroundImageControl } from "../../controls/useBackgroundImageControl";
import { BackgroundOption } from "../../models/backgroundOption";
import { HeadNav } from "../../navigation/HeadNav";

export const Settings: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  backgroundImageControl.setValue(BackgroundOption.NONE);
  return (
    <div className="h-100 bg-lightest">
      <HeadNav />
    </div>
  );
};
