import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useUser } from "./lib/hooks";
import { LoadingSpinner } from "./components/loading";

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

const RouterApp = () => {
  const auth = useUser();

  useEffect(() => {
    if (!auth.user && !auth.isLoading) {
      router.invalidate().catch((error: unknown) => {
        console.log(error);
      });
    }
  }, [auth.user, auth.isLoading]);

  if (auth.isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-base-200">
        <LoadingSpinner text="Loading..." />
      </div>
    );
  }

  return <RouterProvider router={router} context={auth} />;
};

const App = () => {
  return (
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  );
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
