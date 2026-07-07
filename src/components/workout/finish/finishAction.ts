import { doc, writeBatch } from "firebase/firestore";
import {
  rotateDay,
  type WorkoutData,
} from "../../../lib/workout/workout";
import { db } from "../../../lib/firebase";
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
  _prevState: WorkoutState | null,
): Promise<WorkoutState> => {
  const { user, data } = finishData;
  if (!user) {
    return {
      isSuccess: false,
      message: "UnAuthorized",
    };
  }

  try {
    console.log("initiaing...");
    const userDocRef = doc(db, `users/${user.uid}`);
    const newWorkoutDay = {
      currentWorkout: rotateDay(data.docId),
    };
    const workoutDataRef = doc(db, `users/${user.uid}/workouts/${data.docId}`);
    const batch = writeBatch(db);
    batch.set(userDocRef, newWorkoutDay, {
      merge: true,
    });
    batch.set(workoutDataRef, data, {
      merge: true,
    });
    await batch.commit();
    console.log("finished");
    return {
      isSuccess: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to update workout",
      isSuccess: false,
    };
  }
};
