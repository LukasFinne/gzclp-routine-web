import { useEffect, useReducer } from "react";
import type { User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useCurrentDay } from "../../lib/user/hook";
import { trainReducer, type Action } from "./reducer";
import type { WorkoutData } from "../../lib/workout/workout";
import { Tier, TIER_CONFIG } from "./tier";
import { useNavigate } from "@tanstack/react-router";
import { LoadingSpinner } from "../loading";
import { Error } from "../error";

export const Workout = ({ user }: { user: User }) => {
  const currentDay = useCurrentDay();
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
      const docRef = doc(
        db,
        `users/${user.uid}/workouts/${currentDay.currentWorkout}`,
      );

      const unsub = onSnapshot(
        docRef,
        (snapshot) => {
          const data = {
            docId: snapshot.id,
            ...snapshot.data(),
          } as WorkoutData;

          dispatchWorkouts({ type: "WORKOUT_FETCH_SUCCESS", payload: data });
        },
        (error) => {
          console.log(error);
          dispatchWorkouts({ type: "WORKOUT_FETCH_FAILURE" });
        },
      );
      return () => {
        unsub();
      };
    } catch {
      dispatchWorkouts({ type: "WORKOUT_FETCH_FAILURE" });
    }
  }, [currentDay]);

  if (workouts.isError) {
    return <Error />
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
