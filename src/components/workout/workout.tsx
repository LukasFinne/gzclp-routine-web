import { useState, useTransition } from "react";
import { Button } from "../button";
import { setupDefaultWorkouts, useWorkouts } from "./hooks";

export const WorkoutPage = ({ userId }: { userId: string }) => {
  const workout = useWorkouts(userId);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const handleNewUser = () => {
    startTransition(async () => {
      try {
        setMessage("");
        await setupDefaultWorkouts(userId);
      } catch (error) {
        console.log(error);
        setMessage("Failed to setup user");
      }
    });
  };

  if (workout === null) {
    return ( <>
      <p>{isPending ? "Loading" : ""}</p>
      <button className="btn btn-primary" onClick={handleNewUser}>
        Setup new user
      </button>
    </>)
  }

  return (
    <div>
      <h1>{workout?.id}</h1>
      <p>Current workout: {workout?.currentWorkout}</p>
      <Button name="Start workout" style="btn btn-primary" />
    </div>
  );
};
