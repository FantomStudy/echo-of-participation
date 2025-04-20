import { useQuery } from "@tanstack/react-query";
import { useCheckAuth } from "@stores/localStore";
import { fetchTopStudents } from "@features/dashboard/api/dashboardApi";

export const useStudents = () => {
  const checkAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["topStudents"],
    queryFn: () => fetchTopStudents(),
    enabled: checkAuth,
  });

  return { data, isLoading, error };
};
