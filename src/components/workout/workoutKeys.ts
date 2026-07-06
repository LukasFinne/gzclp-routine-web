export type WorkoutKeys = "A1" | "A2" | "B1" | "B2";

const KeyStatus: Record<WorkoutKeys, WorkoutKeys> = {
  A1: "B1",
  B1: "A2",
  A2: "B2",
  B2: "A1",
};

export const RotateWorkoutKey = (key: WorkoutKeys) => {
  return KeyStatus[key]
};
