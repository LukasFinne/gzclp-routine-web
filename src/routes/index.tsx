import { createFileRoute } from "@tanstack/react-router";
import Login from "../components/login";
import { useUser } from "../lib/hooks";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const user = useUser();

  return (
    <div className="">
      {user ? <p>Logged in</p> : <p>Logged out</p>}
      <Login />
    </div>
  );
}
