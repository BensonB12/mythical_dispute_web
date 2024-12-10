import { LoginButton } from "./LoginButton";
import { User } from "../../models/user";
import size from "../../styles/sizes.module.scss";

export const ProfileHead = () => {
  const user: User = {
    id: -1,
    userName: "Benson",
    notifications: true,
    userColor: "#41EAD4",
  };

  return (
    <div className="row border-grey border-3 border justify-content-center m-4 p-2 rounded">
      <div className="col-7 col-sm-auto my-auto">
        <LoginButton />
      </div>
      <div className="d-sm-none col-auto col-md-1 col-sm-2">
        <div
          className={`rounded  ${size.h_w_60}`}
          style={{
            backgroundColor: user.userColor,
          }}
        />
      </div>
      <div className="row col-sm-6 justify-content-center">
        <div className="col-auto pt-2">
          <i className="bi-person-circle h1" />
        </div>
        <div className="col-auto h1 my-auto">{user.userName}</div>
      </div>
      <div className="d-none d-sm-flex col-auto">
        <div
          className={`rounded ${size.h_w_60}`}
          style={{
            backgroundColor: user.userColor,
          }}
        />
      </div>
    </div>
  );
};
