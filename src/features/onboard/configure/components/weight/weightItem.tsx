import type { Exercise } from "../../../../../lib/workout/types";

interface WeightItemProps {
  exercise: {
    name: Exercise;
    weight: number;
  };
  onChange: (name: Exercise, newWeight: number) => void;
}

export const WeightItem = ({ exercise, onChange }: WeightItemProps) => (
  <div className="pt-2 w-full">
    <div className="indicator w-full">
      <span className="indicator-item indicator-center badge badge-sm badge-secondary">
        {exercise.name} (kg)
      </span>
      <input
        onChange={(event) => {
          onChange(exercise.name, Number(event.target.value));
        }}
        className="input w-full"
        type="number"
        placeholder="Weight"
        defaultValue={exercise.weight}
        value={exercise.weight}
      />
    </div>
  </div>
);