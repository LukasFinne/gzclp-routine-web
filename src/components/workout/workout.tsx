import { Button } from "../button";
import { useWorkouts } from "./hooks";

export const Workout = ({ userId }: { userId: string }) => {
  const workout = useWorkouts(userId);
  return (
    <div>
      <h1>{workout?.id}</h1>
      <p>Current workout: {workout?.currentWorkout}</p>
      <Button name="Start workout" style="btn btn-primary" />
    </div>
  );
};
