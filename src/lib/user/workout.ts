import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { User } from "firebase/auth";

export type DocumentId = "A1" | "A2" | "B1" | "B2"

export const rotateDay = (currentDay: DocumentId) => {
  return dayRotation[currentDay]
}

const dayRotation: Record<DocumentId, DocumentId> = {
  A1: "B1",
  B1: "A2",
  A2: "B2",
  B2: "A1",
};


export interface UserDoc {
  currentWorkout: DocumentId;
  workouts: Record<DocumentId, DayWorkoutData>;
}

export interface DayWorkoutData {
  day: Exercise;
  tier1: TierExerciseData;
  tier2: TierExerciseData;
  tier3: TierExerciseData;
}

export type TierType = "tier1" | "tier2" | "tier3";

interface TierExerciseData {
  exercise: Exercise;
  reps: number;
  set: number;
  stage: Stage;
  weight: number;
}


export const ProtocolsByTier = (currentTier: TierType) => {
  switch (currentTier) {
    case "tier1":
      return t1_protocols;
    case "tier2":
      return t2_protocols;
    case "tier3":
      return t3_protocols;
    default:
      throw new Error("Something unexpected happened with protcols")
  }
};

type Stage = 1 | 2 | 3;

type Exercise =
  "Squat" | "Bench" | "OHP" | "Lat pulldown" | "Deadlift" | "Dumbell row";

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
