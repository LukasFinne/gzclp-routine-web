import { Link } from "@tanstack/react-router";
import { WelcomeTitle } from "./welcomeTitle";

export const Home = () => {
  return (
    <div className="flex flex-col space-y-4 justify-center">
      <WelcomeTitle />
      <div className="flex pt-4 justify-center">
        <Link className="btn btn-primary" to="/workout">
          Start workout
        </Link>
      </div>
    </div>
  );
};
