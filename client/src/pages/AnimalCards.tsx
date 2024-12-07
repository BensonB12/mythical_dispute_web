import { useGetCardsQuery } from "../hooks/cardHook";
import { AnimalCard } from "../components/AnimalCard";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { FC } from "react";
import { BackgroundOption } from "../models/backgroundOption";

export const AnimalCards: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  backgroundImageControl.setValue(BackgroundOption.SECONDARY);
  const { data: cards } = useGetCardsQuery();

  return (
    <div className="d-flex flex-row flex-wrap">
      {cards.map((c) => (
        <div key={c.id} className="p-3 m-5 mx-auto h-100">
          <AnimalCard card={c} />
        </div>
      ))}
    </div>
  );
};
