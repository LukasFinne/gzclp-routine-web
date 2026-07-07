export type WorkoutDay = "A1" | "A2" | "B1" | "B2";

const DayRotation: Record<WorkoutDay, WorkoutDay> = {
  A1: "B1",
  B1: "A2",
  A2: "B2",
  B2: "A1",
};

export const RotateDay = (day: WorkoutDay) => {
  return DayRotation[day]
};
