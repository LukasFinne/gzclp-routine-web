import type { Protocol } from "./protocol";

export interface Tier {
  name: Name;
  protocol: Protocol;
  weight: number;
}
export type Name =
  | "Squat"
  | "Bench"
  | "OHP"
  | "Lat pulldown"
  | "Deadlift"
  | "Dumbell row";

export type TierType = "tier1" | "tier2" | "tier3";
