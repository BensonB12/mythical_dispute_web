import { useState, useEffect } from "react";
import { FileUploadControl } from "./FileUploadControl";

export const useFileUpload = (
  initialValue?: File,
  isRequired?: boolean
): FileUploadControl => {
  const [value, setValue] = useState<File | undefined>(initialValue);
  const [error, setError] = useState<string>("");

  const clearFile = () => {
    setValue(undefined);
  };

  useEffect(() => {
    if (!value && isRequired) {
      setError("This field is required.");
    } else {
      setError("");
    }
  }, [value, isRequired]);

  return { value, setValue, error, isRequired, clearFile };
};
