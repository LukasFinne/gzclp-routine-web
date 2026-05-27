import { Link } from "@tanstack/react-router";
import { useCurrentDay } from "../../lib/user/hook";

export const WorkoutPage = () => {
  const workout = useCurrentDay();
  
  return (
    <div>
      <p>Current workout: {workout.currentWorkout}</p>
      <Link className="btn btn-primary" to="/train">
        Start workout
      </Link>
    </div>
  );
};
