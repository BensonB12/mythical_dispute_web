import { Location } from "./../models/location";
import airLogo from "./../assets/air_logo.svg";
import landLogo from "./../assets/land_logo.svg";
import waterLogo from "./../assets/water_logo.svg";
import { FC } from "react";
import { Svg } from "./Svg";

export const LocationLogo: FC<{ location: Location; isDetailed?: boolean }> = ({
  location,
  isDetailed,
}) => {
  switch (location) {
    case Location.AIR:
      return <Svg src={airLogo} isDetailed={isDetailed} />;
    case Location.LAND:
      return <Svg src={landLogo} isDetailed={isDetailed} />;
    case Location.WATER:
      return <Svg src={waterLogo} isDetailed={isDetailed} />;
    case Location.ALL:
    case Location.ANY:
    default:
      return <Svg src={landLogo} isDetailed={isDetailed} />; // TODO: Replace with appropriate SVG for "ALL/ANY" or "default".
  }
};
