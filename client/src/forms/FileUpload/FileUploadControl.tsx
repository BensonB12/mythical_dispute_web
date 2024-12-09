export interface FileUploadControl {
  value: File | undefined;
  setValue: (f: File) => void;
  error: string;
  isRequired?: boolean;
}
