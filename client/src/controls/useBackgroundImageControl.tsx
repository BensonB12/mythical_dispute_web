import { useState } from "react";
import { BackgroundOption } from "../models/backgroundOption";

export interface BackgroundImageControl {
  value: BackgroundOption;
  setValue: (bgOption: BackgroundOption) => void;
}

export const useBackgroundImageControl = (): BackgroundImageControl => {
  const [value, setValue] = useState<BackgroundOption>(BackgroundOption.NONE);
  return { value, setValue };
};
