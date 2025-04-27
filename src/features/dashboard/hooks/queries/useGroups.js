import { useCheckAuth } from "@/shared/stores/localStore";
import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "../../api/dashboardApi";

export const useGroups = () => {
  const checkAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
    enabled: checkAuth,
  });

  return {
    groups: data,
    isLoading,
    error,
  };
};
