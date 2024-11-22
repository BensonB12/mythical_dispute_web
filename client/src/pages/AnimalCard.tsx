import { FC } from "react";
import { Card } from "../models/card";
import { AnimalClassLogo } from "../components/AnimalClassLogo";

export const AnimalCard: FC<{ card: Card }> = ({ card }) => {
  return (
    <div className="rounded m-5" style={{ height: "200px" }}>
      <img
        src={import.meta.env.VITE_API_URL + card.imgUrl}
        alt={`A picture of ${card.cardName} could not be found`}
        height={200}
        className="position-absolute z-n1"
      />
      <div className="container m-0 p-0">
        <div className="row">
          <div className="row">
            <div className="col-auto">
              <AnimalClassLogo animalClass={card.animalClass} />
            </div>
            <div className="col">
              {card.cardName} - {card.family}
            </div>
          </div>
          <div className="row">
            <div>{card.airValue}</div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row">
              <div>{card.landValue}</div>
            </div>
            <div className="row">
              <div>{card.waterValue}</div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div>{card.textBox}</div>
            </div>
            <div className="row">
              <div className="col">{card.artistName}</div>
              <div className="col">{card.size}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
