import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useUser } from "../hooks";
import type { WorkoutKeys } from "../../components/train/workoutKeys";

interface User {
  currentWorkout: WorkoutKeys;
}

export const useUserCurrentWorkout = () => {
  const firebaseUser = useUser();
  const [user, setUser] = useState<User>({currentWorkout: "A1"});
  useEffect(() => {
    if (!firebaseUser) {
      return;
    }
    
    const docRef = doc(db, "users", firebaseUser.uid);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        const data: User = snapshot.data() as User;
        setUser(data);
      },
      (error) => {
        console.error("Error fetching real-time workout:", error);
      },
    );

    return () => {
      unsub();
    };
  }, [firebaseUser]);

  return user;
};
