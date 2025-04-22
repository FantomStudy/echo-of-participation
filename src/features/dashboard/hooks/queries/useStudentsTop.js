import { useQuery } from "@tanstack/react-query";
import { useCheckAuth } from "@stores/localStore";
import { fetchTopStudents } from "../../api/dashboardApi";

export const useStudentsTop = () => {
  const checkAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["topStudents"],
    queryFn: () => fetchTopStudents(),
    enabled: checkAuth,
  });

  return { entities: data, isLoading, error };
};
