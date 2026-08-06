import {
  createFileRoute,
  redirect,
  useLocation,
  useRouteContext,
} from "@tanstack/react-router";
import type { WorkoutData } from "../../lib/workout/workout";
import { Finished } from "../../components/finish/finished";
import { NotWorkoutData } from "../../components/finish/error";
import { Greeting } from "../../components/finish/components/greeting";
import { Summary } from "../../components/finish/components/summary";
import { Progression } from "../../components/finish/components/progression/progression";
import { UploadButton } from "../../components/finish/components/uploadButton";

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
      throw redirect({
        to: "/login",
        search: {
          redirect: "/workout",
        },
      });
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
