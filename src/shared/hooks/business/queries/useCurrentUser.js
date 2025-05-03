import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@api/currentUserApi";
import { useCheckAuth } from "@stores/authStore";

export const useCurrentUser = () => {
  const isAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    enabled: isAuth,
  });

  return {
    user: data,
    isLoading,
    error,
  };
};
