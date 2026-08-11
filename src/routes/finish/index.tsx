import {
  createFileRoute,
  redirect,
  useLocation,
  useRouteContext,
} from "@tanstack/react-router";
import type { WorkoutData } from "../../lib/workout/workout";
import { Finished } from "../../components/finish/finished";
import { Greeting } from "../../components/finish/components/greeting";
import { Summary } from "../../components/finish/components/summary";
import { Progression } from "../../components/finish/components/progression/progression";
import { UploadButton } from "../../components/finish/components/uploadButton";
import { LoadingSpinner } from "../../components/loading";
import { Error } from "../../components/error";

declare module "@tanstack/react-router" {
  interface HistoryState {
    workout: WorkoutData | null;
    initialWorkout: WorkoutData | null;
  }
}

export const Route = createFileRoute("/finish/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.user && !context.isLoading) {
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
  const { user, isLoading } = useRouteContext({ from: "/finish/" });
  const location = useLocation();
  const { workout, initialWorkout } = location.state;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Error error={user} />;
  }

  if (!workout || !initialWorkout) {
    return (
      <Error
        error={workout}
        title="No Data"
        description="It seems you reached this page directly or did not complete a
    workout."
      />
    );
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
