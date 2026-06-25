import type { WorkoutData } from "../../../lib/workout/workout";
import { Greeting } from "./components/greeting";
import { Summary } from "./components/summary";

interface FinishedProps {
  workout: WorkoutData;
  initialWorkout: WorkoutData;
}

export const Finished = ({ workout, initialWorkout }: FinishedProps) => {
  return (
    <div className="hero bg-base-200 min-h-screen py-8 flex items-center justify-center">
      <div className="hero-content text-center w-full max-w-lg">
        <div className="w-full">
          <Greeting />
          <Summary workout={workout} initialWorkout={initialWorkout} />
        </div>
      </div>
    </div>
  );
};
