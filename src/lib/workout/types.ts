export type DocumentId = "A1" | "A2" | "B1" | "B2";
export type TierType = "tier1" | "tier2" | "tier3";
export type Exercise =
  "Squat" | "Bench" | "OHP" | "Lat pulldown" | "Deadlift" | "Dumbell row";
export type Stage = 1 | 2 | 3;


export interface TierExerciseData {
  exercise: Exercise;
  reps: number;
  set: number;
  stage: Stage;
  weight: number;
}

export interface WorkoutData {
  day: Exercise;
  tier1: TierExerciseData;
  tier2: TierExerciseData;
  tier3: TierExerciseData;
}

export interface UserDoc {
  currentWorkout: DocumentId;
  workouts: Record<DocumentId, WorkoutData>;
}


