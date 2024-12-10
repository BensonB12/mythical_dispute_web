import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { BugService } from "../services/bugService";
import { getQueryClient } from "../utils/queryClient";

const queryClient = getQueryClient();

export const bugKeys = {
  allBugs: ["allBugs"] as const,
};

export const useGetBugReportsQuery = () => {
  return useSuspenseQuery({
    queryKey: bugKeys.allBugs,
    queryFn: async () => await BugService.getBugReports(),
  });
};

export const useCreateBugMutation = () => {
  return useMutation({
    mutationFn: async ({ report, file }: { report: string; file?: File }) =>
      await BugService.createBugReport(report, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bugKeys.allBugs });
    },
  });
};
