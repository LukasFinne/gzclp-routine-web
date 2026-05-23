import { createFileRoute } from "@tanstack/react-router";
import Login from "../components/login";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="hero flex-1">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Login />
      </div>
    </div>
  );
}
