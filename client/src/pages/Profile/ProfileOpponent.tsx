import { FC } from "react";

export const ProfileOpponent: FC<{
  userName: string;
  userColor: string;
  winPercentage: string;
}> = ({ userName, userColor, winPercentage }) => {
  return (
    <div className="row mx-0">
      <div className="col-auto rounded" style={{ backgroundColor: userColor }}>
        {userName}
      </div>
      <div className="col text-center">
        {winPercentage}
        <div className="text-grey">
          <i className="bi-graph-up me-1" />
          Win Percentage
        </div>
      </div>
    </div>
  );
};
