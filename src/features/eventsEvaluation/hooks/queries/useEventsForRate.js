import { queryClient } from "@configs/queryClientConfig";
import { useCheckAuth } from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";

import { fetchEventsForRate } from "../../api/evenEvaluationApi";

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
