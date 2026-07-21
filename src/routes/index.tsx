import { createFileRoute, useRouteContext } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  loader: ({ context }) => {
    if (!context.user && !context.isLoading) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      console.log("does not exist");
    }
  },
});

function Index() {
  const { user, isLoading } = useRouteContext({ from: "/" });

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
  return (
    <div className="hero flex-1">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/*        {user ? <Home user={user} />: <Login />}
 */}
       <p> {user.displayName}</p>
      </div>
    </div>
  );
}
