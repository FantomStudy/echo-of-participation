import { useQuery } from "@tanstack/react-query";

import { fetchOrganizersRating } from "./api";

export const useOrganizersRating = () =>
  useQuery({
    queryKey: ["organizersRating"],
    queryFn: fetchOrganizersRating,
  });
