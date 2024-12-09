import { FC, useEffect, useState } from "react";
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

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <div className="text-center mt-4">
      <div>
        <ClassicButton icon="bi-phone" label={"Same Device"} to="/sameDevice" />
      </div>

      <div className="row mx-0">
        <div className="col-auto">
          {isOnline ? (
            <i className="h1 bi-wifi" />
          ) : (
            <i className="h1 bi-wifi-off" />
          )}
        </div>
        <div className="col">
          <hr className="border-5 bg-dark" />
        </div>
      </div>

      <div>
        <ClassicButton
          icon="bi-file-arrow-down"
          label={"Host Game"}
          to="/hostGame"
        />
        <br />
        <ClassicButton
          icon="bi-arrow-return-right"
          label={"Join Friend"}
          to="/joinGame"
        />
        <ClassicButton
          icon="bi-shuffle"
          label={"Random Opponent"}
          to="/randomOpponent"
        />
      </div>
      <BackgroundCredit artistName="pixaguck" />
    </div>
  );
};
