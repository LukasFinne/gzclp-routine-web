import { useCurrentDay } from "../../lib/user/hook";
import { Button } from "../button";
import { useCurrentWorkout } from "./hooks";
import { UpdateWorkoutKey } from "./workoutKeys";
import type { User } from "firebase/auth";

export const Train = ({ user }: { user: User }) => {
  const userWorkout = useCurrentDay();
  const currentWorkout = useCurrentWorkout(userWorkout.currentWorkout);

  const handleKeyRotation = () => {
    UpdateWorkoutKey(user, userWorkout.currentWorkout);
  };
  // Tier rotation logic ->
  // 1. tier 1 -> tier 2
  // 2. tier 2 -> tier 3
  // 3. tier 3 -> finish workout
  // Behöver bara ha en failed och success button med sido effekt som next? 
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">{currentWorkout?.name}</h1>
            <ul className="py-6">
              <li>{currentWorkout?.tier1.name}</li>
              <li>
                {currentWorkout?.tier1.protocol.set} X{" "}
                {currentWorkout?.tier1.protocol.reps}
              </li>
              <li>{currentWorkout?.tier1.weight}</li>
            </ul>
            <div className="w-full space-x-4 ">
              <Button style="btn btn-secondary btn-xl sm:btn-md">Failed</Button>
              <Button style="btn btn-primary btn-xl sm:btn-md">Success</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
