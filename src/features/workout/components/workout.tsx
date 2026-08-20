import { useReducer } from "react";
import { trainReducer, type Action } from "../workoutReducer";
import { Error } from "../../../components/error";
import { useNavigate } from "@tanstack/react-router";
import type { DocumentId, WorkoutData } from "../../../lib/workout/types";
import { Exercise } from "./exercise";
import { WorkoutButtons } from "./workoutButtons";
import { TIER_CONFIG } from "../types";

interface WorkoutProps {
  userData: WorkoutData;
  currentDay: DocumentId;
}
export const Workout = ({ userData, currentDay }: WorkoutProps) => {
  const nav = useNavigate();
  const [workouts, dispatchWorkouts] = useReducer(trainReducer, {
    workoutData: userData,
    initialState: userData,
    tier: "tier1",
    isLoading: false,
    isError: false,
  });

  const config = TIER_CONFIG[workouts.tier];

  const handleOnClick = (action: Action) => {
    dispatchWorkouts(action);
    if (
      action.type === "WORKOUT_ON_FAILURE_FINISH" ||
      action.type === "WORKOUT_ON_SUCCESS_FINISH"
    ) {
      nav({
        to: "/finish",
        state: (prev) => ({
          ...prev,
          currentDay: currentDay,
          workout: workouts.workoutData,
          initialWorkout: workouts.initialState,
        }),
      }).catch(() => {
        console.log("failed to navigate");
      });
    }
  };

  if (workouts.isError) {
    console.log(workouts.isError);
    return (
      <Error
        error={workouts.isError}
        title="something happened when loading workouts"
      />
    );
  }

  return (
    <>
      <Exercise data={workouts.workoutData[workouts.tier]} />
      <WorkoutButtons
        onFail={config.onFail}
        onClick={(action) => {
          handleOnClick(action);
        }}
        onSuccess={config.onSuccess}
      />
    </>
  );
};
