import { FC } from "react";

export const ClassicButton: FC<{ label: string; icon: string }> = ({
  label,
  icon,
}) => {
  return (
    <button className="btn btn-light w-25 m-2 shadow">
      <div className="row">
        <div className="col-auto mt-2">
          <i className={`${icon} h4 my-auto`} />
        </div>
        <div className="col text-center my-auto h2">{label}</div>
      </div>
    </button>
  );
};
