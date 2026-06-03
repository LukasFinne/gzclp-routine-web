import type { Name, Tier } from "./tier";


export interface WorkoutData {
  docId: string;
  name: Name;
  tier1: Tier;
  tier2: Tier;
  tier3: Tier;
}
