import { useGetCardsQuery } from "../hooks/cardHook";
import { DetailedAnimalCard } from "../components/DetailedAnimalCard";
import { FC, useEffect } from "react";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { BackgroundOption } from "../models/backgroundOption";
import { HeadNav } from "../navigation/HeadNav";
import { BackgroundCredit } from "../components/BackgroundCredit";

export const DetailedAnimalCards: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.SECONDARY);
  }, [backgroundImageControl]);

  const { data: cards } = useGetCardsQuery();

  return (
    <>
      <div className="bg-lightest">
        <HeadNav />
      </div>
      <div className="d-flex flex-row flex-wrap">
        {cards.map((c) => (
          <div key={c.id} className="p-3 m-5 mx-auto h-100">
            <DetailedAnimalCard card={c} />
          </div>
        ))}
      </div>
      <BackgroundCredit artistName="geralt" />
    </>
  );
};
