import { describe, it, expect } from "vitest";
import {
  getWorkoutDefaultValues,
  getInitialUserBatchPayload,
  setupDefaultWorkouts,
} from "./defaultWorkouts";
import type { Protocol, Stage } from "../../lib/workout/protocol";
import type { WorkoutData } from "../../lib/workout/workout";

describe("defaultWorkouts", () => {
  describe("getWorkoutDefaultValues", () => {
    it("returns Map containing default workout routines A1, A2, B1, B2 with correct initial data", () => {
      const defaults = getWorkoutDefaultValues();

      expect(defaults.size).toBe(4);
      expect(Array.from(defaults.keys())).toEqual(["A1", "A2", "B1", "B2"]);

      // Verify A1
      const a1 = defaults.get("A1");
      expect(a1).toBeDefined();
      if (!a1) throw new Error("A1 missing");
      expect(a1.docId).toBe("A1");
      expect(a1.name).toBe("Squat");
      expect(a1.tier1).toEqual({
        name: "Squat",
        protocol: { reps: 2, set: 6, stage: 2 },
        weight: 20,
      });
      expect(a1.tier2).toEqual({
        name: "Bench",
        protocol: { reps: 8, set: 3, stage: 2 },
        weight: 15,
      });
      expect(a1.tier3).toEqual({
        name: "Lat pulldown",
        protocol: { reps: 15, set: 3, stage: 1 },
        weight: 10,
      });

      // Verify A2
      const a2 = defaults.get("A2");
      expect(a2).toBeDefined();
      if (!a2) throw new Error("A2 missing");
      expect(a2.docId).toBe("A2");
      expect(a2.name).toBe("Bench");
      expect(a2.tier1.name).toBe("Bench");
      expect(a2.tier1.weight).toBe(20);
      expect(a2.tier2.name).toBe("Squat");
      expect(a2.tier2.weight).toBe(15);
      expect(a2.tier3.name).toBe("Lat pulldown");
      expect(a2.tier3.weight).toBe(10);

      // Verify B1
      const b1 = defaults.get("B1");
      expect(b1).toBeDefined();
      if (!b1) throw new Error("B1 missing");
      expect(b1.docId).toBe("B1");
      expect(b1.name).toBe("OHP");
      expect(b1.tier1.name).toBe("OHP");
      expect(b1.tier1.weight).toBe(20);
      expect(b1.tier2.name).toBe("Deadlift");
      expect(b1.tier2.weight).toBe(15);
      expect(b1.tier3.name).toBe("Dumbell row");
      expect(b1.tier3.weight).toBe(10);

      // Verify B2
      const b2 = defaults.get("B2");
      expect(b2).toBeDefined();
      if (!b2) throw new Error("B2 missing");
      expect(b2.docId).toBe("B2");
      expect(b2.name).toBe("Deadlift");
      expect(b2.tier1.name).toBe("Deadlift");
      expect(b2.tier1.weight).toBe(20);
      expect(b2.tier2.name).toBe("OHP");
      expect(b2.tier2.weight).toBe(15);
      expect(b2.tier3.name).toBe("Dumbell row");
      expect(b2.tier3.weight).toBe(10);
    });

    it("accepts custom protocol maps", () => {
      const dummyProtocol: Protocol = { reps: 5, set: 5, stage: 1 };
      const customT1 = new Map<Stage, Protocol>([[1, dummyProtocol]]);
      const customT2 = new Map<Stage, Protocol>([[1, dummyProtocol]]);
      const customT3 = new Map<Stage, Protocol>([[1, dummyProtocol]]);

      const defaults = getWorkoutDefaultValues(customT1, customT2, customT3);
      expect(defaults.get("A1")?.tier1.protocol).toEqual(dummyProtocol);
    });

    describe("failed / edge cases for getWorkoutDefaultValues", () => {
      it("throws an error if all protocol maps are empty", () => {
        const emptyMap = new Map<Stage, Protocol>();
        expect(() =>
          getWorkoutDefaultValues(emptyMap, emptyMap, emptyMap)
        ).toThrow("Default workout protocols (index 1) are missing.");
      });

      it("throws an error if tier 1 protocol map is missing stage 1", () => {
        const invalidT1 = new Map<Stage, Protocol>();
        const validT2 = new Map<Stage, Protocol>([[1, { reps: 5, set: 5, stage: 1 }]]);
        const validT3 = new Map<Stage, Protocol>([[1, { reps: 15, set: 3, stage: 1 }]]);

        expect(() =>
          getWorkoutDefaultValues(invalidT1, validT2, validT3)
        ).toThrow("Default workout protocols (index 1) are missing.");
      });

      it("throws an error if tier 2 protocol map is missing stage 1", () => {
        const validT1 = new Map<Stage, Protocol>([[1, { reps: 5, set: 5, stage: 1 }]]);
        const invalidT2 = new Map<Stage, Protocol>();
        const validT3 = new Map<Stage, Protocol>([[1, { reps: 15, set: 3, stage: 1 }]]);

        expect(() =>
          getWorkoutDefaultValues(validT1, invalidT2, validT3)
        ).toThrow("Default workout protocols (index 1) are missing.");
      });

      it("throws an error if tier 3 protocol map is missing stage 1", () => {
        const validT1 = new Map<Stage, Protocol>([[1, { reps: 5, set: 5, stage: 1 }]]);
        const validT2 = new Map<Stage, Protocol>([[1, { reps: 8, set: 3, stage: 1 }]]);
        const invalidT3 = new Map<Stage, Protocol>();

        expect(() =>
          getWorkoutDefaultValues(validT1, validT2, invalidT3)
        ).toThrow("Default workout protocols (index 1) are missing.");
      });
    });
  });

  describe("getInitialUserBatchPayload", () => {
    it("generates correct document paths and payload data structure for a given user", () => {
      const userId = "test-user-456";
      const payload = getInitialUserBatchPayload(userId);

      expect(payload.userPath).toBe("users/test-user-456");
      expect(payload.userData).toEqual({ currentWorkout: "A1" });
      expect(payload.workouts).toHaveLength(4);

      expect(payload.workouts[0]).toEqual({
        path: "users/test-user-456/workouts/A1",
        data: expect.objectContaining({ docId: "A1", name: "Squat" }) as WorkoutData,
      });
      expect(payload.workouts[1]).toEqual({
        path: "users/test-user-456/workouts/A2",
        data: expect.objectContaining({ docId: "A2", name: "Bench" }) as WorkoutData,
      });
      expect(payload.workouts[2]).toEqual({
        path: "users/test-user-456/workouts/B1",
        data: expect.objectContaining({ docId: "B1", name: "OHP" }) as WorkoutData,
      });
      expect(payload.workouts[3]).toEqual({
        path: "users/test-user-456/workouts/B2",
        data: expect.objectContaining({ docId: "B2", name: "Deadlift" }) as WorkoutData,
      });
    });

    describe("failed / edge cases for getInitialUserBatchPayload", () => {
      it("handles empty custom workouts map gracefully", () => {
        const emptyWorkoutsMap = new Map<string, WorkoutData>();
        const payload = getInitialUserBatchPayload("user1", emptyWorkoutsMap);

        expect(payload.userPath).toBe("users/user1");
        expect(payload.userData).toEqual({ currentWorkout: "A1" });
        expect(payload.workouts).toHaveLength(0);
      });
    });
  });

  describe("setupDefaultWorkouts failed cases", () => {
    it("throws an error when userId is an empty string", async () => {
      await expect(setupDefaultWorkouts(null)).rejects.toThrow(
        "user is required to set up default workouts."
      );
    });

    it("throws an error when userId is only whitespace", async () => {
      await expect(setupDefaultWorkouts(null)).rejects.toThrow(
        "user is required to set up default workouts."
      );
    });
  });
});
