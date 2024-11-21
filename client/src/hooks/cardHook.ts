import { useSuspenseQuery } from "@tanstack/react-query";
import { CardService } from "../services/cardService";

export const cardKeys = {
  cards: ["cards"] as const,
};

export const useGetCardsQuery = () =>
  useSuspenseQuery({
    queryKey: cardKeys.cards,
    queryFn: async () => await CardService.getCards(),
  });
