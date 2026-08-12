import { useEffect, useReducer } from "react";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { trainReducer } from "./reducer";
import { LoadingSpinner } from "../loading";
import { Error } from "../error";
import type { DocumentId } from "../../lib/workout/workout";

interface WorkoutProps{
  user: User
  workoutDay: DocumentId
}

export const Workout = ({ user, workoutDay}: WorkoutProps) => {
  const [workouts, dispatchWorkouts] = useReducer(trainReducer, {
    workoutData: null,
    initialState: null,
    tier: "tier1",
    isLoading: false,
    isError: false,
  });

  /* const handleOnClick = (action: Action) => {
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
    }; */

  useEffect(() => {
    try {
      dispatchWorkouts({ type: "WORKOUT_FETCH_INIT" });
      console.log("workout init fetch", user.uid)
      const docRef = doc(
        db,
        `users/${user.uid}/workouts/${workoutDay}`,
      );

       getDoc(docRef).then((data) => {
         const docId = {
           docId: data.id
         }
         console.log("workout success", data)

         dispatchWorkouts({ type: "WORKOUT_FETCH_SUCCESS", payload: docId.docId });
       }).catch((error: unknown) => {
         console.log(error);
         console.log("workout fetch failure getDoc")

         dispatchWorkouts({ type: "WORKOUT_FETCH_FAILURE" });
       })
    } catch(error: unknown) {
      console.log("unexpected workout fetch failure",error)
      dispatchWorkouts({ type: "WORKOUT_FETCH_FAILURE" });
    }
  }, []);

  if (workouts.isError) {
    console.log(workouts.isError)
    return <Error error={workouts.isError} title="something happened when loading workouts" />;
  }

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          {workouts.isLoading || workouts.workoutData === null ? (
            <LoadingSpinner text="Fetching your workouts" />
          ) : (
              <p>
                {typeof workouts.workoutData === "string"
                  ? workouts.workoutData
                  : workouts.workoutData.tier1.name}
              </p>
          )}
        </div>
      </div>
    </>
  );
};
