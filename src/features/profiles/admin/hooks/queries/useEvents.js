import { useQuery } from "@tanstack/react-query";
import { fetchAllEvents } from "../../api/adminProfileApi";
import { useCheckAuth } from "@stores/authStore";

export const useEvents = () => {
  const checkAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchAllEvents,
    enabled: checkAuth,
  });

  return { events: data, isLoading, error };
};
