import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useRouter } from "@tanstack/react-router";


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
