import type { WorkoutData } from "../../../../lib/workout/workout";
import { TierRow } from "./tierRow";

interface ProgressionProps {
  workout: WorkoutData;
  initialWorkout: WorkoutData;
}
export const Progression = ({ workout, initialWorkout }: ProgressionProps) => {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Tier</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Protocol</th>
          </tr>
        </thead>
        <tbody>
          <TierRow
            tier="1"
            initialTier={initialWorkout.tier1}
            currentTier={workout.tier1}
          />
          <TierRow
            tier="2"
            initialTier={initialWorkout.tier2}
            currentTier={workout.tier2}
          />
          <TierRow
            tier="3"
            initialTier={initialWorkout.tier3}
            currentTier={workout.tier3}
          />
        </tbody>
      </table>
    </div>
  );
};
