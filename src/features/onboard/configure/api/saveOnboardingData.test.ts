import { describe, expect, it } from "vitest";
import { initialState } from "../reducer";

import { TierOneProtocols, TierTwoProtocols } from "../types";
import {getStageFromProtocol, mapStateToUserDoc, mapWorkoutDay} from "./saveOnboardingDataMapper";

describe("saveOnboardingData mappers", () => {
  it("getStageFromProtocol correctly identifies stages", () => {
    expect(getStageFromProtocol("tier1", TierOneProtocols[1])).toBe(1);
    expect(getStageFromProtocol("tier1", TierOneProtocols[2])).toBe(2);
    expect(getStageFromProtocol("tier1", TierOneProtocols[3])).toBe(3);

    expect(getStageFromProtocol("tier2", TierTwoProtocols[1])).toBe(1);
    expect(getStageFromProtocol("tier2", TierTwoProtocols[2])).toBe(2);
    expect(getStageFromProtocol("tier2", TierTwoProtocols[3])).toBe(3);
  });

  it("mapWorkoutDay maps A1 correctly from initialState", () => {
    const a1 = mapWorkoutDay("A1", initialState);
    expect(a1.day).toBe("Squat");
    expect(a1.tier1).toEqual({
      exercise: "Squat",
      reps: 3,
      set: 5,
      stage: 1,
      weight: 20,
    });
    expect(a1.tier2).toEqual({
      exercise: "Bench",
      reps: 10,
      set: 3,
      stage: 1,
      weight: 10,
    });
    expect(a1.tier3).toEqual({
      exercise: "Lat pulldown",
      reps: 15,
      set: 3,
      stage: 1,
      weight: 10,
    });
  });

  it("mapWorkoutDay maps B1 correctly from initialState", () => {
    const b1 = mapWorkoutDay("B1", initialState);
    expect(b1.day).toBe("OHP");
    expect(b1.tier1.exercise).toBe("OHP");
    expect(b1.tier2.exercise).toBe("Deadlift");
    expect(b1.tier3.exercise).toBe("Dumbell row");
  });

  it("mapWorkoutDay maps A2 correctly from initialState", () => {
    const a2 = mapWorkoutDay("A2", initialState);
    expect(a2.day).toBe("Bench");
    expect(a2.tier1.exercise).toBe("Bench");
    expect(a2.tier2.exercise).toBe("Squat");
    expect(a2.tier3.exercise).toBe("Lat pulldown");
  });

  it("mapWorkoutDay maps B2 correctly from initialState", () => {
    const b2 = mapWorkoutDay("B2", initialState);
    expect(b2.day).toBe("Deadlift");
    expect(b2.tier1.exercise).toBe("Deadlift");
    expect(b2.tier2.exercise).toBe("OHP");
    expect(b2.tier3.exercise).toBe("Dumbell row");
  });

  it("mapStateToUserDoc creates complete UserDoc for all days", () => {
    const userDoc = mapStateToUserDoc(initialState);
    expect(userDoc.currentWorkout).toBe("A1");
    expect(userDoc.workouts.A1).toBeDefined();
    expect(userDoc.workouts.B1).toBeDefined();
    expect(userDoc.workouts.A2).toBeDefined();
    expect(userDoc.workouts.B2).toBeDefined();
  });
});
