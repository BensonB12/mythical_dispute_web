import { FC, useState } from "react";
import { TextInputControl } from "./TextInputControl";

interface Props {
  label?: string;
  control: TextInputControl;
  labelClassName?: string;
  containerClassName?: string;
  inputClassName?: string;
  isTextArea?: boolean;
  rows?: number;
  placeholder?: string;
  icon?: string;
}
export const TextInput: FC<Props> = ({
  label,
  control,
  labelClassName = "",
  containerClassName,
  inputClassName,
  isTextArea = false,
  rows = 4,
  placeholder = "",
  icon,
}) => {
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const validationClasses =
    hasBeenTouched && control.error
      ? "is-invalid"
      : hasBeenTouched
      ? "is-valid"
      : "";

  const computedLabel = label?.toLowerCase().replace(" ", "");
  const labelClasses = `col-form-label ${labelClassName} pb-0 pt-2`;

  return (
    <div className={`form-group ${containerClassName || ""}`}>
      {label && (
        <label htmlFor={computedLabel} className={labelClasses}>
          {icon && <i className={`me-1 ${icon}`} />}
          {label}
        </label>
      )}
      {isTextArea ? (
        <div className={inputClassName}>
          <textarea
            name={computedLabel}
            id={computedLabel}
            value={control.value}
            className={`form-control ${validationClasses}`}
            onChange={(e) => control.setValue(e.target.value)}
            onBlur={() => setHasBeenTouched(!!control.isRequired)}
            rows={rows}
            placeholder={placeholder}
          />
        </div>
      ) : (
        <div className={inputClassName}>
          <input
            type="text"
            name={computedLabel}
            id={computedLabel}
            value={control.value}
            className={`form-control ${validationClasses}`}
            onChange={(e) => control.setValue(e.target.value)}
            onBlur={() => setHasBeenTouched(!!control.isRequired)}
            placeholder={placeholder}
          />
        </div>
      )}
      {control.error && hasBeenTouched && (
        <div className="invalid-feedback" id={`${computedLabel}Feedback`}>
          {control.error}
        </div>
      )}
    </div>
  );
};
