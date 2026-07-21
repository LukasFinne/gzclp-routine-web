import {
  createFileRoute,
  redirect,
  useRouteContext,
} from "@tanstack/react-router";
import { Workout } from "../../components/workout/workout";
import { workoutExists } from "../../lib/workout/workout";

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
      return { exists: false };
    }
    const exists = await workoutExists(context.user);
    return { exists };
  },
});

function RouteComponent() {
  const { user, isLoading } = useRouteContext({ from: "/workout/" });
  const { exists } = Route.useLoaderData();

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
  
  return <>
    <p>
      Workout:{ exists ? "true" : "false"}
    </p>
    <Workout user={user} />;
  </>
}
