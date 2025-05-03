import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "@dashboard/api/dashboardApi";
import { useCheckAuth } from "@stores/authStore";

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
