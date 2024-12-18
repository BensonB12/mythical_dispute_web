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
      userColor: "#EFD6AC",
      winPercentage: "15%",
    },
    {
      userName: "Katelyn",
      userColor: "#66C0E1",
      winPercentage: "5%",
    },
    {
      userName: "Cade",
      userColor: "#20E468",
      winPercentage: "55%",
    },
  ];

  const mythicals = [
    {
      id: 134,
      imageSource: "/image/Katelyn.png",
      games: 8,
    },
    {
      id: 423,
      imageSource: "/image/Blackjack.png",
      games: 0,
      most: false,
    },
    {
      id: 323,
      imageSource: "/image/Waldo.png",
      winPercentage: "50%",
    },
    {
      id: 222,
      imageSource: "/image/Draco.png",
      winPercentage: "10%",
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
        <div className="row mx-0">
          {opponents.map((o) => (
            <div key={o.userName} className="col-lg">
              <ProfileOpponent
                userColor={o.userColor}
                userName={o.userName}
                winPercentage={o.winPercentage}
              />
            </div>
          ))}
        </div>
        <div className="row mx-0 mb-5">
          {mythicals.map((m) => (
            <div key={m.id} className="col-md-6 col-xl-3">
              <ProfileMythical
                imageSource={m.imageSource}
                most={m.most}
                games={m.games}
                winPercentage={m.winPercentage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
