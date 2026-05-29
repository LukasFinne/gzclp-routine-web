import type { protocol } from "./protocol";

export interface Tier {
  name: string;
  protocol: protocol;
  weight: number;
}

export type TierType = "tier1" | "tier2" | "tier3"