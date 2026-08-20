import { describe, expect, it } from "vitest";
import { finishAction } from "./finishAction";
import type { DocumentId, WorkoutData } from "../../../lib/workout/types";

describe("finishAction", () => {
  it("Should be unauthorized", async () => {
    const user = null
    const currentDay: DocumentId = "A1"
    const workout: WorkoutData = {
      day: "Bench",
      tier1: {
        exercise: "Bench",
        weight: 20,
        stage: 1,
        set: 1,
        reps: 10
      },
      tier2: {
        exercise: "Bench",
        weight: 20,
        stage: 1,
        set: 1,
        reps: 10
      },
      tier3: {
        exercise: "Bench",
        weight: 20,
        stage: 1,
        set: 1,
        reps: 10
      }
    }

    const expected = {
      isSuccess: false,
      message: "UnAuthorized"
    }
    const action = finishAction.bind(null, { data: {
      currentDay:currentDay,
      workout: workout
    }, user: user })
    const result = await action()
    expect(result).toStrictEqual(expected)
  })
})