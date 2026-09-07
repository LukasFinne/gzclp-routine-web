interface ExerciseWeightItemProps {
  name: string;
  weight: number;
}

export const ExerciseWeightItem = ({
  name,
  weight,
}: ExerciseWeightItemProps) => {
  return (
    <div className={"list-row"}>
      <span className={"font-semibold"}>{name}:</span>
      <div className={"space-x-1"}>
        <div className="">{weight} Kg</div>
      </div>
    </div>
  );
};
