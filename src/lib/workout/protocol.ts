import { t1_protocols } from "../../components/workout/protocols/tierOne";
import { t3_protocols } from "../../components/workout/protocols/tierThree";
import { t2_protocols } from "../../components/workout/protocols/tierTwo";
import type { TierType } from "./tier";

export interface protocol {
  reps: number;
  set: number;
  stage: Stage;
}


export type Stage = 1 | 2 | 3

export const ProtocolsByTier = (currentTier: TierType) => {
  switch (currentTier) {
    case "tier1":
      return t1_protocols;
    case "tier2":
      return t2_protocols;
    case "tier3":
      return t3_protocols;
    default:
      throw new Error("Something unexpected happened with protcols")
  }
};
