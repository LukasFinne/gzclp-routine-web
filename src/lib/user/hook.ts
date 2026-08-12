import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { DocumentId } from "../workout/workout";
import type { User } from "firebase/auth";

export interface UserDoc {
  currentWorkout: DocumentId;
}

export async function getWorkoutDay(user: User): Promise<UserDoc | null> {
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

