import type { TierExerciseData } from "../../../lib/workout/types";

interface ExerciseProps {
  data: TierExerciseData;
}

export const Exercise = ({ data }: ExerciseProps) => {
  const roundedWeight = Math.round(data.weight);

  return (
    <>
      <h1 className="text-5xl font-bold">{data.exercise}</h1>
      <div className="flex justify-center space-x-8">
        <div>
          <h2>Weight</h2>
          <p className="font-bold">{roundedWeight} kg</p>
        </div>
        <div>
          <h2>Set x Rep</h2>
          <p className="font-bold">
            {data.set} x {data.reps}
          </p>
        </div>
      </div>
    </>
  );
};
