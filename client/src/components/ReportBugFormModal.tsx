import { FC } from "react";
import { useTextInput } from "../forms/TextInput/useTextInput";
import { TextInput } from "../forms/TextInput/TextInput";
import { useFileUpload } from "../forms/FileUpload/useFileUpload";
import { FileUpload } from "../forms/FileUpload/FileUpload";
import toast from "react-hot-toast";

export const ReportBugFormModal: FC<{ startingError?: string }> = ({
  startingError,
}) => {
  const reportControl = useTextInput("", startingError ? false : true);
  const fileControl = useFileUpload();

  const handleSubmit = () => {
    if (!reportControl.error) {
      const formData = {
        report: reportControl.value,
        file: fileControl.value,
      };
      console.log("Submitting:", formData);
      reportControl.setValue("");
      fileControl.clearFile();
      toast.success("Bug Submitted!", {
        icon: <i className="bi bi-check-circle-fill text-success" />,
        className: "bg-light",
      });
    } else {
      console.error("Form validation failed");
      toast.error("No Data, No Submission", {
        icon: <i className="bi bi-x-circle-fill text-danger" />,
        className: "bg-light",
      });
    }
  };

  return (
    <div
      className="modal fade"
      id="ReportBugFormModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="ReportBugFormModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-lightest">
          <div className="modal-header border-0">
            <div className="modal-title fs-5" id="ReportBugFormModalLabel">
              <i className="bi-bug me-1" />
              Reporting a Bug
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <form>
            <div className="modal-body">
              <div>We are sorry for the Inconvenience</div>
              <br />

              <div>
                Describe the bug you encountered in best detail you can. Steps
                to reproduce the bug and/or screenshots are very welcome as well
              </div>

              <div className="bg-primary rounded text-center w-75 mx-auto text-light my-2">
                {startingError}
              </div>

              <div className="small text-secondary">
                Our hope is to fix the bug as soon as we can after you submit
                your report
              </div>

              <TextInput control={reportControl} isTextArea={true} />
              <FileUpload control={fileControl} />
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
