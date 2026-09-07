import { Button } from "../../../components/ui/button";

interface WorkoutButtonsProps {
  onSuccess: () => void;
  onFailure: () => void;
  disabled?: boolean;
}

export const WorkoutButtons = ({
  onSuccess,
  onFailure,
  disabled,
}: WorkoutButtonsProps) => {
  return (
    <div className="w-full space-x-4">
      <Button
        onClick={onFailure}
        disabled={disabled}
        className="btn btn-secondary btn-xl sm:btn-md"
      >
        Failed
      </Button>
      <Button
        onClick={onSuccess}
        disabled={disabled}
        className="btn btn-primary btn-xl sm:btn-md"
      >
        Success
      </Button>
    </div>
  );
};
