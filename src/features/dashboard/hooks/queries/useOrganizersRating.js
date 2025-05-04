import { useQuery } from "@tanstack/react-query";
import { useCheckAuth } from "@stores/authStore";
import { fetchOrganizersRating } from "@dashboard/api/ratingsApi";

export const useOrganizersRating = () => {
  const isAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organizersRating"],
    queryFn: fetchOrganizersRating,
    enabled: isAuth,
  });

  return { data, isLoading, error };
};
