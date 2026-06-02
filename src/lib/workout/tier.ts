import type { protocol } from "./protocol";
import type { Name } from "./workout";

export interface Tier {
  name: Name;
  protocol: protocol;
  weight: number;
}
export type Name =
  | "Squat"
  | "Bench"
  | "OHP"
  | "Lat pulldown"
  | "Deadlift"
  | "Dumbell row";

export type TierType = "tier1" | "tier2" | "tier3" | "finished";
