import { createFileRoute } from "@tanstack/react-router";
import { Configure } from "../../features/onboard/configure/configure";

export const Route = createFileRoute("/onboard/configure")({
  component: RouteComponent,
});


function RouteComponent() {
  return (
    <Configure/>
  );
}
