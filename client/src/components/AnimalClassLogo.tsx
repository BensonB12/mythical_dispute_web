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

export const AnimalClassLogo: FC<{ animalClass: AnimalClass }> = ({
  animalClass,
}) => {
  switch (animalClass) {
    case AnimalClass.MYTHICAL:
      return <Svg src={mythicalLogo} />;
    case AnimalClass.BIRD:
      return <Svg src={birdLogo} />;
    case AnimalClass.AMPHIBIAN:
      return <Svg src={amphibianLogo} />;
    case AnimalClass.REPTILE:
      return <Svg src={reptileLogo} />;
    case AnimalClass.MAMMAL:
      return <Svg src={mammalLogo} />;
    case AnimalClass.FISH:
      return <Svg src={fishLogo} />;
    case AnimalClass.PLANT:
      return <Svg src={plantLogo} />;
    case AnimalClass.ALL:
    case AnimalClass.ANY:
    default:
      return <Svg src={mythicalLogo} />; // TODO: Replace with appropriate SVG for "ALL/ANY" or "default".
  }
};
