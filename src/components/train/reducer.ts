import type { WorkoutData } from "../workout/workoutRepo";

type Action =
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
      payload: Tier;
    }
  | {
      type: "WORKOUT_ON_FAILURE";
      payload: Tier;
    };

export type Tier = "T1" | "T2" | "T3";

const TierRotation: Record<Tier, Tier> = {
  T1: "T2",
  T2: "T3",
  T3: "T1",
};

const RotateTier = (current: Tier) => {
  return TierRotation[current];
};
export const toTrainWorkout = (state: Tier, data: WorkoutData) => {
  switch (state) {
    case "T1":
      return {
        name: data.tier1.name,
        protocol: data.tier1.protocol,
        weight: data.tier1.weight,
      };
    case "T2":
      return {
        name: data.tier2.name,
        protocol: data.tier2.protocol,
        weight: data.tier2.weight,
      };
    case "T3":
      return {
        name: data.tier3.name,
        protocol: data.tier3.protocol,
        weight: data.tier3.weight,
      };
  }
};

interface State {
  workoutData: WorkoutData | null;
  tier: Tier;
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
      return {
        ...state,
        tier: RotateTier(action.payload),
      };
    case "WORKOUT_ON_FAILURE":
      return {
        ...state,
        tier: RotateTier(action.payload),
      };
    default:
      throw new Error();
  }
};
