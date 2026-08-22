import { useNavigate } from "@tanstack/react-router";
import { useReducer } from "react";
import type { WorkoutData, DocumentId } from "../../../lib/workout/types";
import { trainReducer } from "../workoutReducer";

interface UseWorkoutProps {
  userData: WorkoutData;
  currentDay: DocumentId;
}

export const useWorkout = ({ userData, currentDay }: UseWorkoutProps) => {
  const nav = useNavigate();
  const [state, dispatch] = useReducer(trainReducer, {
    workoutData: userData,
    initialState: userData,
    tier: "tier1",
    isFinished: false, // track completion in state
  });

  if (state.isFinished) {
    nav({
      to: "/finish",
      state: (prev) => ({
        ...prev,
        currentDay,
        workout: state.workoutData,
        initialWorkout: state.initialState,
      }),
    }).catch((err: unknown) => {
      console.error("Failed to navigate", err);
    });
  }
  const currentExercise = state.workoutData[state.tier];

  const handleSuccess = () => {
    dispatch({ type: "WORKOUT_SUCCESS" });
  };
  const handleFailure = () => {
    dispatch({ type: "WORKOUT_FAILURE" });
  };

  return {
    currentExercise,
    currentTier: state.tier,
    handleSuccess,
    handleFailure,
  };
};
