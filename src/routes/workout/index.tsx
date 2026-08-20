import {
  createFileRoute,
  Navigate,
  redirect,
  useRouteContext,
} from "@tanstack/react-router";
import { LoadingSpinner } from "../../components/loading";
import { workoutDay } from "../../features/workout/api/workout";
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
      return null;
    }
    return await workoutDay(context.user);
  },
});

function RouteComponent() {
  const { user: auth, isLoading } = useRouteContext({ from: "/workout/" });
  const userData = Route.useLoaderData();

  if (isLoading || !auth) {
    return <LoadingSpinner text="Loading, Please wait" />;
  }

  if (!userData) {
    return <Navigate to="/onboard" replace />
  }

  return <Workout userData={userData.workouts[userData.currentWorkout]} />;
}
