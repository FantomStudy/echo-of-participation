import { useQuery } from "@tanstack/react-query";
import { useCheckAuth } from "@stores/localStore";
import { fetchTableData } from "../../api/dashboardApi";

export const useDashboardTable = () => {
  const checkAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardTable"],
    queryFn: () => fetchTableData({}),
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
