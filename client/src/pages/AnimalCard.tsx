import { FC } from "react";
import { Card } from "../models/card";
import { AnimalClassLogo } from "../components/AnimalClassLogo";
import { DetailedValuedLocationLogo } from "../components/DetailedValuedLocationLogo";
import { Location } from "../models/location";

export const AnimalCard: FC<{ card: Card }> = ({ card }) => {
  return (
    <div
      className="rounded border-3 border position-relative"
      style={{ width: "105px" }}
    >
      <img
        src={import.meta.env.VITE_API_URL + card.imgUrl}
        alt={`A picture of ${card.cardName} could not be found`}
        className="position-absolute top-50 start-50 translate-middle z-n1"
        style={{ maxHeight: "105px", maxWidth: "105px" }}
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
            <div className="p-0 m-0" style={{ height: "30px", width: "30px" }}>
              {card.airValue && (
                <DetailedValuedLocationLogo
                  location={Location.AIR}
                  value={card.airValue}
                />
              )}
            </div>
            <div style={{ height: "30px", width: "30px" }}>
              {card.landValue !== null && (
                <DetailedValuedLocationLogo
                  location={Location.LAND}
                  value={card.landValue ?? 0}
                />
              )}
            </div>
            <div style={{ height: "30px", width: "30px" }}>
              {card.waterValue !== null && (
                <DetailedValuedLocationLogo
                  location={Location.WATER}
                  value={card.waterValue ?? 0}
                />
              )}
            </div>
          </div>

          <div className="col ps-0 d-flex flex-column align-items-end">
            <div className="w-100 mt-auto d-flex justify-content-between bg-dark small text-light">
              <div className="pe-1">{card.size}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
