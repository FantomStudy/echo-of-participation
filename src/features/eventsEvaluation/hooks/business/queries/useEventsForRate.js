import { fetchEventsForRate } from "@/features/eventsEvaluation/api/evenEvaluationApi";
import { queryClient } from "@/shared/configs/queryClientConfig";
import { useCheckAuth } from "@/shared/stores/authStore";
import { useQuery } from "@tanstack/react-query";

export const useEventsForRate = () => {
  const isAuth = useCheckAuth();
  const { id } = queryClient.getQueryData(["currentUser"]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["eventsForRate"],
    queryFn: () => fetchEventsForRate(id),
    enabled: isAuth,
  });

  return { data, isLoading, error };
};
