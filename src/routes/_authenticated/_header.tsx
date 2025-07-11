import { Outlet, createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/Header/Header";

export const Route = createFileRoute("/_authenticated/_header")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
