import { useQuery } from "@tanstack/react-query";
import { fetchUserApi } from "@api/userApi";
import { useCheckAuth } from "@stores/localStore";

export const useUserData = () => {
  const checkAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserApi,
    enabled: checkAuth,
  });

  return {
    user: data,
    roleName: data?.roleName,
    isLoading: isLoading,
    error: error,
  };
};
