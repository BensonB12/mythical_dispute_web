import { axiosClient } from "../utils/axiosClient";
import { convertFileToFormData } from "../utils/converter/converter";

export const BugService = {
  async getBugReports(): Promise<string[]> {
    const url = `/bug/all`;
    const response = await axiosClient.get(url);
    return response.data;
  },
  async createBugReport(report: string, file?: File) {
    const url = `/bug/new`;
    await axiosClient.post(url, convertFileToFormData(report, file));
  },
};
