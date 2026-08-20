import { useReducer } from "react";
import { trainReducer, type Action } from "../workoutReducer";
import { LoadingSpinner } from "../../../components/loading";
import { Error } from "../../../components/error";
import { Tier, TIER_CONFIG } from "./tier";
import { useNavigate } from "@tanstack/react-router";
import type { WorkoutData } from "../../../lib/workout/types";


interface WorkoutProps {
  userData: WorkoutData;
}

export const Workout = ({  userData }: WorkoutProps) => {
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
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          {workouts.isLoading || workouts.workoutData === null ? (
            <LoadingSpinner text="Fetching your workouts" />
          ) : (
            <Tier
              data={workouts.workoutData[workouts.tier]}
              onFail={config.onFail}
              onSuccess={config.onSuccess}
              onClick={(action) => {
                handleOnClick(action);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
