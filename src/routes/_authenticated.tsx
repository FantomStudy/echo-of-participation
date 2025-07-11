import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { currentUserQuery } from "@/api/current-user/queries";

export const Route = createFileRoute("/_authenticated")({
  component: RouteLayout,
  beforeLoad: async ({ context, location }) => {
    try {
      const currentUser =
        await context.queryClient.ensureQueryData(currentUserQuery());

      return {
        currentUser,
      };
    } catch (err) {
      console.error("Failed to load current user data", err);
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
});

function RouteLayout() {
  return <Outlet />;
}
