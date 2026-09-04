import type { Exercise } from "../../../../../lib/workout/types";
import { Button } from "../../../../../components/ui/button.tsx";

interface WeightItemProps {
  exercise: {
    name: Exercise;
    weight: number;
  };
  onChange: (name: Exercise, newWeight: number) => void;
}
const weightIncrease = 2.5;
const weightDecrease = -2.5;

export const WeightItem = ({ exercise, onChange }: WeightItemProps) => {
  const updateWeight = (delta: number) => {
    const next = Math.max(0, exercise.weight + delta);
    onChange(exercise.name, next);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-base-200/60 rounded-xl w-full">
      {/* Exercise Name */}
      <div className="font-semibold text-sm sm:text-base">{exercise.name}</div>

      {/* Stepper Controls */}
      <div className="flex items-center gap-1.5">
        <Button
          style={"btn btn-circle"}
          onClick={() => {
            updateWeight(weightDecrease);
          }}
        >
          <span className="material-symbols-outlined">remove</span>
        </Button>

        {/* Editable input with numeric keyboard optimization */}
        <div className="relative flex items-center">
          <input
            type="number"
            step="2.5"
            min="0"
            inputMode="decimal"
            value={exercise.weight}
            onChange={(e) => {
              onChange(exercise.name, Number(e.target.value) || 0);
            }}
            className="input input-sm input-primary input-bordered w-18 text-center font-mono font-bold pr-5 [appearance:textfield]"
          />
          <span className="absolute right-2 text-xs opacity-60 pointer-events-none">
            kg
          </span>
        </div>

        <Button
          style={"btn btn-circle"}
          onClick={() => {
            updateWeight(weightIncrease);
          }}
        >
          <span className="material-symbols-outlined">add</span>
        </Button>
      </div>
    </div>
  );
};
