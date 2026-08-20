import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import type { UserDoc } from "../../../lib/workout/types";

export async function workoutDay(user: User): Promise<UserDoc | null> {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();
  if (!("currentWorkout" in data)) {
    return null;
  }

  return data as UserDoc;
}