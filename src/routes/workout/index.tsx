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
    if (!context.user) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({ to: "/" });
    }
  },
  loader: async ({ context }) => {
    const exists  = await workoutExists(context.user!)
    return { exists }
  }
});

function RouteComponent() {
  const { user } = useRouteContext({ from: "/workout/" });
  const { exists } = Route.useLoaderData();
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
