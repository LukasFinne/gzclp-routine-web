import {useReducer, useState, useTransition} from "react";
import {ConfigureLayout} from "./configureLayout";
import {Setup} from "./setup";
import {StepsBar} from "./steps";
import {configureReducer, initialState} from "../reducer";
import {Button} from "../../../../components/ui/button";
import {ViewModal} from "../../../../components/ui/model.tsx";
import {saveOnboardingData} from "../api/saveOnboardingData.ts";
import {useNavigate} from "@tanstack/react-router";
import {LoadingSpinner} from "../../../../components/ui/loading.tsx";

interface ConfigureProps {
    userId: string;
}

export const Configure = ({userId}: ConfigureProps) => {
    const [state, dispatch] = useReducer(configureReducer, initialState);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleOnboardingData = () => {
        startTransition(async () => {
            setError(null);
            const result = await saveOnboardingData(userId, state)

            if(result.isSuccess) {
                await navigate({ to:"/workout"})
            } else{
                setError(result.message ?? "Failed to save configuration");
            }

        })
    }

    if(isPending) {
        return <LoadingSpinner />;
    }

    return (
        <ConfigureLayout
            error={error}
            steps={<StepsBar listOfSteps={state.previousSteps}/>}
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
                        dispatch({type: "PREVIOUS_STEP"});
                    }}
                    className="btn btn-secondary w-full"
                >
                    Back
                </Button>
            }
            rightButton={
                state.currentStep === "Finish" ? (
                    <ViewModal title={"Are you done and ready?"} btnText={"Finish"} btnStyle={"btn btn-primary w-full"}
                               modalAction={<Button style={"btn btn-primary"} onClick={() => {
                                   handleOnboardingData()
                               }}>Upload</Button>}>
                        <div>
                            Click the button below to add the settings to your account
                        </div>
                    </ViewModal>
                ) : (
                    <Button
                        onClick={() => {
                            dispatch({type: "NEXT_STEP"});
                        }}
                        className="btn btn-primary w-full"
                    >
                        Next
                    </Button>
                )
            }
        />
    );
};
