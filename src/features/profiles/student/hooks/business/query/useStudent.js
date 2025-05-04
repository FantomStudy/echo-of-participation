import { useCheckAuth } from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { fetchStudent } from "../../../api/studentApi";

export const useStudent = (id) => {
  const isAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["student", id],
    queryFn: () => fetchStudent(id),
    enabled: isAuth,
  });

  return { data, isLoading, error };
};
