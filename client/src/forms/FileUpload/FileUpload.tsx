import { FC, useState } from "react";
import { FileUploadControl } from "./FileUploadControl";

interface Props {
  label?: string;
  control: FileUploadControl;
  labelClassName?: string;
  inputClassName?: string;
  containerClassName?: string;
  typesAccepted?: string;
  icon?: string;
}

export const FileUpload: FC<Props> = ({
  label = "Bug Screenshots (Only .pdf & .jpg)",
  control,
  labelClassName,
  inputClassName = "col-md-8",
  containerClassName,
  typesAccepted = ".pdf, .jpg",
  icon = "bi-image",
}) => {
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const validationClasses =
    hasBeenTouched && control.error
      ? "is-invalid"
      : hasBeenTouched
      ? "is-valid"
      : "";

  const computedLabel = label?.toLowerCase().replace(" ", "");
  const labelClasses = `${labelClassName} pb-0 pt-2 mb-0`;

  return (
    <div className="form-group row">
      {label && (
        <div className={labelClasses}>
          <label htmlFor={computedLabel} className={labelClasses}>
            {icon && <i className={`${icon} me-1`} />}
            {label}
          </label>
        </div>
      )}
      <div
        className={
          containerClassName
            ? `my-auto ${containerClassName}`
            : "col-md my-auto"
        }
      >
        <div className={inputClassName}>
          <input
            type="file"
            accept={typesAccepted ? typesAccepted : "*/*"}
            className={`form-control ${validationClasses}`}
            onBlur={() => setHasBeenTouched(!!control.isRequired)}
            onChange={(e) => {
              if (e.target.files) {
                control.setValue(e.target.files[0]);
              } else {
                console.log("file lis ton input is null");
              }
            }}
          />
        </div>
        {control.error && hasBeenTouched && (
          <div
            v-if=""
            className="invalid-feedback"
            id={`${computedLabel}Feedback`}
          >
            {control.error}
          </div>
        )}
      </div>
    </div>
  );
};
