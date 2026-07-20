import { createFileRoute, useRouteContext } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  loader: ({ context }) => {
    if (!context.user) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      console.log("does not exist")
    }
  },
});

function Index() {
  const { user } = useRouteContext({ from: "/" });
  if (!user) {
    return <p>Error</p>;
  }
  return (
    <div className="hero flex-1">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {user.displayName}
      </div>
    </div>
  );
}
