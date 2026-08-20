import type { DocumentId, Stage, TierType } from "./types";

export const rotateDay = (currentDay: DocumentId) => {
  return dayRotation[currentDay];
};

const dayRotation: Record<DocumentId, DocumentId> = {
  A1: "B1",
  B1: "A2",
  A2: "B2",
  B2: "A1",
};

export const t1_protocols = new Map<
  Stage,
  { reps: number; set: number; stage: number }
>([
  [1, { reps: 2, set: 6, stage: 2 }],
  [2, { reps: 1, set: 10, stage: 3 }],
  [3, { reps: 3, set: 5, stage: 1 }],
]);
export const t2_protocols = new Map<
  Stage,
  { reps: number; set: number; stage: number }
>([
  [1, { reps: 8, set: 3, stage: 2 }],
  [2, { reps: 6, set: 3, stage: 3 }],
  [3, { reps: 10, set: 3, stage: 1 }],
]);

export const t3_protocols = new Map<
  Stage,
  { reps: number; set: number; stage: number }
>([
  [1, { reps: 15, set: 3, stage: 2 }],
  [2, { reps: 15, set: 3, stage: 3 }],
  [3, { reps: 15, set: 3, stage: 1 }],
]);

export const protocolsByTier = (currentTier: TierType) => {
  switch (currentTier) {
    case "tier1":
      return t1_protocols;
    case "tier2":
      return t2_protocols;
    case "tier3":
      return t3_protocols;
    default:
      throw new Error("Something unexpected happened with protcols");
  }
};
