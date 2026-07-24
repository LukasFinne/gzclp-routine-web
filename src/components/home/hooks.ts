import { doc, onSnapshot, writeBatch } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { WorkoutDefaultValues } from "./defaults/workouts";
import type { User } from "firebase/auth";
import type { WorkoutData } from "../../lib/workout/workout";
import { useEffect, useState } from "react";

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



export const useWorkoutCollection = (user: User , docId: string) => {
  const [workout, setWorkout] = useState<WorkoutData | null>(null);

  useEffect(() => {
    try {
      const docRef = doc(db, `users/${user.uid}/workouts/${docId}`);
      const unsub = onSnapshot(
        docRef,
        (snapshot) => {
          const data = {
            docId: snapshot.id,
            ...snapshot.data(),
          } as WorkoutData;
          setWorkout(data);
        },
        (error) => {
          throw error;
        },
      );
      return () => {
        unsub();
      };
    } catch (error: unknown) {
      console.log(error);
      setWorkout(null);
    }
  }, [user, docId]);
  return workout;
};
