import { useCheckAuth } from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { fetchRoles } from "../../api/addUserApi";

export const useRoles = () => {
  const isAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
    enabled: isAuth,
  });

  return { data, isLoading, error };
};
