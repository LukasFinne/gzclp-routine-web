import { createFileRoute } from "@tanstack/react-router";
import Login from "../components/login/login";
import { useUser } from "../lib/hooks";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const user = useUser()
  return (
    <div className="hero flex-1">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {user ? 
          <p>Logged in</p>
          :
          <Login />
        }
      </div>
    </div>
  );
}
