import { AnimalClass } from "./animalClass";
import { Family } from "./family";
import { Size } from "./size";

export interface Card {
  id: string;
  cardName: string;
  family: Family;
  animalClass: AnimalClass;
  size: Size;
  artistName?: string;
  textBox?: string;
  imgUrl?: string;
  airValue?: number;
  landValue?: number;
  waterValue?: number;
}
