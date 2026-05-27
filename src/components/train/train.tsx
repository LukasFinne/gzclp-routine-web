import { useCurrentDay } from "../../lib/user/hook";
import { Button } from "../button";
import { useCurrentWorkout } from "./hooks";
import { UpdateWorkoutKey } from "./workoutKeys";
import type { User } from "firebase/auth";

export const Train = ({ user }: { user: User }) => {
  const userWorkout = useCurrentDay();
  const currentWorkout = useCurrentWorkout(userWorkout.currentWorkout);

  const handleKeyRotation = () => {
    UpdateWorkoutKey(user, userWorkout.currentWorkout);
  };

  return (
    <>
      <p>Train Component</p>
      <Button style="btn btn-primary" name="rotateBtn" onClick={handleKeyRotation}>Rotate</Button>
      <ul> 
        <li>{currentWorkout?.name}</li>
      </ul>
    </>
  );
};
