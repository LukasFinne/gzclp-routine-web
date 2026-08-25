import type { Action, State } from "../reducer";
import type { Steps } from "./steps";
import { Weight } from "./weight/weight";
import { WorkoutDays } from "./workoutDay/workoutDay";

interface SetupProps {
  state: State
  step: Steps;
  onClick: (action: Action) => void;
}

const getStepContent = (
  onClick: (action: Action) => void,
  state: State,
): Record<Steps, React.ReactNode> => ({
  Day: <WorkoutDays currentDay={state.workOutDay} onClick={onClick} />,
  Weight: <Weight initialExercies={state.exercises} onClick={onClick}/>,
  Protocol: <p>protocol</p>,
  Finish: <p>finish</p>,
});

export const Setup = ({ step, onClick, state }: SetupProps) => {
  return (
    <div className="flex flex-col space-y-4 p-4 w-full">
      {getStepContent(onClick, state)[step]}
    </div>
  );
};
