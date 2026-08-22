import type { DocumentId, WorkoutData } from "../../../lib/workout/types";
import { useWorkout } from "../hooks/useWorkout";
import { Exercise } from "./exercise";
import { WorkoutButtons } from "./workoutButtons";

interface WorkoutProps {
  userData: WorkoutData;
  currentDay: DocumentId;
}

export const Workout = ({ userData, currentDay }: WorkoutProps) => {
  const { currentExercise, handleSuccess, handleFailure } = useWorkout({
    userData,
    currentDay,
  });

  return (
    <>
      <Exercise data={currentExercise} />
      <WorkoutButtons onSuccess={handleSuccess} onFailure={handleFailure} />
    </>
  );
};
