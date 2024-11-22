import { FC } from "react";

export const Svg: FC<{ src: string }> = ({ src }) => {
  return (
    <img
      src={src}
      alt={`A picture of ${src
        .split("/")
        .pop()!
        .split(".")
        .slice(-2, -1)[0]
        .replace(/[_-]/g, " ")}`}
      height={60}
    />
  );
};
