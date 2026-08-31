import { useCallback, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import type { Exercise } from "../../../../../lib/workout/types";
import type { Action } from "../../reducer";
import { WeightItem } from "./weightItem";
import { WeightCard } from "./weightCard";

interface WeightProps {
  initialExercies: Record<Exercise, number>;
  onClick: (action: Action) => void;
}

export const Weight = ({ initialExercies, onClick }: WeightProps) => {
  const [exercises, setExercises] = useState(initialExercies);

  const exerciseList = (Object.keys(exercises) as Exercise[]).map((name) => ({
      name,
      weight: exercises[name],
    }));

  const handleChange = useCallback((exercise: Exercise, newWeight: number) => {
    setExercises((prev) => ({
      ...prev,
      [exercise]: newWeight,
    }));
  }, []);

  return (
    <>
      <WeightCard>
        {exerciseList.map((exercise) => (
          <WeightItem
            key={exercise.name}
            exercise={exercise}
            onChange={(name, newWeight) => {
              handleChange(name, newWeight);
            }}
          />
        ))}
      </WeightCard>
      <Button
        style="btn btn-secondary"
        onClick={() => {
          onClick({ type: "PICK_WEIGHT", payload: exercises });
        }}
      >
        Save Weights
      </Button>
    </>
  );
};
