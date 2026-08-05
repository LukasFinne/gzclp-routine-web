import type { WorkoutData } from "../../../lib/workout/workout";
import { t1_protocols } from "../protocols/tierOne";
import { t3_protocols } from "../protocols/tierThree";
import { t2_protocols } from "../protocols/tierTwo";

const p1 = t1_protocols.get(1);
const p2 = t2_protocols.get(1);
const p3 = t3_protocols.get(1);

if (!p1 || !p2 || !p3) {
  throw new Error("Default workout protocols (index 1) are missing.");
}

const A1: WorkoutData = {
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

const A2: WorkoutData = {
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

const B1: WorkoutData = {
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

const B2: WorkoutData = {
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

export const WorkoutDefaultValues = new Map<string, WorkoutData>([
  ["A1", A1],
  ["A2", A2],
  ["B1", B1],
  ["B2", B2],
]);

