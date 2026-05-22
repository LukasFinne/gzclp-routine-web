import { createFileRoute } from "@tanstack/react-router";
import Login from "../components/login";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="">
      <Login/> 
    </div>
  );
}
