import { doc, writeBatch } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "../../../lib/firebase";
import type { DocumentId, WorkoutData } from "../../../lib/workout/types";
import { rotateDay } from "../../../lib/workout/protocol";

export interface WorkoutState {
  isSuccess: boolean;
  message?: string;
}

export interface finishData {
  user: User | null;
  data: {
    workout: WorkoutData;
    currentDay: DocumentId;
  }
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
      currentWorkout: rotateDay(data.currentDay),
      workouts: {
        [data.currentDay]: data.workout, 
      },
    };
    const batch = writeBatch(db);
    batch.set(userDocRef, newWorkoutDay, {
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
