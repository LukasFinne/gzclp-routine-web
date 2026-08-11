import {
  createFileRoute,
  redirect,
  useRouteContext,
} from "@tanstack/react-router";
import { Workout } from "../../components/workout/workout";
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
});

function RouteComponent() {
  const { user, isLoading } = useRouteContext({ from: "/workout/" });

  if (isLoading || !user) {
    return (
      <LoadingSpinner text="Loading, Please wait"/>
    );
  }

  return <Workout user={user} />;
}
