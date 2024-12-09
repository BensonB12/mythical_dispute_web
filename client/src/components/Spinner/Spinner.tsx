import spinner from "./spinner.module.scss";

export const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center m-5">
      <div
        className={`d-flex justify-content-around align-items-center flex-column h1`}
      >
        <div className={`${spinner.paw}`}>🐾</div>
        <div className={`${spinner.paw}`}>🐾</div>
        <div className={`${spinner.paw}`}>🐾</div>
        <div className={`${spinner.paw}`}>🐾</div>
      </div>
    </div>
  );
};
