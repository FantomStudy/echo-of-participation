import { useQuery } from "@tanstack/react-query";
import { useCheckAuth } from "@stores/localStore";
import { fetchTopOrganizers } from "../../api/dashboardApi";

export const useOrganizersTop = () => {
  const checkAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["topOrganizers"],
    queryFn: fetchTopOrganizers,
    enabled: checkAuth,
  });

  return { organizers: data, isLoading, error };
};
