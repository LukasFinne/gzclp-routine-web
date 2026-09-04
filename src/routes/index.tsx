import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../features/home/home";
import { BasicHero } from "../components/ui/hero";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <BasicHero>
      <Home />
    </BasicHero>
  );
}
