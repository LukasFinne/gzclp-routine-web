import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import type { WorkoutData } from "../workout/workoutRepo";
import { useUser } from "../../lib/hooks";
import { type WorkoutKeys } from "./workoutKeys";

export const useCurrentWorkout = (currentWorkout: WorkoutKeys) => {
  const user = useUser();
  const [workout, setWorkout] = useState<WorkoutData | null>(null);
  useEffect(() => {
    if (!user) {
      return;
    }
    const docRef = doc(db, `users/${user.uid}/workouts/${currentWorkout}`);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const workout = snapshot.data() as WorkoutData;
          setWorkout(workout);
        } else {
          setWorkout(null);
        }
      },
      (error) => {
        console.error("Error fetching real-time workout:", error);
      },
    );

    return () => {
      unsub();
    };
  }, [user, currentWorkout]);

  return workout;
};
