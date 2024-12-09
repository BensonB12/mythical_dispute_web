import { axiosClient } from "../utils/axiosClient";
import { convertFileToFormData } from "../utils/converter/converter";

export const BugService = {
  async createBugReport(report: string, file?: File) {
    const url = `/bug/new`;
    await axiosClient.post(url, convertFileToFormData(report, file));
  },
};
