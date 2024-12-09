import { FC } from "react";
import toggle from "./toggleSwitch.module.scss";

export const ToggleSwitch: FC<{
  checked: boolean;
  onChangeHandler: (c: boolean) => void;
}> = ({ checked, onChangeHandler }) => {
  return (
    <div
      className={`position-relative ${
        checked ? "bg-success text-end" : "bg-grey"
      } ${toggle.oval_on}`}
      onClick={() => onChangeHandler(!checked)}
    >
      <button className={`btn border-0 mt-1 mx-1 ${toggle.circle}`} />
    </div>
  );
};
