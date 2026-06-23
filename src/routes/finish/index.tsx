import { createFileRoute, useLocation, Link } from '@tanstack/react-router'
import type { WorkoutData } from '../../lib/workout/workout'

declare module '@tanstack/react-router' {
  interface HistoryState {
    workouts: WorkoutData | null
  }
}

export const Route = createFileRoute('/finish/')({
  component: RouteComponent
})

function RouteComponent() {
  const location = useLocation()
  const workoutData = location.state.workouts

  if (!workoutData) {
    return (
      <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-extrabold text-error">No Workout Data</h1>
            <p className="py-6 text-base-content/70">
              It seems you reached this page directly or did not complete a workout.
            </p>
            <Link to="/" className="btn btn-primary">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

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
              Great job completing <strong className="text-base-content font-semibold">{workoutData.name}</strong>!
            </p>
          </div>
          
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body p-6">
              <h2 className="card-title justify-center text-primary text-xl font-bold">Workout Summary</h2>
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
                      <td className="font-bold text-secondary">T1</td>
                      <td className="font-medium">{workoutData.tier1.name}</td>
                      <td className="text-right font-mono">{workoutData.tier1.weight} kg</td>
                      <td className="text-right font-mono">{workoutData.tier1.protocol.set}x{workoutData.tier1.protocol.reps}</td>
                    </tr>
                    <tr className="hover border-b border-base-200">
                      <td className="font-bold text-secondary">T2</td>
                      <td className="font-medium">{workoutData.tier2.name}</td>
                      <td className="text-right font-mono">{workoutData.tier2.weight} kg</td>
                      <td className="text-right font-mono">{workoutData.tier2.protocol.set}x{workoutData.tier2.protocol.reps}</td>
                    </tr>
                    <tr className="hover border-0">
                      <td className="font-bold text-secondary">T3</td>
                      <td className="font-medium">{workoutData.tier3.name}</td>
                      <td className="text-right font-mono">{workoutData.tier3.weight} kg</td>
                      <td className="text-right font-mono">{workoutData.tier3.protocol.set}x{workoutData.tier3.protocol.reps}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="card-actions justify-center mt-6">
                <Link to="/" className="btn btn-primary btn-block">
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
