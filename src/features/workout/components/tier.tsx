import { Button } from "../../../components/button";
import type { TierExerciseData } from "../../../lib/workout/types";
import type { Action } from "../workoutReducer";


export const TIER_CONFIG = {
  tier1: {
    onFail: { type: "WORKOUT_ON_FAILURE" } as Action,
    onSuccess: { type: "WORKOUT_ON_SUCCESS" } as Action,
  },
  tier2: {
    onFail: { type: "WORKOUT_ON_FAILURE" } as Action,
    onSuccess: { type: "WORKOUT_ON_SUCCESS" } as Action,
  },
  tier3: {
    onFail: { type: "WORKOUT_ON_FAILURE_FINISH" } as Action,
    onSuccess: { type: "WORKOUT_ON_SUCCESS_FINISH" } as Action,
  },
}

interface TierProps {
  data: TierExerciseData;
  onFail: Action;
  onSuccess: Action;
  onClick: (action: Action) => void;
}

export const Tier = ({ data, onFail, onSuccess, onClick }: TierProps) => {
  const roundedWeight = Math.round(data.weight);
  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-5xl font-bold">{data.exercise}</h1>
      <div className="flex justify-center space-x-8">
        <div>
          <h2>Weight</h2>
          <p className="font-bold">{roundedWeight} kg</p>
        </div>
        <div>
          <h2>Set x Rep</h2>
          <p className="font-bold">
            {data.set} x {data.reps}
          </p>
        </div>
      </div>
      <div className="w-full space-x-4 ">
        <Button
          onClick={() => {
            onClick(onFail);
          }}
          className="btn btn-secondary btn-xl sm:btn-md"
        >
          Failed
        </Button>
        <Button
          onClick={() => {
            onClick(onSuccess);
          }}
          className="btn btn-primary btn-xl sm:btn-md"
        >
          Success
        </Button>
      </div>
    </div>
  );
};
