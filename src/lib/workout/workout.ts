import type { Name, Tier } from "./tier";


export interface WorkoutData {
  docId: DocumentId;
  name: Name;
  tier1: Tier;
  tier2: Tier;
  tier3: Tier;
}


export type DocumentId = "A1" | "A2" | "B1" | "B2"

export const rotateDay = (currentDay: DocumentId) => {
  return dayRotation[currentDay]
}

const dayRotation: Record<DocumentId, DocumentId> = {
  A1: "B1",
  B1: "A2",
  A2: "B2",
  B2: "A1",
};