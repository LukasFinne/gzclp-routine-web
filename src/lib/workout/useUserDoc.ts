import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.ts";
import type { UserDoc } from "./types.ts";

export const useUserDoc = (userId: string) => {
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exists, setExists] = useState<boolean>(true);

  useEffect(() => {
    const docRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        if (!snap.exists()) {
          setExists(false);
          return;
        }

        const data = snap.data();
        if (!("currentWorkout" in data) || !("workouts" in data)) {
          setError("Invalid workout data format.");
          return;
        }

        setUserDoc(data as UserDoc);
      },
      (err) => {
        console.error("Firestore snapshot error:", err);
        setError("Failed to listen for workout updates.");
      },
    );

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return { userDoc, exists, error };
};
