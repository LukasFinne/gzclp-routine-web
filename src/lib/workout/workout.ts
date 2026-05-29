import type { Tier } from "./tier";

export interface WorkoutData {
  name: string;
  tier1: Tier;
  tier2: Tier;
  tier3: Tier;
}
