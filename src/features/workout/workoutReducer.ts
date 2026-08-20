import type { Exercise, TierType, WorkoutData } from "../../lib/workout/types";
import { protocolsByTier } from "../../lib/workout/protocol";
import { RotateTier } from "../../lib/workout/tier";

const EIGHTY_FIVE_PERCENT = 0.85;
const TWO_POINT_5_KILO = 2.5;
const FIVE_KILO = 5;

export type Action =
  | {
      type: "WORKOUT_ON_SUCCESS";
    }
  | {
      type: "WORKOUT_ON_FAILURE";
    }
  | {
      type: "WORKOUT_ON_FAILURE_FINISH";
    }
  | {
      type: "WORKOUT_ON_SUCCESS_FINISH";
    };

export interface State {
  workoutData: WorkoutData | null;
  initialState: WorkoutData | null;
  tier: TierType;
  isLoading: boolean;
  isError: boolean;
}

export const trainReducer = (state: State, action: Action) => {
  switch (action.type) {
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
        workoutData: updateProtocol(state.workoutData, state.tier),
        tier: RotateTier(state.tier),
      };
    case "WORKOUT_ON_FAILURE_FINISH":
      if (state.workoutData === null) {
        throw new Error("workdata is null");
      }
      return {
        ...state,
        workoutData: updateProtocol(state.workoutData, state.tier),
      };
    case "WORKOUT_ON_SUCCESS_FINISH":
      if (state.workoutData === null) {
        throw new Error("workdata is null");
      }
      return {
        ...state,
        workoutData: updateWeight(state.workoutData, state.tier),
      };
    default:
      throw new Error();
  }
};

export const updateWeight = (
  data: WorkoutData,
  currentTier: TierType,
): WorkoutData => {
  return {
    ...data,
    [currentTier]: {
      ...data[currentTier],
      exercise: data[currentTier].exercise,
      weight:
        currentTier === "tier3"
          ? data[currentTier].weight
          : weightIncrease(
              data[currentTier].exercise,
              data[currentTier].weight,
            ),
    },
  };
};

const weightIncrease = (exercise: Exercise, weight: number): number => {
  switch (exercise) {
    case "Squat":
    case "Deadlift":
      return weight + FIVE_KILO;
    case "OHP":
    case "Bench":
      return weight + TWO_POINT_5_KILO;
    default:
      return weight;
  }
};

export const updateProtocol = (
  data: WorkoutData,
  currentTier: TierType,
): WorkoutData => {
  const newProtocol = protocolsByTier(currentTier);
  console.log("protocol", newProtocol);
  return {
    ...data,
    [currentTier]: {
      ...data[currentTier],
      weight:
        data[currentTier].stage === 3
          ? data[currentTier].weight * EIGHTY_FIVE_PERCENT
          : data[currentTier].weight,
      stage: newProtocol.get(data[currentTier].stage)?.stage,
      reps: newProtocol.get(data[currentTier].stage)?.reps,
      set: newProtocol.get(data[currentTier].stage)?.set,
    },
  };
};
