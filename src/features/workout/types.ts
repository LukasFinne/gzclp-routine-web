import type { Action } from "./workoutReducer";

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
};
