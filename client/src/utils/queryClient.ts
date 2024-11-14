import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      throwOnError: true,
    },
  },
});

export const getQueryClient = () => {
  return queryClient;
};
