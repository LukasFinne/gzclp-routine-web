import type { TierType } from "../../lib/workout/tier";
import type { Name, WorkoutData } from "../../lib/workout/workout";

export type Action =
  | {
      type: "WORKOUT_FETCH_INIT";
    }
  | {
      type: "WORKOUT_FETCH_SUCCESS";
      payload: WorkoutData;
    }
  | {
      type: "WORKOUT_FETCH_FAILURE";
    }
  | {
      type: "WORKOUT_ON_SUCCESS";
    }
  | {
      type: "WORKOUT_ON_FAILURE";
    };

const TierRotation: Record<TierType, TierType> = {
  tier1: "tier2",
  tier2: "tier3",
  tier3: "finished",
  finished: "finished",
};

const RotateTier = (current: TierType) => {
  return TierRotation[current];
};

export interface State {
  workoutData: WorkoutData | null;
  tier: TierType;
  isLoading: boolean;
  isError: boolean;
}

export const trainReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "WORKOUT_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "WORKOUT_FETCH_SUCCESS":
      return {
        ...state,
        workoutData: action.payload,
        isLoading: false,
        isError: false,
      };
    case "WORKOUT_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "WORKOUT_ON_SUCCESS":
      if (state.workoutData === null) {
        throw new Error("workdata is null");
      }
      return {
        ...state,
        workoutData: updateWeight(state.workoutData, state.tier),
        tier: RotateTier(state.tier),
      };
    case "WORKOUT_ON_FAILURE":
      if (state.workoutData === null) {
        throw new Error("workdata is null");
      }
      return {
        ...state,
        tier: RotateTier(state.tier),
      };
    default:
      throw new Error();
  }
};

export const updateWeight = (
  data: WorkoutData,
  currentTier: TierType,
): WorkoutData => {
  if (currentTier === "finished") {
    return data;
  }

  return {
    ...data,
    [currentTier]: {
      ...data[currentTier],
      name: `Workout Day`,
      weight:
        currentTier === "tier3"
          ? data[currentTier].weight
          : weightIncrease(data[currentTier].name, data[currentTier].weight),
    },
  };
};

const weightIncrease = (name: Name, weight: number): number => {
  switch (name) {
    case "Squat":
    case "Deadlift":
      return weight + 5;
    case "OHP":
    case "Bench":
      return weight + 2.5;
    default:
      return weight;
  }
};
