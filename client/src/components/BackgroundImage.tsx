import { FC, ReactNode } from "react";
import imgClass from "./../styles/images.module.scss";
import { BackgroundOption } from "../models/backgroundOption";

export const BackgroundImage: FC<{
  children: ReactNode;
  background?: BackgroundOption;
}> = ({ children, background = BackgroundOption.NONE }) => {
  return (
    <div className={`flex-grow-1 ${imgClass[background]}`}>{children}</div>
  );
};
