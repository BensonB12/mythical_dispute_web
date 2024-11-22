import { Location } from "./../models/location";
import { FC } from "react";
import { LocationLogo } from "./LocationLogo";
import font from "./../styles/fonts.module.scss";

export const ValuedLocationLogo: FC<{ location: Location; value: number }> = ({
  location,
  value,
}) => {
  return (
    <div>
      <div className="position-absolute z-n1">
        <LocationLogo location={location} />
      </div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ width: "60px", height: "60px" }}
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
