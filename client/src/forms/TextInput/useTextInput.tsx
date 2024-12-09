import { useState, useEffect } from "react";
import { TextInputControl } from "./TextInputControl";

export const useTextInput = (
  initialValue: string = "",
  isRequired?: boolean
): TextInputControl => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!value && isRequired) {
      setError("This field is required.");
    } else {
      setError("");
    }
  }, [value, isRequired]);

  return { value, setValue, error, isRequired };
};
