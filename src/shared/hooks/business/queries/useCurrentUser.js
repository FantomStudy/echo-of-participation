import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@api/userApi";
import { useCheckAuth } from "@stores/localStore";

export const useCurrentUser = () => {
  const checkAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchUser,
    enabled: checkAuth,
  });

  return {
    user: data,
    roleName: data?.roleName,
    isLoading,
    error,
  };
};
