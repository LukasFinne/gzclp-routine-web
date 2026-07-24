import { describe, expect, it } from "vitest";
import { finishAction } from "./finishAction";
import type { WorkoutData } from "../../lib/workout/workout";

describe("finishAction", () => {
  it("Should be unauthorized", async () => {
    const user = null
    const workout: WorkoutData = {
      docId: "A1",
      name: "Bench",
      tier1: {
        name: "Bench",
        weight: 20,
        protocol: {
          stage: 1,
          set: 1,
          reps: 10
        }
      },
      tier2: {
        name: "Bench",
        weight: 20,
        protocol: {
          stage: 1,
          set: 1,
          reps: 10
        }
      },
      tier3: {
        name: "Bench",
        weight: 20,
        protocol: {
          stage: 1,
          set: 1,
          reps: 10
        }
      }
    }

    const expected = {
      isSuccess: false,
      message: "UnAuthorized"
    }
    const action = finishAction.bind(null, { data: workout, user: user })
    const result = await action(null)
    expect(result).toStrictEqual(expected)
  })
})