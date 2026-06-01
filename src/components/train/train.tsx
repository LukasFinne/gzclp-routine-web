import { useEffect, useReducer } from "react";
import { Button } from "../button";
import type { User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useCurrentDay } from "../../lib/user/hook";
import { trainReducer, type Action } from "./reducer";
import type { WorkoutData } from "../../lib/workout/workout";
import type { Tier, TierType } from "../../lib/workout/tier";

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
    tier1: <TierComponent trainData={data.tier1} onClick={onClick} />,
    tier2: <TierComponent trainData={data.tier2} onClick={onClick} />,
    tier3: <TierComponent trainData={data.tier3} onClick={onClick} />,
    finished: <p>Finished</p>,
  };

  return tiers[currentTier];
};

const TierComponent = ({
  trainData,
  onClick,
}: {
  trainData: Tier;
  onClick: (action: Action) => void;
}) => {
  return (
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">{trainData.name}</h1>
      <ul className="py-6">
        <li>{trainData.name}</li>
      </ul>
      <div className="w-full space-x-4 ">
        <Button
          onClick={() => {
            onClick({ type: "WORKOUT_ON_SUCCESS" });
          }}
          className="btn btn-secondary btn-xl sm:btn-md"
        >
          Failed
        </Button>
        <Button
          onClick={() => {
            onClick({ type: "WORKOUT_ON_FAILURE" });
          }}
          className="btn btn-primary btn-xl sm:btn-md"
        >
          Success
        </Button>
      </div>
    </div>
  );
};
