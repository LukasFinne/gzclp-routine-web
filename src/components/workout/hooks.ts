import { doc, onSnapshot, writeBatch } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app, db } from "../../lib/firebase";
import { WorkoutDefaultValues } from "./defaults/workouts";

interface Workout {
  id: string;
  currentWorkout: string;
}

export const useWorkouts = (userId: string) => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  useEffect(() => {
    const docRef = doc(db, "users", userId);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = {
            id: snapshot.id,
            ...snapshot.data(),
          } as Workout;
          setWorkout(data);
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
  }, [userId]); 

  return workout;
};

export const setupDefaultWorkouts = async (userId: string) => {
  const batch = writeBatch(db);

  const userRef = doc(db, `users/${userId}`);
  batch.set(userRef, { currentWorkout: "A1" });

  for (const [key, workout] of WorkoutDefaultValues) {
    const docRef = doc(db, `users/${userId}/workouts/${key}`);
    batch.set(docRef, workout);
  }

  await batch.commit();
};
