import { useUserCurrentWorkout } from "../../lib/user/hook";
import { useCurrentWorkout } from "./hooks";
import { UpdateWorkoutKey } from "./workoutKeys";
import { useUser } from "../../lib/hooks";

export const Train = () => {
  const user = useUser();
  const userWorkout = useUserCurrentWorkout();
  const currentWorkout = useCurrentWorkout(userWorkout.currentWorkout);

  const handleKeyRotation = () => {
    if (!user) return;
    UpdateWorkoutKey(user, userWorkout.currentWorkout)
  };

  return (
    <>
      <p>Train Component</p>
      <button className="btn btn-primary" onClick={handleKeyRotation}>
        Rotate
      </button>
      <ul>
        <li>{currentWorkout?.name}</li>
      </ul>
    </>
  );
};
