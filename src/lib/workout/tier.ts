import type { TierType } from "./types";

const TierRotation: Record<TierType, TierType> = {
  tier1: "tier2",
  tier2: "tier3",
  tier3: "tier1",
};

export const RotateTier = (current: TierType) => {
  return TierRotation[current];
};