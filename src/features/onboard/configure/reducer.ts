import type { DocumentId, Exercise } from "../../../lib/workout/types";
import type { Steps } from "./components/steps";

export type Action =
  | {
    type: "CONFIGURE_INIT";
  }
  | {
    type: "NEXT_STEP";
  }
  | {
    type: "PREVIOUS_STEP";
  }
  | {
    type: "PICK_DAY";
    payload: DocumentId;
  }
  | {
    type: "PICK_WEIGHT"
    payload: Record<Exercise, number>
  };
  
export interface State {
  workOutDay: DocumentId;
  exercises: Record<Exercise, number>,
  previousSteps: Steps[];
  currentStep: Steps;
}

export const initialState: State = {
  workOutDay: "A1",
  exercises: {
    Squat: 20,
    Deadlift: 20,
    Bench: 10,
    OHP: 10,
    "Lat pulldown": 10,
    "Dumbell row": 10,
  },
  currentStep: "Day",
  previousSteps: ["Day"],
};

const DayOrder: Record<Steps, Steps> = {
  Day: "Weight",
  Weight: "Protocol",
  Protocol: "Finish",
  Finish: "Finish",
};

const RotateDayOrder = (day: Steps) => {
  return DayOrder[day];
};

export const configureReducer = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case "CONFIGURE_INIT": {
      return {
        ...state,
      };
    }
    case "PICK_DAY": {
      return {
        ...state,
        workOutDay: action.payload
      }
    }
    case "PICK_WEIGHT": {
      return {
        ...state,
        exercises: action.payload
      }
    }
    case "NEXT_STEP": {
      const current = state.currentStep;
      const listOfPrevious = state.previousSteps;
      listOfPrevious.push(RotateDayOrder(current));
      return {
        ...state,
        previousSteps: listOfPrevious,
        currentStep: RotateDayOrder(current),
      };
    }
    case "PREVIOUS_STEP": {
      const current = state.currentStep;
      const listOfPrevious =
        current != "Day"
          ? state.previousSteps.filter((day) => day != current)
          : state.previousSteps;

      return {
        ...state,
        previousSteps: listOfPrevious,
        currentStep: listOfPrevious.at(-1) ?? "Day",
      };
    }
    default: {
      throw new Error("Unexpected state in configure reducer");
    }
  }
};
