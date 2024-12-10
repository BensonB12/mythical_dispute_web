import { FC } from "react";

export const ProfileOpponent: FC<{
  userName: string;
  userColor: string;
  winPercentage: string;
}> = ({ userName, userColor, winPercentage }) => {
  return (
    <div className="row border-grey border rounded m-3 px-3 px-lg-1 justify-content-between">
      <div
        className="col-auto rounded my-auto h3"
        style={{ backgroundColor: userColor }}
      >
        {userName}
      </div>
      <div className="col-auto text-center">
        {winPercentage}
        <div className="text-grey">
          <i className="bi-graph-up me-1" />
          Win Percentage
        </div>
      </div>
    </div>
  );
};
