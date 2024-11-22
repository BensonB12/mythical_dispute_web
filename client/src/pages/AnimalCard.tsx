import { FC } from "react";
import { Card } from "../models/card";
import { AnimalClassLogo } from "../components/AnimalClassLogo";
import { ValuedLocationLogo } from "../components/ValuedLocationLogo";
import { Location } from "../models/location";

export const AnimalCard: FC<{ card: Card }> = ({ card }) => {
  return (
    <div
      className="rounded m-5 border-3 border position-relative"
      style={{ height: "250px", width: "250px" }}
    >
      <img
        src={import.meta.env.VITE_API_URL + card.imgUrl}
        alt={`A picture of ${card.cardName} could not be found`}
        className="position-absolute top-0 start-0 z-n1"
        style={{ maxHeight: "250px", maxWidth: "250px" }}
      />

      <div className="h-100">
        <div className="row h-25">
          <div className="col-auto pe-0">
            <AnimalClassLogo animalClass={card.animalClass} />
          </div>
          <div className="col ps-0">
            <div className="bg-light w-100 px-1">
              <div className="d-flex justify-content-between">
                <div>{card.cardName}</div>
                <div>{card.family}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row h-75">
          <div className="col-auto pe-0 d-flex flex-column justify-content-around">
            <div className="p-0 m-0" style={{ height: "60px", width: "60px" }}>
              {card.airValue && (
                <ValuedLocationLogo
                  location={Location.AIR}
                  value={card.airValue}
                />
              )}
            </div>
            <div style={{ height: "60px", width: "60px" }}>
              {card.landValue && (
                <ValuedLocationLogo
                  location={Location.LAND}
                  value={card.landValue}
                />
              )}
            </div>
            <div style={{ height: "60px", width: "60px" }}>
              {card.waterValue && (
                <ValuedLocationLogo
                  location={Location.WATER}
                  value={card.waterValue}
                />
              )}
            </div>
          </div>

          <div className="col ps-0 d-flex flex-column align-items-end">
            <div className="w-100 mt-auto bg-light">
              <div className="p-1">{card.textBox}</div>
            </div>
            <div className="w-100 d-flex justify-content-between bg-dark small text-light">
              <div className="ps-1">{card.artistName}</div>
              <div className="pe-1">{card.size}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
