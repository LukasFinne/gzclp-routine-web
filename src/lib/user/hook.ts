import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useUser } from "../hooks";

interface User {
  currentWorkout: string;
}

export const useUserCurrentWorkout = () => {
  const firebaseUser = useUser();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!firebaseUser) {
      return;
    }
    
    const docRef = doc(db, "users", firebaseUser.uid);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data: User = snapshot.data() as User;

          setUser(data);
        } else {
          setUser(null);
        }
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
