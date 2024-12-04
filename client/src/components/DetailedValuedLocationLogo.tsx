import { Location } from "../models/location";
import { FC } from "react";
import { LocationLogo } from "./LocationLogo";
import font from "./../styles/fonts.module.scss";

export const DetailedValuedLocationLogo: FC<{
  location: Location;
  value: number;
  isDetailed?: boolean;
}> = ({ location, value, isDetailed = false }) => {
  return (
    <div>
      <div className="position-absolute z-n1">
        <LocationLogo location={location} isDetailed={isDetailed} />
      </div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: isDetailed ? "60px" : "30px",
          height: isDetailed ? "60px" : "30px",
        }}
      >
        <div
          className={`${font.irish_grover} my-auto h2 ${
            location === Location.AIR ? "" : "text-light"
          }`}
          style={{ textShadow: "#000 1px 1px 10px" }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};
