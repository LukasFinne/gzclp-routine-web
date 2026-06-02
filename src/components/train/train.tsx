import { useEffect, useReducer } from "react";
import type { User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useCurrentDay } from "../../lib/user/hook";
import { trainReducer, type Action } from "./reducer";
import type { WorkoutData } from "../../lib/workout/workout";
import type { TierType } from "../../lib/workout/tier";
import { Tier } from "./tier";
import { Finished } from "./finish/finished";

export const Train = ({ user }: { user: User }) => {
  const currentDay = useCurrentDay();
  const [workouts, dispatchWorkouts] = useReducer(trainReducer, {
    workoutData: null,
    tier: "tier1",
    isLoading: false,
    isError: false,
  });

  const handleOnClick = (action: Action) => {
    dispatchWorkouts(action);
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
            ...snapshot.data()
          } as WorkoutData
          
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
    return <p>Something went wrong..</p>;
  }

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          {workouts.isLoading || workouts.workoutData === null ? (
            <p>Loading...</p>
          ) : (
            <GetTier
              currentTier={workouts.tier}
              data={workouts.workoutData}
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
interface GetTierProps {
  currentTier: TierType;
  data: WorkoutData;
  onClick: (action: Action) => void;
}

export const GetTier = ({ currentTier, data, onClick }: GetTierProps) => {
  const tiers = {
    tier1: <Tier data={data.tier1} onClick={onClick} />,
    tier2: <Tier data={data.tier2} onClick={onClick} />,
    tier3: <Tier data={data.tier3} onClick={onClick} />,
    finished: <Finished data={data} />,
  };

  return tiers[currentTier];
};
