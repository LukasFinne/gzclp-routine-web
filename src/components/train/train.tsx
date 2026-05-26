import { useCurrentWorkout } from "./hooks";
import { useWorkoutKeyStore } from "./state";

export const Train = () => {
  const currentWorkoutKey = useWorkoutKeyStore()
  const currentWorkout = useCurrentWorkout(currentWorkoutKey.currentWorkout);

  const handleKeyRotation = () => {
    currentWorkoutKey.rotateWorkout()
  }

  
  return (
    <>
      <p>Train Component</p>
      <button className="btn btn-primary" onClick={handleKeyRotation}>Rotate</button>
      <ul>
        <li>{currentWorkout?.name}</li>
      </ul>
    </>
  );
};
