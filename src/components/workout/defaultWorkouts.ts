import { doc, writeBatch } from "firebase/firestore";
import type { WorkoutData } from "../../lib/workout/workout";
import { t1_protocols } from "../home/protocols/tierOne";
import { t3_protocols } from "../home/protocols/tierThree";
import { t2_protocols } from "../home/protocols/tierTwo";
import { db } from "../../lib/firebase";

const A1: WorkoutData = {
  docId: "A1",
  name: "Squat",
  tier1: {
    name: "Squat",
    protocol: t1_protocols.get(1)!,
    weight: 20,
  },
  tier2: {
    name: "Bench",
    protocol: t2_protocols.get(1)!,
    weight: 15,
  },
  tier3: {
    name: "Lat pulldown",
    protocol: t3_protocols.get(1)!,
    weight: 10,
  },
};

const A2: WorkoutData = {
  docId: "A2",
  name: "Bench",
  tier1: {
    name: "Bench",
    protocol: t1_protocols.get(1)!,
    weight: 20,
  },
  tier2: {
    name: "Squat",
    protocol: t2_protocols.get(1)!,
    weight: 15,
  },
  tier3: {
    name: "Lat pulldown",
    protocol: t3_protocols.get(1)!,
    weight: 10,
  },
};

const B1: WorkoutData = {
  docId: "B1",
  name: "OHP",
  tier1: {
    name: "OHP",
    protocol: t1_protocols.get(1)!,
    weight: 20,
  },
  tier2: {
    name: "Deadlift",
    protocol: t2_protocols.get(1)!,
    weight: 15,
  },
  tier3: {
    name: "Dumbell row",
    protocol: t3_protocols.get(1)!,
    weight: 10,
  },
};

const B2: WorkoutData = {
  docId: "B2",
  name: "Deadlift",
  tier1: {
    name: "Deadlift",
    protocol: t1_protocols.get(1)!,
    weight: 20,
  },
  tier2: {
    name: "OHP",
    protocol: t2_protocols.get(1)!,
    weight: 15,
  },
  tier3: {
    name: "Dumbell row",
    protocol: t3_protocols.get(1)!,
    weight: 10,
  },
};

export const WorkoutDefaultValues = new Map<string, WorkoutData>([
  ["A1", A1],
  ["A2", A2],
  ["B1", B1],
  ["B2", B2],
]);

export const setupDefaultWorkouts = async (userId: string) => {
  const batch = writeBatch(db);

  const userRef = doc(db, `users/${userId}`);
  batch.set(userRef, { currentWorkout: "A1" });

  for (const [key, workout] of WorkoutDefaultValues) {
    const docRef = doc(db, `users/${userId}/workouts/${key}`);
    batch.set(docRef, workout);
  }

  await batch.commit();
};