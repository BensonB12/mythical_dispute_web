import { Location } from "./../models/location";
import airLogo from "./../assets/air_logo.svg";
import landLogo from "./../assets/land_logo.svg";
import waterLogo from "./../assets/water_logo.svg";
import { FC } from "react";
import { Svg } from "./Svg";

export const LocationLogo: FC<{ location: Location }> = ({ location }) => {
  switch (location) {
    case Location.AIR:
      return <Svg src={airLogo} />;
    case Location.LAND:
      return <Svg src={landLogo} />;
    case Location.WATER:
      return <Svg src={waterLogo} />;
    case Location.ALL:
    case Location.ANY:
    default:
      return <Svg src={landLogo} />; // TODO: Replace with appropriate SVG for "ALL/ANY" or "default".
  }
};
