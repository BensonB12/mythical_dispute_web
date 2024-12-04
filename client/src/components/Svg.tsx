import { FC } from "react";

export const Svg: FC<{ src: string }> = ({ src }) => {
  return <img src={src} alt={`A picture of ${src}`} height={60} />;
};
