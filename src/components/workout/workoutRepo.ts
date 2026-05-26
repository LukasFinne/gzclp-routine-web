export interface WorkoutData {
  name: string;
  tier1: tier;
  tier2: tier;
  tier3: tier;
}

export interface protocol {
  reps: number;
  set: number;
}

export interface tier {
  name: string;
  protocol: protocol;
  weight: number;
}
