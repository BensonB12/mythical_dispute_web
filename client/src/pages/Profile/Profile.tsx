import { FC, useEffect } from "react";
import { BackgroundImageControl } from "../../controls/useBackgroundImageControl";
import { LoginButton } from "../../features/auth/LoginButton";
import { BackgroundOption } from "../../models/backgroundOption";
import { User } from "../../models/user";

export const Profile: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.PRIMARY);
  }, [backgroundImageControl]);

  const user: User = {
    id: -1,
    userName: "Benson",
    notifications: true,
    userColor: "#5E39A1",
  };

  return (
    <div>
      <LoginButton />
      <div className="row">
        <div className="col">
          <i className="bi-person-circle" />
        </div>
        <div className="col">{user.userName}</div>
        <div className="col">
          <div
            className="p-2 rounded"
            style={{ backgroundColor: user.userColor }}
          />
        </div>
      </div>
    </div>
  );
};
