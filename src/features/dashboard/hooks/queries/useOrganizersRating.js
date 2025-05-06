import { fetchOrganizersRating } from "../../api/ratingsApi";
import { useCheckAuth } from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";

export const useOrganizersRating = () => {
  const isAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organizersRating"],
    queryFn: fetchOrganizersRating,
    enabled: isAuth,
  });

  return { data, isLoading, error };
};
