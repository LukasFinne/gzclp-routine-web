import { createFileRoute } from "@tanstack/react-router";
import { ConfigureLayout } from "../../components/onboard/configure/configure";
import { Steps } from "../../components/onboard/configure/steps";
import { Button } from "../../components/button";

export const Route = createFileRoute("/onboard/configure")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ConfigureLayout
      steps={<Steps />}
      content={<p>content</p>}
      leftButton={<Button className="btn btn-secondary w-full">Back</Button>}
      rightButton={<Button className="btn btn-primary w-full">Next</Button>}
    />
  );
}
