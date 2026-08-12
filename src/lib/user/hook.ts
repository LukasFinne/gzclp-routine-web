import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { DocumentId } from "../workout/workout";
import type { User } from "firebase/auth";

interface UserDoc {
  currentWorkout: DocumentId;
}

export async function getWorkoutDay(user: User | null) {
  try {
    if (!user) {
      throw new Error("no user found in getWorkoutDay")
    }
    const docRef = doc(db, "users", user.uid);
    const data = await getDoc(docRef)  
    return  data.data() as UserDoc
  } catch(error: unknown) {
    console.error("Error fetching getWorkoutDay:", error);
  }
}
