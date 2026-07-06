import { Link } from "@tanstack/react-router";
import { useCurrentDay } from "../../lib/user/hook";
import type { User } from "firebase/auth/cordova";
import { useWorkoutCollection } from "../../lib/hooks";

interface HomeProps {
  user: User;
}

export const Home = ({ user }: HomeProps) => {
  const workoutDay = useCurrentDay();
  const workout = useWorkoutCollection(user, workoutDay.currentWorkout);
  return (
    <div className="flex flex-col space-y-4 justify-center">
      {workout && <h1 className="text-5xl font-bold">{workout.name}</h1>}
      <Link className="btn btn-primary" to="/workout">
        Start workout
      </Link>
    </div>
  );
};
