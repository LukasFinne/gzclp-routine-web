import {
  createFileRoute,
  redirect,
  useRouteContext,
} from "@tanstack/react-router";
import { Workout } from "../../components/workout/workout";
import { LoadingSpinner } from "../../components/loading";
import { getWorkoutDay } from "../../lib/user/hook";
import { Error } from "../../components/error";

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
      console.log("no user found")
      return null;
    }
    return await getWorkoutDay(context.user);
  },
});

function RouteComponent() {
  const { user, isLoading } = useRouteContext({ from: "/workout/" });
  const currentWorkout = Route.useLoaderData();

  if (isLoading || !user) {
    return <LoadingSpinner text="Loading, Please wait" />;
  }

  if (!currentWorkout) {
    return <Error description="User needs to have an workoutDay" error={currentWorkout}/>
  }

  return <Workout user={user} workoutDay={currentWorkout.currentWorkout} />;
}
