import { describe, expect, it } from "vitest";
import { trainReducer, type Action, type State } from "./reducer";
import type { TierType } from "../../lib/workout/tier";

describe("trainReducer", () => {
  it("rotate tier1 to tier2", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData(
        { tier1: "squat", tier2: "squat", tier3: "squat" },
        { tier1: 10, tier2: 10, tier3: 10 },
      ),
      isError: false,
      isLoading: false,
      tier: "tier1", // Start at tier1
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        { tier1: "squat", tier2: "squat", tier3: "squat" },
        { tier1: 15, tier2: 10, tier3: 10 },
      ),
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("rotate tier tier2 to tier3", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData(
        { tier1: "squat", tier2: "squat", tier3: "squat" },
        { tier1: 10, tier2: 10, tier3: 10 },
      ),
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        { tier1: "squat", tier2: "squat", tier3: "squat" },
        { tier1: 10, tier2: 15, tier3: 10 },
      ),
      isError: false,
      isLoading: false,
      tier: "tier3",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("new squat weight should be 15", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData(
        { tier1: "squat", tier2: "bench", tier3: "lat" },
        { tier1: 10, tier2: 10, tier3: 10 },
      ),
      isError: false,
      isLoading: false,
      tier: "tier1",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        { tier1: "squat", tier2: "bench", tier3: "lat" },
        { tier1: 15, tier2: 10, tier3: 10 },
      ),
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("new bench weight should be 12.5", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData(
        { tier1: "squat", tier2: "bench", tier3: "squat" },
        { tier1: 10, tier2: 10, tier3: 10 },
      ),
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        { tier1: "squat", tier2: "bench", tier3: "squat" },
        { tier1: 10, tier2: 12.5, tier3: 10 },
      ),
      isError: false,
      isLoading: false,
      tier: "tier3",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("new ohp weight should be 12.5", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData(
        { tier1: "ohp", tier2: "bench", tier3: "squat" },
        { tier1: 10, tier2: 12.5, tier3: 10 },
      ),
      isError: false,
      isLoading: false,
      tier: "tier1",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        { tier1: "ohp", tier2: "bench", tier3: "squat" },
        { tier1: 12.5, tier2: 12.5, tier3: 10 },
      ),
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("new deadlift weight should be 17.5", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData(
        { tier1: "ohp", tier2: "bench", tier3: "deadlift" },
        { tier1: 10, tier2: 12.5, tier3: 12.5 },
      ),
      isError: false,
      isLoading: false,
      tier: "tier3",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        { tier1: "ohp", tier2: "bench", tier3: "deadlift" },
        { tier1: 10, tier2: 12.5, tier3: 17.5 },
      ),
      isError: false,
      isLoading: false,
      tier: "tier1",
    };
    expect(newState).toStrictEqual(expectedState);
  });
});

const createWeightData = (
  name: Record<TierType, string>,
  weights: Partial<Record<TierType, number>>,
) => {
  if (weights.tier1 === undefined) {
    throw new Error("tier1 weight is required");
  }
  if (weights.tier2 === undefined) {
    throw new Error("tier2 weight is required");
  }
  if (weights.tier3 === undefined) {
    throw new Error("tier3 weight is required");
  }

  return {
    name: name.tier1,
    tier1: {
      name: name.tier1,
      protocol: { reps: 2, set: 1 },
      weight: weights.tier1,
    },
    tier2: {
      name: name.tier2,
      protocol: { reps: 2, set: 1 },
      weight: weights.tier2,
    },
    tier3: {
      name: name.tier3,
      protocol: { reps: 2, set: 1 },
      weight: weights.tier3,
    },
  };
};
