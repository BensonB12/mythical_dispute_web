import { CardZone } from "./cardZone";

export interface Game {
  id: number;
  winnerId?: number;
  isOver: boolean;
  joinCode?: string;
  playersTurnId?: number;
  otherPlayersId?: number;
  cardIdsInGame: CardZone;
}
