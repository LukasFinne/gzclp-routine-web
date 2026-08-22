import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../features/home/home";
import { BasicHero } from "../components/ui/hero";

export const Route = createFileRoute("/")({
  component: Index,
});

{/*
  <div className="hero flex-1">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <Home />
    </div>
  </div> */}
function Index() {
  return (
    <BasicHero>
      <Home />
    </BasicHero> 
  );
}
