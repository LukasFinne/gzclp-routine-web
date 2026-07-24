import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../components/header";
import type { User } from "firebase/auth";
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
});
