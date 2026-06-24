import { createFileRoute, redirect, useLocation, useRouteContext } from "@tanstack/react-router";
import type { WorkoutData } from "../../lib/workout/workout";
import { Finished } from "../../components/train/finish/finished";
import { NotWorkoutData } from "../../components/train/finish/error";

declare module "@tanstack/react-router" {
  interface HistoryState {
    workouts: WorkoutData | null;
  }
}

export const Route = createFileRoute("/finish/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  const { user } = useRouteContext({ from: "/finish/" });
  if (!user) {
    return <p>Error</p>;
  }
  const location = useLocation();
  const workout = location.state.workouts;

  if (!workout) {
    return <NotWorkoutData />;
  }

  return <Finished workout={workout} />;
}
