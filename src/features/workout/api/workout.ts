import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import type { UserDoc } from "../../../lib/workout/types";
import { FirebaseError } from "firebase/app";

export async function workoutDay(userId: string): Promise<UserDoc | null> {
  try {
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
  } catch (error) {
    if (error instanceof FirebaseError && error.code === "permission-denied") {
      throw new Error("You do not have permission to view this workout.");
    }

    throw new Error(
      "Failed to connect to workout service. Please check your internet connection.",
    );
  }
}
