import {
  createFileRoute,
  redirect,
  useLocation,
  useRouteContext,
} from "@tanstack/react-router";
import { Finished } from "../../features/finish/components/finished";
import { Greeting } from "../../features/finish/components/greeting";
import { Summary } from "../../features/finish/components/summary";
import { Progression } from "../../features/finish/components/progression/progression";
import { UploadButton } from "../../features/finish/components/uploadButton";
import { LoadingSpinner } from "../../components/ui/loading";
import { Error } from "../../components/ui/error";
import type { DocumentId, WorkoutData } from "../../lib/workout/types";

declare module "@tanstack/react-router" {
  interface HistoryState {
    currentDay: DocumentId;
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
  const { workout, initialWorkout, currentDay } = location.state;

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
        <UploadButton userId={user.uid} workout={workout} currentDay={currentDay} />
      </Summary>
    </Finished>
  );
}
