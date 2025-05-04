import { useQuery } from "@tanstack/react-query";
import { useCheckAuth } from "@stores/authStore";
import { fetchActivityRating } from "@dashboard/api/ratingsApi";
import { useFilterStore } from "@stores/filterStore";

export const useActivityRating = () => {
  const isAuth = useCheckAuth();
  const filters = useFilterStore((state) => state.filters);

  const filterParams =
    filters.filterType === "departments"
      ? "allDepartments"
      : filters.filterType === "groupes"
      ? `department:${filters.id}`
      : filters.filterType === "journal"
      ? `groupe:${filters.id}`
      : `allGroupes`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["activityRating", filterParams],
    queryFn: () => fetchActivityRating(filterParams),
    enabled: isAuth,
  });

  return { data, isLoading, error };
};
