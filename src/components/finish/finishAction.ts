import { doc, writeBatch } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "../../lib/firebase";
import type { WorkoutData } from "../../lib/workout/types";
import { rotateDay } from "../../lib/workout/protocol";

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
      currentWorkout: rotateDay(data.day),
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
