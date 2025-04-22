import { useQuery } from "@tanstack/react-query";
import { useCheckAuth } from "@stores/localStore";
import { fetchAllUsers } from "../../api/adminProfileApi";

export const useUsers = () => {
  const checkAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: fetchAllUsers,
    enabled: checkAuth,
  });

  return { users: data, isLoading, error };
};
