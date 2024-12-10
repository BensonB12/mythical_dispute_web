import { FC, useEffect } from "react";
import { BackgroundImageControl } from "../controls/useBackgroundImageControl";
import { BackgroundOption } from "../models/backgroundOption";
import { useGetBugReportsQuery } from "../hooks/bugHook";
import { Lost } from "./Lost";

export const BugReports: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  useEffect(() => {
    backgroundImageControl.setValue(BackgroundOption.NONE);
  }, [backgroundImageControl]);

  const { data: bugReports, isError } = useGetBugReportsQuery();

  if (isError) {
    return <Lost backgroundImageControl={backgroundImageControl} />;
  }

  return (
    <div className="p-3">
      {bugReports.map((bugReport, index) => (
        <div key={index} className="p-3 h4">
          {bugReport}
        </div>
      ))}
    </div>
  );
};
