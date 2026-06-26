import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { useRouter } from "@tanstack/react-router";
import { doc, onSnapshot } from "firebase/firestore";
import type { WorkoutData } from "./workout/workout";


export const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // 1. Wrap the listener in useEffect so it only runs once on mount
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      router.invalidate().catch(() => {
        console.log("failed to invalidate");
      });
    });

    // 2. Return the unsubscribe function to clean up the listener on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return user;
};

export const useWorkoutCollection = (user: User, docId: string) => {
  const [workout, setWorkout] = useState<WorkoutData | null>(null);

  useEffect(() => {
    try {
      const docRef = doc(db, `users/${user.uid}/workouts/${docId}`);
      const unsub = onSnapshot(
        docRef,
        (snapshot) => {
          const data = {
            docId: snapshot.id,
            ...snapshot.data(),
          } as WorkoutData;
          setWorkout(data);
        },
        (error) => {
          throw error;
        },
      );
      return () => {
        unsub();
      };
    } catch (error: unknown) {
      console.log(error);
      setWorkout(null);
    }
  }, [user, docId]);
  return workout;
};
