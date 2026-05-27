import { useEffect, useState, useTransition } from "react";
import { setupDefaultWorkouts } from "./hooks";
import { Link } from "@tanstack/react-router";
import { useUserCurrentWorkout } from "../../lib/user/hook";

export const WorkoutPage = ({ userId }: { userId: string }) => {
  const workout = useUserCurrentWorkout();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (workout === null) {
      startTransition(async () => {
        try {
          setMessage("");
          // await setupDefaultWorkouts(userId);
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
      <p>Current workout: {workout.currentWorkout}</p>
      <Link className="btn btn-primary" to="/train">
        Start workout
      </Link>
    </div>
  );
};
