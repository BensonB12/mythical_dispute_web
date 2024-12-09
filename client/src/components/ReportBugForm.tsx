import { FC } from "react";
import { useTextInput } from "../forms/TextInput/useTextInput";
import { TextInput } from "../forms/TextInput/TextInput";
import { useFileUpload } from "../forms/FileUpload/useFileUpload";
import { FileUpload } from "../forms/FileUpload/FileUpload";

export const ReportBugForm: FC<{ startingError?: string }> = ({
  startingError,
}) => {
  const reportControl = useTextInput("", startingError ? false : true);
  const fileControl = useFileUpload();

  return (
    <div className="bg-lightest rounded p-3">
      <div className="text-center h1">
        <i className="bi-bug me-1" />
        Reporting a Bug
      </div>
      <div>We are sorry for the Inconvenience</div>
      <br />
      <div>
        Describe the bug you encountered in best detail you can. Steps to
        reproduce the bug and/or screenshots are very welcome as well
      </div>
      <br />
      <div className="small text-secondary">
        Our hope is to fix the bug as soon as we can after you submit your
        report
      </div>
      <div className="bg-primary rounded text-center w-75">{startingError}</div>
      <TextInput control={reportControl} isTextArea={true} />
      <FileUpload control={fileControl} />
      <div className="text-end">
        <button className="btn btn-secondary mt-2">Submit</button>
      </div>
    </div>
  );
};
