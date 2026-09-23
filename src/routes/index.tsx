import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../features/home/home";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex-1 overflow-y-auto bg-base-200">
      <Home />
    </main>
  );
}
