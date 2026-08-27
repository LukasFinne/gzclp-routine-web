
import type {
  DocumentId,
  Exercise,
  Tier1And2Exercise,
  Tier3Exercise,
} from "../../../lib/workout/types";
import type { Steps } from "./components/steps";
import { TierOneProtocols, TierThreeProtocols, TierTwoProtocols, type Protocol } from "./types";

export type ListOfProtocols =
  | {
      name: Tier1And2Exercise;
      tiers: {
        tier1: Protocol;
        tier2: Protocol;
      };
    }
  | {
      name: Tier3Exercise;
      tiers: {
        tier3: Protocol;
      };
    };

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
      payload: ListOfProtocols[];
    };

export interface State {
  workOutDay: DocumentId;
  exercises: Record<Exercise, number>;
  protocols: ListOfProtocols[];
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
  protocols: [
    {
      name: "Squat",
      tiers: {
        tier1: TierOneProtocols[1],
        tier2: TierTwoProtocols[1],
      },
    },
    {
      name: "Deadlift",
      tiers: {
        tier1: TierOneProtocols[1],
        tier2: TierTwoProtocols[1],
      },
    },
    {
      name: "Bench",
      tiers: {
        tier1: TierOneProtocols[1],
        tier2: TierTwoProtocols[1],
      },
    },
    {
      name: "OHP",
      tiers: {
        tier1: TierOneProtocols[1],
        tier2: TierTwoProtocols[1],
      },
    },
    {
      name: "Lat pulldown",
      tiers: {
        tier3: TierThreeProtocols[1],
      },
    },
    {
      name: "Dumbell row",
      tiers: {
        tier3: TierThreeProtocols[1],
      },
    },
  ],
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
      return {
        ...state,
        protocols: action.payload
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
