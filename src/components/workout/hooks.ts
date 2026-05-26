import { doc, writeBatch } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { WorkoutDefaultValues } from "./defaults/workouts";

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
