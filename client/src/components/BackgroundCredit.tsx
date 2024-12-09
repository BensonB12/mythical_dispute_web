import { FC } from "react";

export const BackgroundCredit: FC<{ artistName: string }> = ({
  artistName,
}) => {
  return (
    <div className="fixed-bottom small text-center pe-1">
      Background Image by {artistName}
    </div>
  );
};
