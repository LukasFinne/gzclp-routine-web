import { useReducer } from "react";
import { ConfigureLayout } from "./configureLayout";
import { Setup } from "./setup";
import { StepsBar } from "./steps";
import { configureReducer, initialState } from "../reducer";
import { Button } from "../../../../components/ui/button";

export const Configure = () => {
  const [state, dispatch] = useReducer(configureReducer, initialState);
  console.log("state", state.workOutDay);
  return (
    <ConfigureLayout
      steps={<StepsBar listOfSteps={state.previousSteps} />}
      content={
        <Setup
          state={state}
          onClick={(action) => {
            dispatch(action);
          }}
          step={state.currentStep}
        />
      }
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
