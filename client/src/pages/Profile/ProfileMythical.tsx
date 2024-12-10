import { FC } from "react";
import size from "./../../styles/sizes.module.scss";

export const ProfileMythical: FC<{
  imageSource: string;
  games?: number;
  winPercentage?: string;
  most?: boolean;
}> = ({ imageSource, games, winPercentage, most = true }) => {
  const label = winPercentage
    ? most
      ? "Most Successful Mythical"
      : "Least 'Tuned' Mythical"
    : most
    ? "Most Practiced Mythical"
    : "Least Practiced Mythical";

  return (
    <div>
      <div>{label}</div>
      <div>
        <img
          className={size.mh_mw_80}
          src={import.meta.env.VITE_API_URL + imageSource}
          alt={`Pic of ${imageSource.replace("/image/", "").split(".")[0]}`}
        />
      </div>
      <div className="row mx-0">
        <div className="col text-grey">
          <i className={winPercentage ? "bi-graph-up" : "bi-align-bottom"} />
          {winPercentage ? "Win Percentage" : "Games"}
        </div>
        <div className="col">{winPercentage || (games ?? 0)}</div>
      </div>
    </div>
  );
};
