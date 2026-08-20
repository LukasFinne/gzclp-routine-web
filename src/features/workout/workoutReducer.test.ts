import { describe, expect, it } from "vitest";
import { trainReducer, updateProtocol, type Action, type State } from "./workoutReducer";
import type { TierType, Stage, Exercise } from "../../lib/workout/types";


describe("trainReducer", () => {
  it("rotate tier1 to tier2", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData(
        { tier1: "Squat", tier2: "Bench", tier3: "Squat" },
        { tier1: 10, tier2: 10, tier3: 10 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier1", // Start at tier1
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        {
          root: "Squat",
          tier1: "Squat",
          tier2: "Bench",
          tier3: "Squat",
        },
        { tier1: 15, tier2: 10, tier3: 10 },
      ),
      initialState: null,
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
        { tier1: "Squat", tier2: "Deadlift", tier3: "Squat" },
        { tier1: 10, tier2: 10, tier3: 10 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        {
          tier1: "Squat",
          tier2: "Deadlift",
          tier3: "Squat",
        },
        { tier1: 10, tier2: 15, tier3: 10 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier3",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("new Squat weight should be 15", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData(
        {
          tier1: "Squat",
          tier2: "Bench",
          tier3: "Lat pulldown",
        },
        { tier1: 10, tier2: 10, tier3: 10 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier1",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        {
          root: "Squat",
          tier1: "Squat",
          tier2: "Bench",
          tier3: "Lat pulldown",
        },
        { tier1: 15, tier2: 10, tier3: 10 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("new Bench weight should be 12.5", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData(
        {
          tier1: "Squat",
          tier2: "Bench",
          tier3: "Squat",
        },
        { tier1: 10, tier2: 10, tier3: 10 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        {
          tier1: "Squat",
          tier2: "Bench",
          tier3: "Squat",
        },
        { tier1: 10, tier2: 12.5, tier3: 10 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier3",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("new OHP weight should be 12.5", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData(
        { tier1: "OHP", tier2: "Bench", tier3: "Squat"},
        { tier1: 10, tier2: 12.5, tier3: 10 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier1",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        {
          root: "OHP",
          tier1: "OHP",
          tier2: "Bench",
          tier3: "Squat",
        },
        { tier1: 12.5, tier2: 12.5, tier3: 10 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("new Deadlift weight should be 17.5", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData(
        { tier1: "OHP", tier2: "Deadlift", tier3: "Bench" },
        { tier1: 10, tier2: 12.5, tier3: 12.5 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        {
          tier1: "OHP",
          tier2: "Deadlift",
          tier3: "Bench",
        },
        { tier1: 10, tier2: 17.5, tier3: 12.5 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier3",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("tier3 weight should not change after action", () => {
    const action: Action = { type: "WORKOUT_ON_SUCCESS" };
    const state: State = {
      workoutData: createWeightData(
        { tier1: "OHP", tier2: "Bench", tier3: "Deadlift" },
        { tier1: 10, tier2: 12.5, tier3: 12.5 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier3",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        {
          tier1: "OHP",
          tier2: "Bench",
          tier3: "Deadlift",
        },
        { tier1: 10, tier2: 12.5, tier3: 12.5 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier1",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("should update tier1 stage on failure", () => {
    const action: Action = { type: "WORKOUT_ON_FAILURE" };
    const state: State = {
      workoutData: createWeightData(
        { tier1: "Squat", tier2: "Bench", tier3: "Lat pulldown" }, // Exercise
        { tier1: 20, tier2: 15, tier3: 10 }, // Weight
        { tier1: 1, tier2: 1, tier3: 1 }, // Stage
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier1",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        { tier1: "Squat", tier2: "Bench", tier3: "Lat pulldown" },
        { tier1: 20, tier2: 15, tier3: 10 },
        { tier1: 2, tier2: 1, tier3: 1 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    expect(newState).toStrictEqual(expectedState);
  });

  it("should update tier2 stage on failure", () => {
    const action: Action = { type: "WORKOUT_ON_FAILURE" };
    const state: State = {
      workoutData: createWeightData(
        { tier1: "Squat", tier2: "Bench", tier3: "Lat pulldown" },
        { tier1: 20, tier2: 15, tier3: 10 },
        { tier1: 1, tier2: 1, tier3: 1 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier2",
    };
    const newState = trainReducer(state, action);

    const expectedState = {
      workoutData: createWeightData(
        { tier1: "Squat", tier2: "Bench", tier3: "Lat pulldown" },
        { tier1: 20, tier2: 15, tier3: 10 },
        { tier1: 1, tier2: 2, tier3: 1 },
      ),
      initialState: null,
      isError: false,
      isLoading: false,
      tier: "tier3",
    };
    expect(newState).toStrictEqual(expectedState);
  });
});


describe("upateProtocol", () => {
  it("tier 1 stage 1 to 2", () => {
    const workoutData = createWeightData(
      { tier1: "Squat", tier2: "Bench", tier3: "Lat pulldown" },
      { tier1: 20, tier2: 15, tier3: 10 },
      { tier1: 1, tier2: 2, tier3: 1 },
    )
    
    // Capture the NEW object returned by the function
    const result = updateProtocol(workoutData, "tier1")
    
    const expectedData = createWeightData(
      { tier1: "Squat", tier2: "Bench", tier3: "Lat pulldown" },
      { tier1: 20, tier2: 15, tier3: 10 },
      { tier1: 2, tier2: 2, tier3: 1 },
    )
    
    // Assert against the result, not the original input
    expect(result).toStrictEqual(expectedData)
  })
  it("tier 1 stage 2 to 3", () => {
    const workoutData = createWeightData(
      { tier1: "Squat", tier2: "Bench", tier3: "Lat pulldown" },
      { tier1: 20, tier2: 15, tier3: 10 },
      { tier1: 2, tier2: 2, tier3: 1 },
    )
    
    // Capture the NEW object returned by the function
    const result = updateProtocol(workoutData, "tier1")
    
    const expectedData = createWeightData(
      { tier1: "Squat", tier2: "Bench", tier3: "Lat pulldown" },
      { tier1: 20, tier2: 15, tier3: 10 },
      { tier1: 3, tier2: 2, tier3: 1 },
    )
    
    // Assert against the result, not the original input
    expect(result).toStrictEqual(expectedData)
  })
  it("tier 1 stage 3 to 1 and weight should decrease by 85 percent", () => {
    const workoutData = createWeightData(
      { tier1: "Squat", tier2: "Bench", tier3: "Lat pulldown" },
      { tier1: 100, tier2: 15, tier3: 10 },
      { tier1: 3, tier2: 2, tier3: 1 },
    )
    
    // Capture the NEW object returned by the function
    const result = updateProtocol(workoutData, "tier1")
    
    const expectedData = createWeightData(
      { tier1: "Squat", tier2: "Bench", tier3: "Lat pulldown" },
      { tier1: 85, tier2: 15, tier3: 10 },
      { tier1: 1, tier2: 2, tier3: 1 },
    )
    
    // Assert against the result, not the original input
    expect(result).toStrictEqual(expectedData)
  })
})

const createWeightData = (
  names: Partial<Record<TierType, string>> & { root?: string },
  weights: Partial<Record<TierType, number>>,
  stages: Partial<Record<TierType, Stage>> = {
    tier1: 1,
    tier2: 1,
    tier3: 1,
  },
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

  const getProtocol = (tier: TierType, stage: Stage) => {
    if (tier === "tier1") {
      if (stage === 1) return { reps: 3, set: 5, stage: 1 as Stage };
      if (stage === 2) return { reps: 2, set: 6, stage: 2 as Stage };
       return { reps: 1, set: 10, stage: 3 as Stage };
    }
    if (tier === "tier2") {
      if (stage === 1) return { reps: 10, set: 3, stage: 1 as Stage };
      if (stage === 2) return { reps: 8, set: 3, stage: 2 as Stage };
      return { reps: 6, set: 3, stage: 3 as Stage };
    }
    // Default for tier3
    return { reps: 15, set: 3, stage: 1 as Stage };
  };

  return {
    day: (names.root ?? names.tier1) as Exercise,
    tier1: {
      exercise: names.tier1 as Exercise,
      set: getProtocol("tier1", stages.tier1 ?? 1).set,
      reps: getProtocol("tier1", stages.tier1 ?? 1).reps,
      stage: getProtocol("tier1", stages.tier1 ?? 1).stage , 
      weight: weights.tier1,
    },
    tier2: {
      exercise: names.tier2 as Exercise,
      set: getProtocol("tier2", stages.tier2 ?? 1).set,
      reps: getProtocol("tier2", stages.tier2 ?? 1).reps,
      stage: getProtocol("tier2", stages.tier2 ?? 1).stage , 
      weight: weights.tier2,
    },
    tier3: {
      exercise: names.tier3 as Exercise,
      set: getProtocol("tier3", stages.tier3 ?? 1).set,
      reps: getProtocol("tier3", stages.tier3 ?? 1).reps,
      stage: getProtocol("tier3", stages.tier3 ?? 1).stage , 
      weight: weights.tier3,
    },
  };
};
