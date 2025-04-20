import { fetchAllEvents } from "@/features/profile/admin/api/adminProfileApi";
import { useCheckAuth } from "@stores/localStore";
import { useQuery } from "@tanstack/react-query";

export const useEvents = () => {
  const checkAuth = useCheckAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["adminPageEvents"],
    queryFn: fetchAllEvents,
    enabled: checkAuth,
  });

  return { events: data, isLoading, error };
};
