import { FC } from "react";
import { Card } from "../models/card";
import { AnimalClassLogo } from "./AnimalClassLogo";
import { DetailedValuedLocationLogo } from "./DetailedValuedLocationLogo";
import { Location } from "../models/location";
import font from "./../styles/fonts.module.scss";
import size from "./../styles/sizes.module.scss";

export const AnimalCard: FC<{ card: Card }> = ({ card }) => {
  return (
    <div className={`${size.w_105} rounded border-3 border position-relative`}>
      <img
        src={import.meta.env.VITE_API_URL + card.imgUrl}
        alt={`Pic of ${card.cardName}`}
        className={`${size.mh_mw_80} position-absolute top-50 start-50 translate-middle z-n1`}
      />

      <div className="position-absolute top-0 start-100 translate-middle">
        <AnimalClassLogo animalClass={card.animalClass} />
      </div>

      <div className="ps-2">{card.cardName}</div>

      <div
        className={`${size.h_w_30} position-relative top-0 start-0 translate-middle-x`}
      >
        {card.airValue && (
          <DetailedValuedLocationLogo
            location={Location.AIR}
            value={card.airValue}
          />
        )}
      </div>
      <div
        className={`${size.h_w_30} position-relative top-0 start-0 translate-middle-x`}
      >
        {card.landValue !== null && (
          <DetailedValuedLocationLogo
            location={Location.LAND}
            value={card.landValue ?? 0}
          />
        )}
      </div>
      <div
        className={`${size.h_w_30} position-relative top-0 start-0 translate-middle-x`}
      >
        {card.waterValue !== null && (
          <DetailedValuedLocationLogo
            location={Location.WATER}
            value={card.waterValue ?? 0}
          />
        )}
      </div>

      <div className="position-absolute top-100 start-100 translate-middle">
        <div className={`me-3 mb-3 rounded small ${font.irish_grover}`}>
          {card.size[0].toUpperCase()}
        </div>
      </div>
    </div>
  );
};
