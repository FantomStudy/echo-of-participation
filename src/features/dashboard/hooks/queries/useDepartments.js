import { useQuery } from "@tanstack/react-query";
import { fetchDepartments } from "../../api/dashboardApi";
import { useCheckAuth } from "@/shared/stores/localStore";

export const useDepartments = () => {
  const checkAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
    enabled: checkAuth,
  });

  return { departments: data, isLoading, error };
};
