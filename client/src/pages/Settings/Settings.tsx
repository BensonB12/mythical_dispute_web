import { FC, useEffect } from "react";
import { BackgroundImageControl } from "../../controls/useBackgroundImageControl";
import { BackgroundOption } from "../../models/backgroundOption";
import { LocalStorageKey } from "../../models/localStorageKey";
import { HeadNav } from "../../navigation/HeadNav";
import { SettingToggle } from "./SettingToggle";
import { ReportBugFormModal } from "../../components/ReportBugFormModal";

export const Settings: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.NONE);
  }, [backgroundImageControl]);

  return (
    <div>
      <HeadNav />
      <div className="p-3">
        <SettingToggle
          label="Notifications"
          preferenceKey={LocalStorageKey.NOTIFICATIONS}
          iconOn="bi-bell"
          iconOff="bi-bell-slash"
        />
        <div className="ps-2 small text-secondary mb-5">
          Notifications will let you know when it's your turn
        </div>

        <SettingToggle
          label="Sound"
          preferenceKey={LocalStorageKey.SOUND}
          iconOn="bi-volume-up"
          iconOff="bi-volume-mute"
        />
        <div className="ps-2 small text-secondary mb-5">
          Adjust the sound settings for your game
        </div>

        <div className="row mx-0 my-5">
          <a
            className="h4 col-auto row m-0 link-dark link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
            href={`sms:?body=Check out this new drafting game - ${encodeURIComponent(
              "https://mythical-dispute.duckdns.org"
            )}`}
          >
            <div className="ps-0 col-auto">
              <i className="bi-box-arrow-up-right" />
            </div>
            <div className="col">Share with a Friend</div>
          </a>
        </div>

        <button
          type="button"
          className="ms-2 btn btn-outline-primary my-4"
          data-bs-toggle="modal"
          data-bs-target="#ReportBugFormModal"
        >
          <div className="row my-auto h4">
            <div className="col-auto">
              <i className="bi-bug" />
            </div>
            <div className="col">Report a bug</div>
          </div>
        </button>

        <div className="row h4 mx-0 mt-5">
          <a
            className="link-dark col-auto row m-0 link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
            href="https://discord.gg/Qssfxa7bag"
          >
            <div className="ps-0 col-auto">
              <i className="bi-discord" />
            </div>
            <div className="col">Community</div>
          </a>
        </div>
        <div className="ps-2 small text-secondary">
          Give Feedback, Set up Games, Meet New Friends!
        </div>
      </div>

      <ReportBugFormModal />
    </div>
  );
};
