import { createFileRoute, redirect } from "@tanstack/react-router";
import { Train } from "../../components/train/train";

export const Route = createFileRoute("/train/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return <Train />;
}
