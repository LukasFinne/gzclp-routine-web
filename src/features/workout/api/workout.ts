import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import type { UserDoc } from "../../../lib/workout/types";

export async function workoutDay(userId: string): Promise<UserDoc | null> {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();
  if (!("currentWorkout" in data) || !("workouts" in data)) {
    return null;
  }

  return data as UserDoc;
}
