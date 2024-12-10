import { FC, useEffect } from "react";
import { BackgroundImageControl } from "../../controls/useBackgroundImageControl";
import { LoginButton } from "../../features/auth/LoginButton";
import { BackgroundOption } from "../../models/backgroundOption";
import { User } from "../../models/user";
import { ProfileData } from "./ProfileData";
import { ProfileOpponent } from "./ProfileOpponent";
import { ProfileMythical } from "./ProfileMythical";
import { HeadNav } from "../../navigation/HeadNav";

export const Profile: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.NONE);
  }, [backgroundImageControl]);

  const user: User = {
    id: -1,
    userName: "Benson",
    notifications: true,
    userColor: "#5E39A1",
  };

  // All winPercentages will be in strings because of falsy reasons

  // Top three people you play
  const opponents = [
    {
      userName: "Alan",
      userColor: "#AAA321",
      winPercentage: "15%",
    },
    {
      userName: "Katelyn",
      userColor: "#000321",
      winPercentage: "5%",
    },
    {
      userName: "Cade",
      userColor: "#321F00",
      winPercentage: "55%",
    },
  ];

  const mythicals = [
    {
      imageSource: "/image/Katelyn.png",
      games: 8,
    },
    {
      imageSource: "/image/Waldo.png",
      winPercentage: "50%",
    },
    {
      imageSource: "/image/Draco.png",
      winPercentage: "10%",
      most: false,
    },
    {
      imageSource: "/image/Blackjack.png",
      games: 0,
      most: false,
    },
  ];

  return (
    <div>
      <HeadNav />
      <LoginButton />
      <div className="row mx-0">
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
      <div className="row mx-0">
        <div className="col">
          <ProfileData
            icon={"bi-graph-up"}
            label={"Win Percentage"}
            value={`${78}%`}
          />
        </div>
        <div className="col">
          <ProfileData
            icon={"bi-align-bottom"}
            label={"Games"}
            value={`${78}`}
          />
        </div>
        <div className="col">
          <ProfileData icon={"bi-bar-chart"} label={"Wins"} value={`${34}`} />
        </div>
      </div>
      <div>
        {opponents.map((o) => (
          <ProfileOpponent
            userColor={o.userColor}
            userName={o.userName}
            winPercentage={o.winPercentage}
          />
        ))}
      </div>
      <div>
        {mythicals.map((m) => (
          <ProfileMythical
            imageSource={m.imageSource}
            most={m.most}
            games={m.games}
            winPercentage={m.winPercentage}
          />
        ))}
      </div>
    </div>
  );
};
