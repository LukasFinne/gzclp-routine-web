import type { User } from "firebase/auth";
import type { Name, Tier } from "./tier";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


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


export const workoutExists = async (user: User | null) => {
  try {
    
      if (!user) {
        throw new Error("user is unauthorized")
      }
    
      const userDoc = doc(db, `users/${user.uid}`)
      const data = await getDoc(userDoc)
      console.log(data.exists())
      return data.exists()
    } catch(e) {
      console.log("something unexpected happened!",e)
      throw new Error("something unexpected happened!")
    }
}
