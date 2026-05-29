import { describe, expect, it } from "vitest";
import { trainReducer, type Action, type State } from "./reducer";
import type { TierType } from "../../lib/workout/tier";

describe("trainReducer", () => {
  it("rotate tier1 to tier2", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData({ tier1: 10 }),
      isError: false,
      isLoading: false,
      tier: "tier1",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData({ tier1: 12.5 }),
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("rotate tier tier2 to tier3", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData({ tier2: 10 }),
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData({ tier2: 12.5 }),
      isError: false,
      isLoading: false,
      tier: "tier3",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("Change weight on success", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData({ tier1: 10 }),
      isError: false,
      isLoading: false,
      tier: "tier1",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData({ tier1: 12.5 }),
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    expect(newState).toStrictEqual(expectedState);
  });
});

const createWeightData = (weights: Partial<Record<TierType, number>>) => {
  return {
    name: "squat",
    tier1: {
      name: "squat",
      protocol: {
        reps: 2,
        set: 1,
      },
      weight: weights.tier1 ?? 10,
    },
    tier2: {
      name: "squat",
      protocol: {
        reps: 2,
        set: 1,
      },
      weight: weights.tier2 ?? 10,
    },
    tier3: {
      name: "squat",
      protocol: {
        reps: 2,
        set: 1,
      },
      weight: weights.tier3 ?? 10,
    },
  };
};
