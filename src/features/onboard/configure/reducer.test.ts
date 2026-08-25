import { describe, expect, it } from "vitest";
import { configureReducer, type Action, type State } from "./reducer";

export const createMockState = (overrides: Partial<State> = {}): State => ({
  workOutDay: "A1",
  currentStep: "Day",
  previousSteps: ["Day"],
  exercises: {
    Squat: 20,
    Deadlift: 20,
    Bench: 10,
    OHP: 10,
    "Lat pulldown": 10,
    "Dumbell row": 10,
  },
  ...overrides,
});

describe("configureReducerSteps", () => {
  it("Next Step from Day to Weight", () => {
    const action: Action = { type: "NEXT_STEP" };
    const initialState = createMockState({
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"],
    });
    const state = configureReducer(initialState, action);

    expect(state).toMatchObject({
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"],
    });
  });

  it("Next Step from Weight to Protocol", () => {
    const action: Action = { type: "NEXT_STEP" };
    const initialState = createMockState({
      workOutDay: "A1",
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"],
    });
    const state = configureReducer(initialState, action);

    expect(state).toMatchObject({
      workOutDay: "A1",
      currentStep: "Protocol",
      previousSteps: ["Day", "Weight", "Protocol"],
    });
  });

  it("Next Step from Protocol to Finish", () => {
    const action: Action = { type: "NEXT_STEP" };
    const initialState = createMockState({
      workOutDay: "A1",
      currentStep: "Protocol",
      previousSteps: ["Day", "Weight", "Protocol"],
    });
    const state = configureReducer(initialState, action);
    expect(state).toMatchObject({
      workOutDay: "A1",
      currentStep: "Finish",
      previousSteps: ["Day", "Weight", "Protocol", "Finish"],
    });
  });

  it("Previous Step from Weight to Day", () => {
    const action: Action = { type: "PREVIOUS_STEP" };
    const initialState = createMockState({
      workOutDay: "A1",
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"],
    });
    const state = configureReducer(initialState, action);
    expect(state).toMatchObject({
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"],
    });
  });
  it("Previous Step from Protocol to Weight", () => {
    const action: Action = { type: "PREVIOUS_STEP" };
    const initialState = createMockState({
      workOutDay: "A1",
      currentStep: "Protocol",
      previousSteps: ["Day", "Weight", "Protocol"],
    });
    const state = configureReducer(initialState, action);

    expect(state).toMatchObject({
      workOutDay: "A1",
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"],
    });
  });
  it("Previous Step from Protocol to Finish", () => {
    const action: Action = { type: "PREVIOUS_STEP" };
    const initialState = createMockState({
      workOutDay: "A1",
      currentStep: "Finish",
      previousSteps: ["Day", "Weight", "Protocol", "Finish"],
    });
    const state = configureReducer(initialState, action);

    expect(state).toMatchObject({
      workOutDay: "A1",
      currentStep: "Protocol",
      previousSteps: ["Day", "Weight", "Protocol"],
    });
  });

  it("Previous Step from Day to Day", () => {
    const action: Action = { type: "PREVIOUS_STEP" };
    const initialState = createMockState({
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"],
    });
    const state = configureReducer(initialState, action);

    expect(state).toMatchObject({
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"],
    });
  });
});

describe("reducerConfigurePickDay", () => {
  it("Choose a day differnt from default value", () => {
    const action: Action = { type: "PICK_DAY", payload: "B1" };
    const initialState = createMockState({
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"],
    });
    const state = configureReducer(initialState, action);

    expect(state).toMatchObject({
      workOutDay: "B1",
      currentStep: "Day",
      previousSteps: ["Day"],
    });
  });

  it("Choose a day then go to next step, day should stay the same", () => {
    const action: Action = { type: "PICK_DAY", payload: "A2" };
    const nextAction: Action = { type: "NEXT_STEP" };
    const initialState = createMockState({
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"],
    });
    const firstState = configureReducer(initialState, action);
    const secondedState = configureReducer(firstState, nextAction);

    expect(secondedState).toMatchObject({
      workOutDay: "A2",
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"],
    });
  });

  it("Choose a day then go to next step then previous step, day should stay the same", () => {
    const action: Action = { type: "PICK_DAY", payload: "A2" };
    const nextAction: Action = { type: "NEXT_STEP" };
    const previousAction: Action = { type: "PREVIOUS_STEP" };

    const initialState = createMockState({
      workOutDay: "A1",
      currentStep: "Day",
      previousSteps: ["Day"],
    });
    const firstState = configureReducer(initialState, action);
    const secondedState = configureReducer(firstState, nextAction);
    const thirdState = configureReducer(secondedState, previousAction);
    expect(thirdState).toMatchObject({
      workOutDay: "A2",
      currentStep: "Day",
      previousSteps: ["Day"],
    });
  });
});

const defaultExerciseValues = {
  Squat: 20,
  Deadlift: 20,
  Bench: 10,
  OHP: 10,
  "Lat pulldown": 10,
  "Dumbell row": 10,
};

describe("ReducuerWeightStep", () => {
  it("Change weight should be rembmered after next step action", () => {
    const newExercises = {
      Squat: 25,
      Deadlift: 10,
      Bench: 10,
      OHP: 10,
      "Lat pulldown": 10,
      "Dumbell row": 10,
    };
    const action: Action = {
      type: "PICK_WEIGHT",
      payload: newExercises,
    };

    const nextAction: Action = { type: "NEXT_STEP" };
    const initialState = createMockState({
      workOutDay: "A1",
      exercises: defaultExerciseValues,
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"],
    });
    const firstState = configureReducer(initialState, action);
    const secondedState = configureReducer(firstState, nextAction);

    expect(secondedState).toMatchObject({
      workOutDay: "A1",
      currentStep: "Protocol",
      exercises: newExercises,
      previousSteps: ["Day", "Weight", "Protocol"],
    });
  });
  it("Change weight should be rembmered after next step action", () => {
    const newExercises = {
      Squat: 25,
      Deadlift: 10,
      Bench: 10,
      OHP: 10,
      "Lat pulldown": 10,
      "Dumbell row": 10,
    };
    const action: Action = {
      type: "PICK_WEIGHT",
      payload: newExercises,
    };

    const nextAction: Action = { type: "PREVIOUS_STEP" };
    const initialState = createMockState({
      workOutDay: "A1",
      exercises: defaultExerciseValues,
      currentStep: "Weight",
      previousSteps: ["Day", "Weight"],
    });
    const firstState = configureReducer(initialState, action);
    const secondedState = configureReducer(firstState, nextAction);

    expect(secondedState).toMatchObject({
      workOutDay: "A1",
      currentStep: "Day",
      exercises: newExercises,
      previousSteps: ["Day"],
    });
  });
});
