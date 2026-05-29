import type { WorkoutData } from "../../../lib/workout/workout";
import { first_protocol } from "../protocols/protocol_keys";
import { t1_protocols } from "../protocols/tierOne";
import { t3_protocol } from "../protocols/tierThree";
import { t2_protocols } from "../protocols/tierTwo";

const A1: WorkoutData = {
  name: "Squat day",
  tier1: {
    name: "Squat",
    protocol: t1_protocols[first_protocol],
    weight: 20,
  },
  tier2: {
    name: "Bench",
    protocol: t2_protocols[first_protocol],
    weight: 15,
  },
  tier3: {
    name: "Lat pulldown",
    protocol: t3_protocol,
    weight: 10,
  },
};

const A2: WorkoutData = {
  name: "Bench day",
  tier1: {
    name: "Bench",
    protocol: t1_protocols[first_protocol],
    weight: 20,
  },
  tier2: {
    name: "Squat",
    protocol: t2_protocols[first_protocol],
    weight: 15,
  },
  tier3: {
    name: "Lat pulldown",
    protocol: t3_protocol,
    weight: 10,
  },
};

const B1: WorkoutData = {
  name: "OHP day",
  tier1: {
    name: "OHP",
    protocol: t1_protocols[first_protocol],
    weight: 20,
  },
  tier2: {
    name: "Deadlift",
    protocol: t2_protocols[first_protocol],
    weight: 15,
  },
  tier3: {
    name: "Dumbell row",
    protocol: t3_protocol,
    weight: 10,
  },
};

const B2: WorkoutData = {
  name: "Deadlift day",
  tier1: {
    name: "Deadlift",
    protocol: t1_protocols[first_protocol],
    weight: 20,
  },
  tier2: {
    name: "OHP",
    protocol: t2_protocols[first_protocol],
    weight: 15,
  },
  tier3: {
    name: "Dumbell row",
    protocol: t3_protocol,
    weight: 10,
  },
};

export const WorkoutDefaultValues = new Map<string, WorkoutData>([
  ["A1", A1],
  ["A2", A2],
  ["B1", B1],
  ["B2", B2],
]);
