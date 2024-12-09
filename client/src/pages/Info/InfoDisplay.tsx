import { FC } from "react";

export const InfoDisplay: FC<{
  icon: string;
  label: string;
  information: string;
}> = ({ icon, label, information }) => {
  return (
    <div className="my-5">
      <div className="row">
        <div className="col-auto">
          <i className={`h2 ${icon}`} />
        </div>
        <div className="col h2">{label}</div>
      </div>
      <div>{information}</div>
    </div>
  );
};
