import { doc, writeBatch } from "firebase/firestore";
import type { WorkoutData } from "../../../lib/workout/workout";
import { db } from "../../../lib/firebase";
import { useUser } from "../../../lib/hooks";
import type { User } from "firebase/auth";

export interface WorkoutState {
  isSuccess: boolean;
  message?: string; 
}

export interface finishData {
  user: User | null;
  data: WorkoutData;
}

export const finishAction = async (
  finishData: finishData,
  prevState: WorkoutState,
): Promise<WorkoutState> => {
  const {user, data } = finishData
  if (!user) {
    return {
      isSuccess: false,
      message: "UnAuthorized"
    }
  }
  console.log("Submitting this data:", data);

  try {
    console.log("initiaing...")
    const docRef = doc(db, `users/${user.uid}/workouts/${data.docId}`)
    const batch = writeBatch(db)
    batch.set(docRef, data, {
      merge: true
    })
    await batch.commit()
    console.log("finished")
    return {
      isSuccess: true,
    }
  } catch(error) {
    console.log(error)
    return {
      message: "Failed to update workout",
      isSuccess: false,
    }
  }
};