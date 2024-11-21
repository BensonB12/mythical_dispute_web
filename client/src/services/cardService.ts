import { Card } from "../models/card";
import { axiosClient } from "../utils/axiosClient";

export const CardService = {
  async getCards(): Promise<Card[]> {
    const url = `/card/all`;
    const response = await axiosClient.get(url);
    return response.data;
  },
};
