import { useCheckAuth } from "@stores/authStore";
import { useFilterStore } from "@stores/filterStore";
import { useQuery } from "@tanstack/react-query";

import { fetchActivityRating } from "../../api/ratingsApi";

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
    queryKey: ["activityRating", filters],
    queryFn: () =>
      fetchActivityRating({
        filter: filterParams,
        sort: filters.sort,
        customRange: filters.customRange,
      }),
    enabled: isAuth,
  });

  return { data, isLoading, error };
};
