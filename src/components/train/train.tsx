import { useEffect, useReducer } from "react";
import { Button } from "../button";
import type { User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useCurrentDay } from "../../lib/user/hook";
import { toTrainWorkout, trainReducer } from "./reducer";
import type { WorkoutData } from "../../lib/workout/workout";
import type { TierType } from "../../lib/workout/tier";

export const Train = ({ user }: { user: User }) => {
  const currentDay = useCurrentDay();
  const [workouts, dispatchWorkouts] = useReducer(trainReducer, {
    workoutData: null,
    tier: "tier1",
    isLoading: false,
    isError: false,
  });

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
          const data = snapshot.data() as WorkoutData;
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

  // Tier rotation logic ->
  // 1. tier 1 -> tier 2
  // 2. tier 2 -> tier 3
  // 3. tier 3 -> finish workout
  // Behöver bara ha en failed och success button med sido effekt som next?

  if (workouts.isError) {
    return <p>Something went wrong..</p>;
  }
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          {workouts.isLoading || workouts.workoutData === null ? (
            <p>Loading...</p>
          ) : (
            <WorkoutData
              onSuccess={() => {
                dispatchWorkouts({
                  type: "WORKOUT_ON_SUCCESS",
                });
              }}
              onFailure={() => {
                dispatchWorkouts({
                  type: "WORKOUT_ON_FAILURE",
                });
              }}
              workoutData={workouts.workoutData}
              currentTier={workouts.tier}
            />
          )}
        </div>
      </div>
    </>
  );
};

const WorkoutData = ({
  workoutData,
  currentTier,
  onSuccess,
  onFailure,
}: {
  currentTier: TierType;
  workoutData: WorkoutData;
  onSuccess: () => void;
  onFailure: () => void;
}) => {
  const trainData = toTrainWorkout(currentTier, workoutData);

  return (
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">{trainData.name}</h1>
      <ul className="py-6">
        <li>{trainData.name}</li>
      </ul>
      <div className="w-full space-x-4 ">
        <Button
          onClick={() => {
            onSuccess();
          }}
          style="btn btn-secondary btn-xl sm:btn-md"
        >
          Failed
        </Button>
        <Button
          onClick={() => {
            onFailure();
          }}
          style="btn btn-primary btn-xl sm:btn-md"
        >
          Success
        </Button>
      </div>
    </div>
  );
};
