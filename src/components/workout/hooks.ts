import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { Workout } from "./workout";

interface Workout {
  id: string;
  currentWorkout: string;
}

export const useWorkouts = (userId: string) => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  useEffect(() => {
    const docRef = doc(db, "users", userId); 
  
    const unsub = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = {
          id: snapshot.id,
          ...snapshot.data()
        } as Workout
        setWorkout(data);
      } else {
        setWorkout(null); // Handle case where document doesn't exist
      }
    }, (error) => {
      console.error("Error fetching real-time workout:", error);
    });
  
    return () => {
      unsub();
    };
  }, [userId]); // FIX: Added userId to the dependency array

  return workout;
};
