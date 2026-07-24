import type { User } from "firebase/auth";
import type { DocumentId } from "../../lib/workout/workout";
import { useWorkoutCollection } from "./hooks";

export const WorkoutTitle = ({
  user,
  docId,
}: {
  user: User;
  docId: DocumentId;
  }) => {
    const workoutDay = useCurrentDay();

  const workout = useWorkoutCollection(user, docId);

  return <h1 className="text-5xl font-bold">{workout?.name}</h1>;
};
