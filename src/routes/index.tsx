import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../components/home/home";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="hero flex-1">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Home />
      </div>
    </div>
  );
}
