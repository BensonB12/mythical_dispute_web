import { FC, useEffect } from "react";
import { BackgroundImageControl } from "../../controls/useBackgroundImageControl";
import { BackgroundOption } from "../../models/backgroundOption";
import { HeadNav } from "../../navigation/HeadNav";

export const Settings: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.NONE);
  }, [backgroundImageControl]);

  return (
    <div className="h-100 bg-lightest">
      <HeadNav />
    </div>
  );
};
