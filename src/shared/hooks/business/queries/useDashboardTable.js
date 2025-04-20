import { useQuery } from "@tanstack/react-query";
import { fetchTableDataApi } from "@features/dashboard/api/dashboardApi";
import { useCheckAuth } from "@stores/localStore";

export const useDashboardTable = () => {
  const checkAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardTable"],
    queryFn: () => fetchTableDataApi({}),
    enabled: checkAuth,
  });

  return {
    events: data?.eventList,
    students: data?.studentList,
    attendance: data?.attendanceData,
    isLoading,
    error,
  };
};
