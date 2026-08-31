import { createFileRoute } from "@tanstack/react-router";
import { Welcome } from "../../features/onboard/components/welcome-onboarding";
import { BasicHero } from "../../components/ui/hero";

export const Route = createFileRoute("/onboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <BasicHero>
      <Welcome />
    </BasicHero>
  );
}
