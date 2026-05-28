import { useEffect, useReducer } from "react";
import { Button } from "../button";
import type { User } from "firebase/auth";
import type { WorkoutData } from "../workout/workoutRepo";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useCurrentDay } from "../../lib/user/hook";
import { toTrainWorkout, trainReducer, type Tier } from "./reducer";

export const Train = ({ user }: { user: User }) => {
  const currentDay = useCurrentDay();
  const [workouts, dispatchWorkouts] = useReducer(trainReducer, {
    workoutData: null,
    tier: "T1",
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
              onSuccess={(currentTier) => {
                dispatchWorkouts({
                  type: "WORKOUT_ON_SUCCESS",
                  payload: currentTier,
                });
              }}
              onFailure={(currentTier) => {
                dispatchWorkouts({
                  type: "WORKOUT_ON_FAILURE",
                  payload: currentTier,
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
  currentTier: Tier;
  workoutData: WorkoutData;
  onSuccess: (currentTier: Tier) => void;
  onFailure: (currentTier: Tier) => void;
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
            onSuccess(currentTier);
          }}
          style="btn btn-secondary btn-xl sm:btn-md"
        >
          Failed
        </Button>
        <Button
          onClick={() => {
            onFailure(currentTier);
          }}
          style="btn btn-primary btn-xl sm:btn-md"
        >
          Success
        </Button>
      </div>
    </div>
  );
};
