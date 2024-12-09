export interface TextInputControl {
  value: string;
  setValue: (i: string) => void;
  error: string;
  isRequired?: boolean;
}
