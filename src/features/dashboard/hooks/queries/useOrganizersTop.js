import { useQuery } from "@tanstack/react-query";
import { useCheckAuth } from "@stores/authStore";
import { fetchOrganizersTop } from "@dashboard/api/ratingsApi";

export const useOrganizersTop = () => {
  const isAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organizersTop"],
    queryFn: fetchOrganizersTop,
    enabled: isAuth,
  });

  return { data, isLoading, error };
};
