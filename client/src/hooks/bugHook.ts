import { useMutation } from "@tanstack/react-query";
import { BugService } from "../services/bugService";

export const useCreateBugMutation = () => {
  return useMutation({
    mutationFn: async ({ report, file }: { report: string; file?: File }) =>
      await BugService.createBugReport(report, file),
  });
};
