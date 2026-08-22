import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoadingSpinner } from "../../components/loading";
import { workoutDay } from "../../features/workout/api/workout";
import { Error } from "../../components/error";
import {WorkoutLayout } from "../../features/workout/components/workoutLayout";
import { Workout } from "../../features/workout/components/workout";


export const Route = createFileRoute("/workout/")({
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
  loader: async ({ context }) => {
    if (!context.user) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/login" });
    }
    const userDoc = await workoutDay(context.user.uid);

    if (!userDoc) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/onboard" });
    }

    return {
      currentDay: userDoc.currentWorkout,
      workoutData: userDoc.workouts[userDoc.currentWorkout],
    };
  },
  pendingComponent: () => <LoadingSpinner text="Loading, Please wait" />,
  errorComponent: ({ error }) => (
    <Error error={error} title="Failed to load workout session" />
  ),
});

function RouteComponent() {
  const { currentDay, workoutData } = Route.useLoaderData();
  return (
    <WorkoutLayout>
      <Workout currentDay={currentDay} userData={workoutData} />
    </WorkoutLayout>
  );
}
