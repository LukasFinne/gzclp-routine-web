import { useEffect, useReducer } from "react";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { trainReducer, type Action } from "./reducer";
import { LoadingSpinner } from "../loading";
import { Error } from "../error";
import type { DocumentId, WorkoutData } from "../../lib/workout/workout";
import { Tier, TIER_CONFIG } from "./tier";
import { useNavigate } from "@tanstack/react-router";

interface WorkoutProps {
  user: User;
  workoutDay: DocumentId;
}

export const Workout = ({ user, workoutDay }: WorkoutProps) => {
  const nav = useNavigate();

  const [workouts, dispatchWorkouts] = useReducer(trainReducer, {
    workoutData: null,
    initialState: null,
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

  useEffect(() => {
    try {
      dispatchWorkouts({ type: "WORKOUT_FETCH_INIT" });
      const docRef = doc(db, `users/${user.uid}/workouts/${workoutDay}`);

      getDoc(docRef)
        .then((data) => {
          const workoutData = {
            docId: data.id,
            ...data.data(),
          } as WorkoutData;

          dispatchWorkouts({
            type: "WORKOUT_FETCH_SUCCESS",
            payload: workoutData,
          });
        })
        .catch((error: unknown) => {
          console.log(error);
          console.log("workout fetch failure getDoc");

          dispatchWorkouts({ type: "WORKOUT_FETCH_FAILURE" });
        });
    } catch (error: unknown) {
      console.log("unexpected workout fetch failure", error);
      dispatchWorkouts({ type: "WORKOUT_FETCH_FAILURE" });
    }
  }, []);

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
