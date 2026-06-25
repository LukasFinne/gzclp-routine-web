import type { WorkoutData } from "../../../../lib/workout/workout"
import { Progression } from "./progression/progression"
import { UploadButton } from "./uploadButton"

interface SummaryProps {
  workout: WorkoutData
  initialWorkout: WorkoutData
}

export const Summary = ({workout, initialWorkout}: SummaryProps) => (
  <div className="card bg-base-100 shadow-xl border border-base-300">
    <div className="card-body p-6">
      <h2 className="card-title justify-center text-xl font-bold">
        Workout Summary
      </h2>
      <div className="divider my-2"></div>
      <Progression workout={workout} initialWorkout={initialWorkout} />
      <UploadButton workout={workout}/>
    </div>
  </div>
)
