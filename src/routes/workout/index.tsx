import {createFileRoute, Navigate, redirect} from "@tanstack/react-router";
import { LoadingSpinner } from "../../components/ui/loading";
import { Error } from "../../components/ui/error";
import { WorkoutLayout } from "../../features/workout/components/workoutLayout";
import { Workout } from "../../features/workout/components/workout";
import {useUserDoc} from "../../lib/workout/useUserDoc.ts";

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
  loader: ({ context }) => {
    if (!context.user) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/login",
        search: {
          redirect: "/workout",
        },
      });
    }
    return {
      user: context.user,
    };
  },
  pendingComponent: () => <LoadingSpinner text="Loading, Please wait" />,
  errorComponent: ({ error }) => (
    <Error error={error} title="Failed to load workout session" />
  ),
});

function RouteComponent() {
  const { user } = Route.useLoaderData();

  const {userDoc, exists , error} = useUserDoc(user.uid);


  if (!exists){
    return <Navigate to={"/onboard"}/>
  }

  if (error) {
    return <Error error={error} title="Failed to load workout session" />;
  }

  if (!userDoc) {
    return <LoadingSpinner text="Loading workout data..." />;
  }

  return (
    <WorkoutLayout>
      <Workout
        currentDay={userDoc.currentWorkout}
        userData={userDoc.workouts[userDoc.currentWorkout]}
      />
    </WorkoutLayout>
  );
}
