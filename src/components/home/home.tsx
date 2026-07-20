import { Link } from "@tanstack/react-router";
import { useCurrentDay } from "../../lib/user/hook";
import type { User } from "firebase/auth/cordova";
import { WorkoutTitle } from "./workoutTitle";
import { WelcomeTitle } from "./welcomeTitle";

interface HomeProps {
  user: User;
}

export const Home = ({ user }: HomeProps) => {

  return (
    <div className="flex flex-col space-y-4 justify-center">
      {workoutDay ? (
        <WorkoutTitle user={user} docId={workoutDay.currentWorkout} />
      ) : (
        <WelcomeTitle />
      )}
      <div className="flex pt-4 justify-center">
        <Link className="btn btn-primary" to="/workout">
          Start workout
        </Link>
      </div>
    </div>
  );
};
