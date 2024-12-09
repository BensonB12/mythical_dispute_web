import { FC, useState } from "react";
import { ToggleSwitch } from "../../forms/ToggleSwitch/ToggleSwitch";
import { LocalStorageKey } from "../../models/localStorageKey";
import { LocalStorageService } from "../../services/localStorageService";

export const SettingToggle: FC<{
  label: string;
  preferenceKey: LocalStorageKey;
  iconOn: string;
  iconOff: string;
}> = ({ label, preferenceKey, iconOn, iconOff }) => {
  const initValue = LocalStorageService.getPreference(preferenceKey);
  const [isOn, setIsOn] = useState(initValue);

  const handleChange = (newValue: boolean) => {
    setIsOn(newValue);
    LocalStorageService.setPreference(preferenceKey, newValue);
  };

  return (
    <div className="row mx-0 my-5">
      <div className="col-auto h4">
        <i className={isOn ? iconOn : iconOff} />
      </div>
      <div className="col text-center h4">{label}</div>
      <div className="col-auto">
        <ToggleSwitch checked={isOn} onChangeHandler={handleChange} />
      </div>
    </div>
  );
};
