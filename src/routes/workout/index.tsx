import {
  createFileRoute,
  redirect,
  useRouteContext,
} from "@tanstack/react-router";
import { Workout } from "../../components/workout/workout";

export const Route = createFileRoute("/workout/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  const { user } = useRouteContext({ from: "/workout/" });
  if (!user) {
    return <p>Error</p>;
  }
  return <Workout user={user} />;
}
