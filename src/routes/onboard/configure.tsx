import { createFileRoute, redirect } from "@tanstack/react-router";
import { Configure } from "../../features/onboard/configure/components/configure";

export const Route = createFileRoute("/onboard/configure")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/login",
        search: {
          redirect: "/onboard",
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
          redirect: "/onboard",
        },
      });
    }
    return {
      user: context.user,
    };
  },
});

function RouteComponent() {
  const { user } = Route.useLoaderData();
  return <Configure userId={user.uid} />;
}
