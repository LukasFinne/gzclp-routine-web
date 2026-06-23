import type { WorkoutData } from "../../../lib/workout/workout";
import { Link } from "@tanstack/react-router";

interface FinishedProps {
  data: WorkoutData;
}

export const Finished = ({ data }: FinishedProps) => {
  return (
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Good work! </h1>
      <Link 
        className="btn btn-primary mt-4" 
        to="/finish" 
        search={{ data: data }} // Pass it via state instead of params
      >View Results</Link>
    </div>
  );
};
