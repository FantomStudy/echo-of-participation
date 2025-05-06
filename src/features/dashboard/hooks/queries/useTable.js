import { useCheckAuth } from "@stores/authStore";
import { useFilterStore } from "@stores/filterStore";
import { useQuery } from "@tanstack/react-query";

import { fetchTableData } from "../../api/tableApi";

export const useTable = () => {
  const isAuth = useCheckAuth();
  const filters = useFilterStore((state) => state.filters);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tableData", filters],
    queryFn: () =>
      fetchTableData({
        type: filters.filterType,
        id: filters.id,
        sort: filters.sort,
        customRange: filters.customRange,
      }),
    enabled: isAuth,
  });

  return {
    events: data?.events,
    entities: data?.entities,
    traffic: data?.traffic,
    isLoading,
    error,
  };
};
