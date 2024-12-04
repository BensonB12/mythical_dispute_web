import { useGetCardsQuery } from "../hooks/cardHook";
import { AnimalCard } from "./AnimalCard";

export const AnimalCards = () => {
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
