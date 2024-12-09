import { useGetCardsQuery } from "../hooks/cardHook";
import { DetailedAnimalCard } from "../components/DetailedAnimalCard";
import { FC } from "react";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { BackgroundOption } from "../models/backgroundOption";

export const DetailedAnimalCards: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  backgroundImageControl.setValue(BackgroundOption.SECONDARY);
  const { data: cards } = useGetCardsQuery();

  return (
    <div className="d-flex flex-row flex-wrap">
      {cards.map((c) => (
        <div key={c.id} className="p-3 m-5 mx-auto h-100">
          <DetailedAnimalCard card={c} />
        </div>
      ))}
    </div>
  );
};
