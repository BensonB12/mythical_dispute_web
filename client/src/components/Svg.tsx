import { FC } from "react";

export const Svg: FC<{ src: string; isDetailed?: boolean }> = ({
  src,
  isDetailed = false,
}) => {
  return (
    <img src={src} alt={`A picture of ${src}`} height={isDetailed ? 60 : 30} />
  );
};
