import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

queryClient.getQueryCache().config = {
  onError: (error) => {
    console.error("Глобальная ошибка запроса:", error);
  },
};
