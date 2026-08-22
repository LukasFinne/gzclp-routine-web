import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../components/layout/header";
import type { User } from "firebase/auth";
import { Error } from "../components/ui/error";

const RootLayout = () => (
  <>
    <div className="flex flex-col h-screen overflow-hidden bg-base-200">
      <Header />
      <Outlet />
    </div>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRouteWithContext<{
  user: User | null;
  isLoading: boolean;
}>()({
  component: RootLayout,
  notFoundComponent: () => (
    <Error
      error={"not found"}
      title="404 - Page Not Found"
      description="The page you are looking for does not exist or has been moved."
    />
  ),
  errorComponent: ({ error }) => {
    return (
      <Error
        error={error}
        title="Something went wrong!"
        description={"An unexpected error occurred."}
      />
    );
  },
});
