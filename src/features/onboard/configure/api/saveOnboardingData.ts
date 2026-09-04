import type { State } from "../reducer";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { mapStateToUserDoc } from "./saveOnboardingDataMapper.ts";

export interface SaveOnboardingResult {
  isSuccess: boolean;
  message?: string;
}

export const saveOnboardingData = async (
  userId: string,
  state: State,
): Promise<SaveOnboardingResult> => {
  try {
    const docRef = doc(db, "users", userId);
    const userDoc = mapStateToUserDoc(state);

    await setDoc(docRef, userDoc, { merge: true });

    return {
      isSuccess: true,
    };
  } catch (error: unknown) {
    console.error("Failed to save onboarding data:", error);
    return {
      isSuccess: false,
      message: "Failed to save onboarding data.",
    };
  }
};
