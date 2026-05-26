import { devtools, persist } from "zustand/middleware";
import type { WorkoutKeys } from "./workoutKeys";
import { create } from "zustand";

interface WorkoutKeyState {
  currentWorkout: WorkoutKeys;
  rotateWorkout: () => void;
}

const KeyStatus: Record<WorkoutKeys, WorkoutKeys> = {
  A1: "B1",
  B1: "A2",
  A2: "B2",
  B2: "A1",
};



export const useWorkoutKeyStore = create<WorkoutKeyState>()(
  devtools(
    persist(
      (set) => ({
        currentWorkout: "A1",
        rotateWorkout: () =>
          set((state) => ({
            currentWorkout: KeyStatus[state.currentWorkout],
          })),
      }),
      {
        name: "workout-key-storage",
      },
    ),
  ),
);
