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
    <div className="h-100 mx-2 py-4">
      <div className="text-center h4">{label}</div>
      <div className="text-center h-75 d-flex justify-content-center align-items-center">
        <img
          className={`${size.mh_mw_80}`}
          src={import.meta.env.VITE_API_URL + imageSource}
          alt={`Pic of ${imageSource.replace("/image/", "").split(".")[0]}`}
        />
      </div>
      <div className="row mx-0 h5 justify-content-center">
        <div className="col-auto text-grey">
          <i
            className={
              winPercentage ? "bi-graph-up me-1" : "bi-align-bottom me-1"
            }
          />
          {winPercentage ? "Win Percentage" : "Games"}
        </div>
        <div className="col-auto">{winPercentage || (games ?? 0)}</div>
      </div>
    </div>
  );
};
