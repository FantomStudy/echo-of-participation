import { useRouteContext } from "@tanstack/react-router";

export const useAuthContext = () => {
  return useRouteContext({
    from: "/_authenticated",
    select: (c) => c.currentUser,
  });
};
