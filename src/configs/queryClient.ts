import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      throwOnError: (error) => {
        console.error("Глобальная ошибка запроса:", error);
        return false;
      },
    },
  },
});
