import { FC, useEffect } from "react";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { BackgroundOption } from "../models/backgroundOption";
import { HeadNav } from "../navigation/HeadNav";
import { LocalStorageService } from "../services/localStorageService";
import { LocalStorageKey } from "../models/localStorageKey";

export const Settings: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.NONE);
  }, [backgroundImageControl]);

  const initSound = LocalStorageService.getPreference(LocalStorageKey.SOUND);
  const initNotification = LocalStorageService.getPreference(
    LocalStorageKey.NOTIFICATIONS
  );

  return (
    <div className="h-100 bg-lightest">
      <HeadNav />
      <div className="row px-3">
        <div className="col-auto">
          {<i className="bi-bell" />}
          {<i className="bi-bell-slash" />}
        </div>
        <div className="col">Notifications</div>
        <div className="col">Switch Here</div>
      </div>
      <div className="ps-2 small text-secondary">
        Notifications will let you know when its your turn
      </div>
      <div className="row px-3">
        <div className="col-auto">
          {<i className="bi-volume-up" />}
          {<i className="bi-volume-mute" />}
        </div>
        <div className="col">Sound</div>
        <div className="col">Switch Here</div>
      </div>
      <a
        className="text-dark link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
        href={`sms:?body=Check out this new drafting game - ${encodeURIComponent(
          "https://mythical-dispute.duckdns.org"
        )}`}
      >
        <div className="row px-3">
          <div className="col-auto">
            <i className="bi-box-arrow-up-right" />
          </div>
          <div className="col">Share with a Friend</div>
        </div>
      </a>
      <button className="ms-3 btn btn-outline-primary">
        <div className="row">
          <div className="col-auto">{<i className="bi-bug" />}</div>
          <div className="col">Report a bug</div>
        </div>
      </button>
      <a
        className="text-dark link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
        href="https://discord.gg/Qssfxa7bag"
      >
        <div className="row px-3">
          <div className="col-auto">
            <i className="bi-discord" />
          </div>
          <div className="col">Community</div>
        </div>
      </a>
      <div className="ps-2 small text-secondary">
        Give Feedback, Set up Games, Meet New Friends!
      </div>
    </div>
  );
};
