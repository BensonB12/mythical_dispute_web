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

      <div className="position-absolute top-0 start-100 translate-middle">
        <AnimalClassLogo animalClass={card.animalClass} />
      </div>

      <div className="ps-2 bg-light">{card.cardName}</div>

      <div
        className="position-relative top-0 start-0 translate-middle-x"
        style={{ height: "30px", width: "30px" }}
      >
        {card.airValue && (
          <DetailedValuedLocationLogo
            location={Location.AIR}
            value={card.airValue}
          />
        )}
      </div>
      <div
        className="position-relative top-0 start-0 translate-middle-x"
        style={{ height: "30px", width: "30px" }}
      >
        {card.landValue !== null && (
          <DetailedValuedLocationLogo
            location={Location.LAND}
            value={card.landValue ?? 0}
          />
        )}
      </div>
      <div
        className="position-relative top-0 start-0 translate-middle-x"
        style={{ height: "30px", width: "30px" }}
      >
        {card.waterValue !== null && (
          <DetailedValuedLocationLogo
            location={Location.WATER}
            value={card.waterValue ?? 0}
          />
        )}
      </div>

      <div className="position-absolute top-100 start-100 translate-middle">
        <div className="me-3 mb-3 rounded">{card.size[0].toUpperCase()}</div>
      </div>
    </div>
  );
};
