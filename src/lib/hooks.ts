import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import type { AnyRouter } from "@tanstack/react-router";

export const useUser = (router?: AnyRouter) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
      if (router) {
        router.invalidate().catch(() => {
          console.log("failed to invalidate");
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  return { user, isLoading };
};

