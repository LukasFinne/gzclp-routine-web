import { Button } from "../../../components/button";
import type { Action } from "../workoutReducer";

interface WorkoutButtonsProps {
  onFail: Action;
  onSuccess: Action;
  onClick: (action: Action) => void;
}


export const WorkoutButtons = ({ onFail, onSuccess, onClick }: WorkoutButtonsProps) => {
  return (
    <div className="w-full space-x-4 ">
      <Button
        onClick={() => {
          onClick(onFail);
        }}
        className="btn btn-secondary btn-xl sm:btn-md"
      >
        Failed
      </Button>
      <Button
        onClick={() => {
          onClick(onSuccess);
        }}
        className="btn btn-primary btn-xl sm:btn-md"
      >
        Success
      </Button>
    </div>
  )
}