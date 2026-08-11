import {
  Await,
  createFileRoute,
  defer,
  redirect,
  useRouteContext,
} from "@tanstack/react-router";
import { Workout } from "../../components/workout/workout";
import { workoutExists } from "../../lib/workout/workout";
import { Suspense } from "react";
import { setupDefaultWorkouts } from "../../components/workout/defaultWorkouts";
import { LoadingSpinner } from "../../components/loading";

export const Route = createFileRoute("/workout/")({
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
  loader: async ({ context }) => {

    console.log("exists check user:", context.user?.uid)
    const exists = await workoutExists(context.user);
    console.log("exists check result: ", exists)

    if (!exists) {
      const generationPromise = setupDefaultWorkouts(context.user);
      return {
        exists: false,
        generationPromise: defer(generationPromise),
      };
    }

    return {
      exists: true,
      generationPromise: null,
    };
  },
});

function RouteComponent() {
  const { user, isLoading } = useRouteContext({ from: "/workout/" });
  const { exists, generationPromise } = Route.useLoaderData();

  if (isLoading || !user) {
    return (
      <LoadingSpinner text="Loading, Please wait"/>
    );
  }

  if (!exists && generationPromise) {
    return (
      <Suspense
        fallback={
          <LoadingSpinner text="Setting up your account..." />
        }
      >
        <Await promise={generationPromise}>
          {() => <Workout user={user} />}
        </Await>
      </Suspense>
    );
  }

  return <Workout user={user} />;
}
