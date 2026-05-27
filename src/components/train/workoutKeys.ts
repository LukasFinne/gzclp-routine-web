import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import type { User } from "firebase/auth";

export type WorkoutKeys = "A1" | "A2" | "B1" | "B2";

const KeyStatus: Record<WorkoutKeys, WorkoutKeys> = {
  A1: "B1",
  B1: "A2",
  A2: "B2",
  B2: "A1",
};

export const RotateWorkoutKey = (key: WorkoutKeys) => {
  return KeyStatus[key]
};


export const UpdateWorkoutKey = (user: User, key: WorkoutKeys) => {
  const newKey = RotateWorkoutKey(key);
  const docRef = doc(db, `users/${user.uid}`);
  updateDoc(docRef, {
    currentWorkout: newKey,
  }).catch((error: unknown) => {
    console.log(error);
  });
}