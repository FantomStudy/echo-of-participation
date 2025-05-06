import { useCheckAuth } from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";

import { fetchGroups } from "../../api/dashboardApi";

export const useGroups = () => {
  const isAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
    enabled: isAuth,
  });

  return {
    data,
    isLoading,
    error,
  };
};
