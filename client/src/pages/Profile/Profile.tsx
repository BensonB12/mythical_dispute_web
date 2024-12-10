import { FC, useEffect } from "react";
import { BackgroundImageControl } from "../../controls/useBackgroundImageControl";
import { BackgroundOption } from "../../models/backgroundOption";
import { ProfileData } from "./ProfileData";
import { ProfileOpponent } from "./ProfileOpponent";
import { ProfileMythical } from "./ProfileMythical";
import { HeadNav } from "../../navigation/HeadNav";
import { ProfileHead } from "./ProfileHead";

export const Profile: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.NONE);
  }, [backgroundImageControl]);

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
      <div>
        <ProfileHead />
        <div className="row mx-0 justify-content-between">
          <div className="col-md-12 my-2 my-lg-0 col-lg-3">
            <ProfileData
              icon={"bi-graph-up"}
              label={"Win Percentage"}
              value={`${78}%`}
            />
          </div>
          <div className="col-sm-4 col-lg-3">
            <ProfileData
              icon={"bi-align-bottom"}
              label={"Games"}
              value={`${78}`}
            />
          </div>
          <div className="col-sm-4 col-lg-3 my-2 my-sm-0">
            <ProfileData icon={"bi-bar-chart"} label={"Wins"} value={`${34}`} />
          </div>
        </div>
        <div className="row">
          {opponents.map((o) => (
            <div className="col-lg">
              <ProfileOpponent
                userColor={o.userColor}
                userName={o.userName}
                winPercentage={o.winPercentage}
              />
            </div>
          ))}
        </div>
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
