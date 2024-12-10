import { FC, useEffect } from "react";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { BackgroundOption } from "../models/backgroundOption";
import { HeadNav } from "../navigation/HeadNav";
import { Spinner } from "../components/Spinner/Spinner";

export const ComingSoon: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.PRIMARY);
  }, [backgroundImageControl]);

  return (
    <div>
      <HeadNav />
      <div className="p-5 text-center rounded bg-lightest">
        Sorry! The game part is yet to be. Coming soon
      </div>
      <div>
        <Spinner />
      </div>
    </div>
  );
};
