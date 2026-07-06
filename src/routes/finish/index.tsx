import {
  createFileRoute,
  redirect,
  useLocation,
  useRouteContext,
} from "@tanstack/react-router";
import type { WorkoutData } from "../../lib/workout/workout";
import { Finished } from "../../components/workout/finish/finished";
import { NotWorkoutData } from "../../components/workout/finish/error";
import { Greeting } from "../../components/workout/finish/components/greeting";
import { Summary } from "../../components/workout/finish/components/summary";
import { Progression } from "../../components/workout/finish/components/progression/progression";
import { UploadButton } from "../../components/workout/finish/components/uploadButton";

declare module "@tanstack/react-router" {
  interface HistoryState {
    workout: WorkoutData | null;
    initialWorkout: WorkoutData | null;
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
  const { workout, initialWorkout } = location.state;

  if (!workout || !initialWorkout) {
    return <NotWorkoutData />;
  }

  return (
    <Finished>
      <Greeting />
      <Summary>
        <Progression workout={workout} initialWorkout={initialWorkout} />
        <UploadButton workout={workout} />
      </Summary>
    </Finished>
  );
}
