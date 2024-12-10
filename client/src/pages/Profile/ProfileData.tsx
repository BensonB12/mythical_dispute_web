import { FC } from "react";

export const ProfileData: FC<{
  icon: string;
  label: string;
  value: string;
}> = ({ icon, label, value }) => {
  return (
    <div className="row mx-0">
      <div className="col-auto">
        <i className={`${icon} h2`} />
      </div>
      <div className="col">{label}</div>
      <div className="col-auto border-grey border">{value}</div>
    </div>
  );
};
