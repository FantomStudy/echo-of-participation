import { useCheckAuth } from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";

import { fetchDepartments } from "../../api/dashboardApi";

export const useDepartments = () => {
  const isAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
    enabled: isAuth,
  });

  return { data, isLoading, error };
};
