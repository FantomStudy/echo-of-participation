import { useQuery } from "@tanstack/react-query";
import { useCheckAuth } from "@stores/authStore";
import { fetchDiagramTop } from "@dashboard/api/ratingsApi";

export const useDiagramTop = () => {
  const isAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["diagramTop"],
    queryFn: () => fetchDiagramTop(),
    enabled: isAuth,
  });

  return { data, isLoading, error };
};
