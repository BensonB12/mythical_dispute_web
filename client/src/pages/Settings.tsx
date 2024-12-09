import { FC, useEffect, useState } from "react";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { BackgroundOption } from "../models/backgroundOption";
import { HeadNav } from "../navigation/HeadNav";
import { LocalStorageService } from "../services/localStorageService";
import { LocalStorageKey } from "../models/localStorageKey";
import { ToggleSwitch } from "../forms/ToggleSwitch/ToggleSwitch";

export const Settings: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.NONE);
  }, [backgroundImageControl]);

  const initNotifications = LocalStorageService.getPreference(
    LocalStorageKey.NOTIFICATIONS
  );
  const initSound = LocalStorageService.getPreference(LocalStorageKey.SOUND);

  const [notificationsAreOn, setNotificationsAreOn] =
    useState(initNotifications);
  const [soundIsOn, setSoundIsOn] = useState(initSound);

  return (
    <div>
      <HeadNav />
      <div className="p-3">
        <div className="row mx-0 mt-5">
          <div className="col-auto h4">
            {notificationsAreOn ? (
              <i className="bi-bell" />
            ) : (
              <i className="bi-bell-slash" />
            )}
          </div>
          <div className="col text-center h4">Notifications</div>
          <div className="col-auto">
            <ToggleSwitch
              checked={notificationsAreOn}
              onChangeHandler={(newValue: boolean) => {
                setNotificationsAreOn(newValue);
                LocalStorageService.setPreference(
                  LocalStorageKey.NOTIFICATIONS,
                  newValue
                );
              }}
            />
          </div>
        </div>
        <div className="ps-2 small text-secondary mb-5">
          Notifications will let you know when its your turn
        </div>
        <div className="row mx-0 my-5">
          <div className="col-auto h4">
            {soundIsOn ? (
              <i className="bi-volume-up" />
            ) : (
              <i className="bi-volume-mute" />
            )}
          </div>
          <div className="col text-center h4">Sound</div>
          <div className="col-auto">
            <ToggleSwitch
              checked={soundIsOn}
              onChangeHandler={(newValue: boolean) => {
                setSoundIsOn(newValue);
                LocalStorageService.setPreference(
                  LocalStorageKey.SOUND,
                  newValue
                );
              }}
            />
          </div>
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
        <button className="ms-2 btn btn-outline-primary my-4">
          <div className="row my-auto h4">
            <div className="col-auto">{<i className="bi-bug" />}</div>
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
    </div>
  );
};
