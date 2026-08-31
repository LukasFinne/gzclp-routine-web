export type DocumentId = "A1" | "A2" | "B1" | "B2";
export type TierType = "tier1" | "tier2" | "tier3";

export type Tier1And2Exercise = "Squat" | "Bench" | "Deadlift" | "OHP";
export type Tier3Exercise = "Lat pulldown" | "Dumbell row";
export type Exercise = Tier1And2Exercise | Tier3Exercise;
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
