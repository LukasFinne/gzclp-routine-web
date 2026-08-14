import { createFileRoute } from "@tanstack/react-router";
import { Welcome } from "../../components/onboard/welcome-onboarding";

export const Route = createFileRoute("/onboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <Welcome />
      </div>
    </div>
  );
}
