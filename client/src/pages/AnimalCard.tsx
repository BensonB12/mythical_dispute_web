import { FC } from "react";
import { Card } from "../models/card";

export const AnimalCard: FC<{ card: Card }> = ({ card }) => {
  return (
    <div>
      <div>{card.family}</div>
      <div>{card.animalClass}</div>
      <div>{card.cardName}</div>
      <div>{card.artistName}</div>
      <img
        src={import.meta.env.VITE_API_URL + card.imgUrl}
        alt={`A picture of ${card.cardName} could not be found`}
      />
      <div>{card.size}</div>
      <div>{card.textBox}</div>
      <div>{card.waterValue}</div>
      <div>{card.airValue}</div>
      <div>{card.landValue}</div>
    </div>
  );
};
