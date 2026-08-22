import {
  createFileRoute,
  Navigate,
  useRouteContext,
  type LinkComponentProps,
} from "@tanstack/react-router";
import { z } from "zod";
import Login from "../../features/login/login";
import { LoadingSpinner } from "../../components/ui/loading";
import { BasicHero } from "../../components/ui/hero";

const loginSearchSchema = z.object({
  redirect: z.custom<LinkComponentProps["to"]>().optional(),
});

export const Route = createFileRoute("/login/")({
  validateSearch: loginSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isLoading } = useRouteContext({ from: "/login/" });
  const { redirect } = Route.useSearch();

  if (isLoading) {
    return <LoadingSpinner text="Loading, Please wait" />;
  }

  if (user && !redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <BasicHero textStyle="text-start">
      <Login redirect={redirect} />
    </BasicHero>
  );
}
