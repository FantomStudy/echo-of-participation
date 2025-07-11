import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_header/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/login"!</div>;
}
