import type {
  DocumentId,
  Exercise,
  Tier1And2Exercise,
  Tier3Exercise,
} from "../../../lib/workout/types";
import type { Steps } from "./components/steps";
import {
  TierOneProtocols,
  TierThreeProtocols,
  TierTwoProtocols,
  type Protocol,
} from "./types";

export interface ListOfProtocols {
  tierOneAndTwo: TierOneAndTwo[];
  tierThree: TierThree[];
}

export interface TierOneAndTwo {
  name: Tier1And2Exercise;
  protocol: {
    tier1: Protocol;
    tier2: Protocol;
  };
}

export interface TierThree {
  name: Tier3Exercise;
  protocol: Protocol;
}

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
      type: "PICK_WEIGHT";
      payload: Record<Exercise, number>;
    }
  | {
      type: "PICK_PROTOCOL";
      payload: TierOneAndTwo;
    };

export interface State {
  workOutDay: DocumentId;
  exercises: Record<Exercise, number>;
  protocols: ListOfProtocols;
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
  protocols: {
    tierOneAndTwo: [
      {
        name: "Squat",
        protocol: {
          tier1: TierOneProtocols[1],
          tier2: TierTwoProtocols[1],
        },
      },
      {
        name: "Deadlift",
        protocol: {
          tier1: TierOneProtocols[1],
          tier2: TierTwoProtocols[1],
        },
      },
      {
        name: "Bench",
        protocol: {
          tier1: TierOneProtocols[1],
          tier2: TierTwoProtocols[1],
        },
      },
      {
        name: "OHP",
        protocol: {
          tier1: TierOneProtocols[1],
          tier2: TierTwoProtocols[1],
        },
      },
    ],
    tierThree: [
      {
        name: "Lat pulldown",
        protocol: TierThreeProtocols[1],
      },
      {
        name: "Dumbell row",
        protocol: TierThreeProtocols[1],
      },
    ],
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
        workOutDay: action.payload,
      };
    }
    case "PICK_WEIGHT": {
      return {
        ...state,
        exercises: action.payload,
      };
    }
    case "PICK_PROTOCOL": {
      const newProtocol = action.payload;
      return {
        ...state,
        protocols: {
          ...state.protocols,
          tierOneAndTwo: state.protocols.tierOneAndTwo.map((item) =>
            item.name === newProtocol.name ? newProtocol : item,
          ),
        },
      };
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
