import { useEffect, useState, useTransition } from "react";
import { Button } from "../button";
import { setupDefaultWorkouts, useWorkouts } from "./hooks";

export const WorkoutPage = ({ userId }: { userId: string }) => {
  const workout = useWorkouts(userId);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (workout === null) {
      startTransition(async () => {
        try {
          setMessage("");
          await setupDefaultWorkouts(userId);
        } catch (error) {
          console.log(error);
          setMessage("Failed to setup user");
        }
      });
    }
  }, [workout]);

  if (workout === null) {
    return (
      <>
        {isPending && (
          <>
            <p>Creating new accont</p>
            <p>Please wait... </p>
          </>
        )}

        <p>{message}</p>
      </>
    );
  }

  return (
    <div>
      <h1>{workout.id}</h1>
      <p>Current workout: {workout.currentWorkout}</p>
      <Button name="Start workout" style="btn btn-primary" />
    </div>
  );
};
