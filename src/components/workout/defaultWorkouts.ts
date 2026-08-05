import { doc, writeBatch, type Firestore } from "firebase/firestore";
import type { WorkoutData } from "../../lib/workout/workout";
import { t1_protocols } from "../home/protocols/tierOne";
import { t3_protocols } from "../home/protocols/tierThree";
import { t2_protocols } from "../home/protocols/tierTwo";
import { db as defaultDb } from "../../lib/firebase";

/**
 * Pure function: Generates default workout values safely without side effects.
 */
export const getWorkoutDefaultValues = (
  t1 = t1_protocols,
  t2 = t2_protocols,
  t3 = t3_protocols
): Map<string, WorkoutData> => {
  const p1 = t1.get(1);
  const p2 = t2.get(1);
  const p3 = t3.get(1);

  if (!p1 || !p2 || !p3) {
    throw new Error("Default workout protocols (index 1) are missing.");
  }

  const A1_Workout: WorkoutData = {
    docId: "A1",
    name: "Squat",
    tier1: {
      name: "Squat",
      protocol: p1,
      weight: 20,
    },
    tier2: {
      name: "Bench",
      protocol: p2,
      weight: 15,
    },
    tier3: {
      name: "Lat pulldown",
      protocol: p3,
      weight: 10,
    },
  };

  const A2_Workout: WorkoutData = {
    docId: "A2",
    name: "Bench",
    tier1: {
      name: "Bench",
      protocol: p1,
      weight: 20,
    },
    tier2: {
      name: "Squat",
      protocol: p2,
      weight: 15,
    },
    tier3: {
      name: "Lat pulldown",
      protocol: p3,
      weight: 10,
    },
  };

  const B1_Workout: WorkoutData = {
    docId: "B1",
    name: "OHP",
    tier1: {
      name: "OHP",
      protocol: p1,
      weight: 20,
    },
    tier2: {
      name: "Deadlift",
      protocol: p2,
      weight: 15,
    },
    tier3: {
      name: "Dumbell row",
      protocol: p3,
      weight: 10,
    },
  };

  const B2_Workout: WorkoutData = {
    docId: "B2",
    name: "Deadlift",
    tier1: {
      name: "Deadlift",
      protocol: p1,
      weight: 20,
    },
    tier2: {
      name: "OHP",
      protocol: p2,
      weight: 15,
    },
    tier3: {
      name: "Dumbell row",
      protocol: p3,
      weight: 10,
    },
  };

  return new Map<string, WorkoutData>([
    ["A1", A1_Workout],
    ["A2", A2_Workout],
    ["B1", B1_Workout],
    ["B2", B2_Workout],
  ]);
};

export const WorkoutDefaultValues = getWorkoutDefaultValues();

/**
 * Pure helper: Returns batch path and document payload data without side effects.
 */
export const getInitialUserBatchPayload = (
  userId: string,
  defaultWorkouts = getWorkoutDefaultValues()
) => {
  return {
    userPath: `users/${userId}`,
    userData: { currentWorkout: "A1" },
    workouts: Array.from(defaultWorkouts.entries()).map(([key, workout]) => ({
      path: `users/${userId}/workouts/${key}`,
      data: workout,
    })),
  };
};

/**
 * Sets up default workouts in Firestore using dependency injection.
 */
export const setupDefaultWorkouts = async (
  userId: string,
  db: Firestore = defaultDb,
  defaultWorkouts = getWorkoutDefaultValues()
) => {
  if (!userId.trim()) {
    throw new Error("userId is required to set up default workouts.");
  }

  const batch = writeBatch(db);
  const { userPath, userData, workouts } = getInitialUserBatchPayload(
    userId,
    defaultWorkouts
  );

  const userRef = doc(db, userPath);
  batch.set(userRef, userData);

  for (const { path, data } of workouts) {
    const docRef = doc(db, path);
    batch.set(docRef, data);
  }

  await batch.commit();
};