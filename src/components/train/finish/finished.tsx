import { useActionState } from "react";
import type { WorkoutData } from "../../../lib/workout/workout";
import { finishAction } from "./finishAction";
import { Button } from "../../button";
import { useUser } from "../../../lib/hooks";
import { Link } from "@tanstack/react-router";

interface FinishedProps {
  workout: WorkoutData;
}

export const Finished = ({ workout }: FinishedProps) => {
  const user = useUser();
  const [state, action, isPending] = useActionState(
    finishAction.bind(null, { user, data: workout }),
    null
  );
  
  return (
    <div className="hero bg-base-200 min-h-screen py-8 flex items-center justify-center">
      <div className="hero-content text-center w-full max-w-lg">
        <div className="w-full">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold text-success tracking-tight">Workout Finished!</h1>
            <p className="mt-2 text-base-content/70">
              Great job!
            </p>
          </div>
          
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body p-6">
              <h2 className="card-title justify-center text-xl font-bold">Workout Summary</h2>
              <div className="divider my-2"></div>
              
              <div className="overflow-x-auto">
                <table className="table w-full text-left">
                  <thead>
                    <tr className="border-b border-base-300">
                      <th className="font-semibold text-base-content/60">Tier</th>
                      <th className="font-semibold text-base-content/60">Exercise</th>
                      <th className="font-semibold text-base-content/60 text-right">Weight</th>
                      <th className="font-semibold text-base-content/60 text-right">Protocol</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover border-b border-base-200">
                      <td className="">T1</td>
                      <td className="font-medium">{workout.tier1.name}</td>
                      <td className="text-right font-mono">{workout.tier1.weight} kg</td>
                      <td className="text-right font-mono">{workout.tier1.protocol.set}x{workout.tier1.protocol.reps}</td>
                    </tr>
                    <tr className="hover border-b border-base-200">
                      <td className="">T2</td>
                      <td className="font-medium">{workout.tier2.name}</td>
                      <td className="text-right font-mono">{workout.tier2.weight} kg</td>
                      <td className="text-right font-mono">{workout.tier2.protocol.set}x{workout.tier2.protocol.reps}</td>
                    </tr>
                    <tr className="hover border-0">
                      <td className="">T3</td>
                      <td className="font-medium">{workout.tier3.name}</td>
                      <td className="text-right font-mono">{workout.tier3.weight} kg</td>
                      <td className="text-right font-mono">{workout.tier3.protocol.set}x{workout.tier3.protocol.reps}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {state?.isSuccess ? (
                <div className="flex flex-col items-center mt-6 gap-4">
                  <div role="alert" className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Workout uploaded successfully!</span>
                  </div>
                  <Link to="/" className="btn btn-primary">
                    Go to Home
                  </Link>
                </div>
              ) : (
                <form action={action} className="card-actions justify-center mt-6 w-full flex flex-col items-center gap-2">
                  <Button type="submit" style="btn btn-primary" disabled={isPending} className="w-full">
                    {isPending ? "Uploading..." : "Upload workout"}
                  </Button>
                  {state?.message && (
                    <div role="alert" className="alert alert-error mt-4 text-left">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{state.message}</span>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
