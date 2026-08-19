import {
  createFileRoute,
  Navigate,
  redirect,
  useRouteContext,
} from "@tanstack/react-router";
import { LoadingSpinner } from "../../components/loading";
import { Workout } from "../../components/workout/workout";
import { getWorkoutDay } from "../../lib/user/workout";

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
    return await getWorkoutDay(context.user);
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

  return <Workout user={auth} workoutDay={userData} />;
}
