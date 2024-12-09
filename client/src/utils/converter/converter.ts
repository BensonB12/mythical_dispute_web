import { FormDataKeys } from "./FormDataKeys";

export const convertFileToFormData = (report: string, file?: File) => {
  const formData = new FormData();

  if (file) formData.append(FormDataKeys.FILE, file);

  formData.append(FormDataKeys.REPORT, report);
  return formData;
};
