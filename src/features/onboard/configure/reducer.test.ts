import { describe, expect, it } from "vitest";
import { configureReducer, type Action, type State } from "./reducer";

describe("configureReducerSteps", () => {
  it("Next Step from Day to Weight", () => {
    const action: Action = { type: "NEXT_STEP" }
    const initialState: State = {
      currentStep: "Day",
      previousSteps: ["Day"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"]
    }

    expect(state).toStrictEqual(expectedState)
  })

  it("Next Step from Weight to Protocol", () => {
    const action: Action = { type: "NEXT_STEP" }
    const initialState: State = {
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      currentStep: "Protocol",
      previousSteps: ["Day", "Weight", "Protocol"]
    }

    expect(state).toStrictEqual(expectedState)
  })

  it("Next Step from Protocol to Finish", () => {
    const action: Action = { type: "NEXT_STEP" }
    const initialState: State = {
      currentStep: "Protocol",
      previousSteps: ["Day", "Weight", "Protocol"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      currentStep: "Finish",
      previousSteps: ["Day", "Weight", "Protocol", "Finish"]
    }

    expect(state).toStrictEqual(expectedState)
  })

  it("Previous Step from Weight to Day", () => {
    const action: Action = { type: "PREVIOUS_STEP" }
    const initialState: State = {
      currentStep: "Weight",
      previousSteps: ["Day","Weight"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      currentStep: "Day",
      previousSteps: ["Day"]
    }

    expect(state).toStrictEqual(expectedState)
  })
  it("Previous Step from Protocol to Weight", () => {
    const action: Action = { type: "PREVIOUS_STEP" }
    const initialState: State = {
      currentStep: "Protocol",
      previousSteps: ["Day","Weight", "Protocol"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"]
    }

    expect(state).toStrictEqual(expectedState)
  })
  it("Previous Step from Protocol to Finish", () => {
    const action: Action = { type: "PREVIOUS_STEP" }
    const initialState: State = {
      currentStep: "Finish",
      previousSteps: ["Day","Weight", "Protocol", "Finish"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      currentStep: "Protocol",
      previousSteps: ["Day", "Weight", "Protocol"]
    }

    expect(state).toStrictEqual(expectedState)
  })

  it("Previous Step from Day to Day", () => {
    const action: Action = { type: "PREVIOUS_STEP" }
    const initialState: State = {
      currentStep: "Day",
      previousSteps: ["Day"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      currentStep: "Day",
      previousSteps: ["Day"]
    }

    expect(state).toStrictEqual(expectedState)
  })
}
)
