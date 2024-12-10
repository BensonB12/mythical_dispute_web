import { FC } from "react";
import spinner from "./spinner.module.scss";

export const Spinner: FC<{ numberOfPaws?: number }> = ({
  numberOfPaws = 4,
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className={`d-flex justify-content-around align-items-center flex-column h1`}
      >
        {Array.from({ length: numberOfPaws }).map((_, index) => (
          <div key={index} className={`${spinner.paw}`}>
            🐾
          </div>
        ))}
      </div>
    </div>
  );
};
