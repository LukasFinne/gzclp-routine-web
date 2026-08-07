import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../components/header";
import type { User } from "firebase/auth";
import { Error } from "../components/error";
{
  /* <div className="p-2 flex gap-2">
    <Link to="/" className="[&.active]:font-bold">
      Home
    </Link>{" "}
    <Link to="/about" className="[&.active]:font-bold">
      About
    </Link>
  </div> */
}
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
             title="404 - Page Not Found"
             description="The page you are looking for does not exist or has been moved."
           />
  ),
  errorComponent: ({ error }) => {
    console.log(error)
    return (
      <Error
        title="Something went wrong!"
        description={"An unexpected error occurred."}
      />
    )
  },
});
