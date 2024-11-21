import { useGetCardsQuery } from "../hooks/cardHook";
import { AnimalCard } from "./AnimalCard";

export const AllCards = () => {
  const { data: cards } = useGetCardsQuery();

  return (
    <div>
      {cards.map((c) => (
        <div key={c.id}>
          <AnimalCard card={c} />
        </div>
      ))}
    </div>
  );
};
