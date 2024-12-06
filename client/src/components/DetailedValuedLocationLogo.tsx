import { Location } from "../models/location";
import { FC } from "react";
import { LocationLogo } from "./LocationLogo";
import font from "./../styles/fonts.module.scss";
import size from "./../styles/sizes.module.scss";
import shadow from "./../styles/shadows.module.scss";

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
        className={`${
          isDetailed ? size.h_w_60 : size.h_w_30
        } d-flex align-items-center justify-content-center`}
      >
        <div
          className={`${font.irish_grover} ${shadow.text_shadow} my-auto ${
            isDetailed ? "display-3" : ""
          } ${location === Location.AIR ? "" : "text-light"}`}
        >
          {value}
        </div>
      </div>
    </div>
  );
};
