import { describe, expect, it } from "vitest";
import { configureReducer, type Action, type State } from "./reducer";

describe("configureReducerSteps", () => {
  it("Next Step from Day to Weight", () => {
    const action: Action = { type: "NEXT_STEP" }
    const initialState: State = {
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      workOutDay: "A1",
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"]
    }

    expect(state).toStrictEqual(expectedState)
  })

  it("Next Step from Weight to Protocol", () => {
    const action: Action = { type: "NEXT_STEP" }
    const initialState: State = {
      workOutDay: "A1",
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      workOutDay: "A1",
      currentStep: "Protocol",
      previousSteps: ["Day", "Weight", "Protocol"]
    }

    expect(state).toStrictEqual(expectedState)
  })

  it("Next Step from Protocol to Finish", () => {
    const action: Action = { type: "NEXT_STEP" }
    const initialState: State = {
      workOutDay: "A1",
      currentStep: "Protocol",
      previousSteps: ["Day", "Weight", "Protocol"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      workOutDay: "A1",
      currentStep: "Finish",
      previousSteps: ["Day", "Weight", "Protocol", "Finish"]
    }

    expect(state).toStrictEqual(expectedState)
  })

  it("Previous Step from Weight to Day", () => {
    const action: Action = { type: "PREVIOUS_STEP" }
    const initialState: State = {
      workOutDay: "A1",
      currentStep: "Weight",
      previousSteps: ["Day","Weight"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"]
    }

    expect(state).toStrictEqual(expectedState)
  })
  it("Previous Step from Protocol to Weight", () => {
    const action: Action = { type: "PREVIOUS_STEP" }
    const initialState: State = {
      workOutDay: "A1",
      currentStep: "Protocol",
      previousSteps: ["Day","Weight", "Protocol"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      workOutDay: "A1",
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"]
    }

    expect(state).toStrictEqual(expectedState)
  })
  it("Previous Step from Protocol to Finish", () => {
    const action: Action = { type: "PREVIOUS_STEP" }
    const initialState: State = {
      workOutDay: "A1",
      currentStep: "Finish",
      previousSteps: ["Day","Weight", "Protocol", "Finish"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      workOutDay: "A1",
      currentStep: "Protocol",
      previousSteps: ["Day", "Weight", "Protocol"]
    }

    expect(state).toStrictEqual(expectedState)
  })

  it("Previous Step from Day to Day", () => {
    const action: Action = { type: "PREVIOUS_STEP" }
    const initialState: State = {
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"]
    }

    expect(state).toStrictEqual(expectedState)
  })
}
)

describe("reducerConfigurePickDay", () => {
  it("Choose a day differnt from default value", () => {
    const action: Action = { type: "PICK_DAY", payload: "B1" }
    const initialState: State = {
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"]
    }
    const state = configureReducer(initialState, action)

    const expectedState: State = {
      workOutDay: "B1",
      currentStep: "Day",
      previousSteps: ["Day",]
    }

    expect(state).toStrictEqual(expectedState)
  })
  it("Choose a day then go to next step, day should stay the same", () => {
    const action: Action = { type: "PICK_DAY", payload: "A2" }
    const nextAction: Action = { type: "NEXT_STEP"}
    const initialState: State = {
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"]
    }
    const firstState = configureReducer(initialState, action)
    const secondedState = configureReducer(firstState, nextAction)

    const expectedState: State = {
      workOutDay: "A2",
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"]
    }

    expect(secondedState).toStrictEqual(expectedState)
  })
  it("Choose a day then go to next step then previous step, day should stay the same", () => {
    const action: Action = { type: "PICK_DAY", payload: "A2" }
    const nextAction: Action = { type: "NEXT_STEP"}
    const previousAction: Action = { type: "PREVIOUS_STEP" }
    
    const initialState: State = {
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"]
    }
    const firstState = configureReducer(initialState, action)
    const secondedState = configureReducer(firstState, nextAction)
    const thirdState = configureReducer(secondedState, previousAction)

    const expectedState: State = {
      workOutDay: "A2",
      currentStep: "Day",
      previousSteps: ["Day"]
    }

    expect(thirdState).toStrictEqual(expectedState)
  })
})