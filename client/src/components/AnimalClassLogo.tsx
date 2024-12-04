import { AnimalClass } from "../models/animalClass";
import mythicalLogo from "../assets/mythical_logo.svg";
import birdLogo from "../assets/bird_logo.svg";
import amphibianLogo from "../assets/amphibian_logo.svg";
import reptileLogo from "../assets/reptile_logo.svg";
import mammalLogo from "../assets/mammal_logo.svg";
import plantLogo from "../assets/plant_logo.svg";
import fishLogo from "../assets/fish_logo.svg";
import { FC } from "react";
import { Svg } from "./Svg";

export const AnimalClassLogo: FC<{
  animalClass: AnimalClass;
  isDetailed?: boolean;
}> = ({ animalClass, isDetailed = false }) => {
  switch (animalClass) {
    case AnimalClass.MYTHICAL:
      return <Svg src={mythicalLogo} isDetailed={isDetailed} />;
    case AnimalClass.BIRD:
      return <Svg src={birdLogo} isDetailed={isDetailed} />;
    case AnimalClass.AMPHIBIAN:
      return <Svg src={amphibianLogo} isDetailed={isDetailed} />;
    case AnimalClass.REPTILE:
      return <Svg src={reptileLogo} isDetailed={isDetailed} />;
    case AnimalClass.MAMMAL:
      return <Svg src={mammalLogo} isDetailed={isDetailed} />;
    case AnimalClass.FISH:
      return <Svg src={fishLogo} isDetailed={isDetailed} />;
    case AnimalClass.PLANT:
      return <Svg src={plantLogo} isDetailed={isDetailed} />;
    case AnimalClass.ALL:
    case AnimalClass.ANY:
    default:
      return <Svg src={mythicalLogo} isDetailed={isDetailed} />; // TODO: Replace with appropriate SVG for "ALL/ANY" or "default".
  }
};
