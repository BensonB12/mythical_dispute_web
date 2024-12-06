import { useGetCardsQuery } from "../hooks/cardHook";
import { DetailedAnimalCard } from "../components/DetailedAnimalCard";

export const DetailedAnimalCards = () => {
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
