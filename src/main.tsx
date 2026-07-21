import { StrictMode, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { useUser } from "./lib/hooks";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    user: null,
    isLoading: true,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const { user, isLoading } = useUser(router);
  const context = useMemo(() => ({ user, isLoading }), [user, isLoading]);
  return <RouterProvider router={router} context={context} />;
};

// Render the app
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
