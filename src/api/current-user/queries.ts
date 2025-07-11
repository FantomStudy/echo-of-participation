import { queryOptions } from "@tanstack/react-query";

import { fetchCurrentUser } from "./api";

export const currentUserQuery = () =>
  queryOptions({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
  });
