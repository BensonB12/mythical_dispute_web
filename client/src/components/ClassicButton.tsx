import { FC } from "react";
import { Link } from "react-router-dom";

export const ClassicButton: FC<{ label: string; icon: string; to: string }> = ({
  label,
  icon,
  to,
}) => {
  return (
    <Link to={to} className="btn btn-light w-50 m-2 shadow">
      <div className="row">
        <div className="col-auto mt-2">
          <i className={`${icon} h4 my-auto`} />
        </div>
        <div className="col text-center my-auto h2">{label}</div>
      </div>
    </Link>
  );
};
