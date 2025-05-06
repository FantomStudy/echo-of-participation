import { useCheckAuth } from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";

import { fetchUserById } from "../api/userApi";

export const useUserById = (id) => {
  const isAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["userById", id],
    queryFn: () => fetchUserById(id),
    enabled: isAuth,
  });

  return { data, isLoading, error };
};
