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

export const Route = createFileRoute("/workout/")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.user && !context.isLoading) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/login" });
    }
  },
  loader: async ({ context }) => {
    if (!context.user) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/login" });
    }

    const exists = await workoutExists(context.user);

    if (!exists) {
      const generationPromise = setupDefaultWorkouts(context.user.uid);
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

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <p>Error</p>;
  }

  if (!exists && generationPromise) {
    return (
      <Suspense
        fallback={
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-lg font-semibold">Setting up your account...</p>
          </div>
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
