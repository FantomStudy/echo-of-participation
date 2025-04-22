import { fetchAllEvents } from "../../api/adminProfileApi";
import { useCheckAuth } from "@stores/localStore";
import { useQuery } from "@tanstack/react-query";

export const useEvents = () => {
  const checkAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchAllEvents,
    enabled: checkAuth,
  });

  return { events: data, isLoading, error };
};
