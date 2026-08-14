import { useReducer } from "react";
import { Button } from "../../button";
import { ConfigureLayout } from "./configureLayout";
import { Setup } from "./setup";
import { StepsBar } from "./steps";
import { configureReducer, initialState } from "./reducer";

export const Configure = () => {
  const [state, dispatch] = useReducer(configureReducer, initialState);
  
  return (
    <ConfigureLayout
      steps={<StepsBar listOfSteps={state.previousSteps} />}
      content={<Setup step={state.currentStep} />}
      leftButton={
        <Button
          onClick={() => {
            dispatch({ type: "PREVIOUS_STEP" });
          }}
          className="btn btn-secondary w-full"
        >
          Back
        </Button>
      }
      rightButton={
        <Button
          onClick={() => {
            dispatch({ type: "NEXT_STEP" });
          }}
          className="btn btn-primary w-full"
        >
          Next
        </Button>
      }
    />
  );
};
