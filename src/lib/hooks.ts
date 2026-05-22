import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // 1. Wrap the listener in useEffect so it only runs once on mount
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    // 2. Return the unsubscribe function to clean up the listener on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return user;
};
