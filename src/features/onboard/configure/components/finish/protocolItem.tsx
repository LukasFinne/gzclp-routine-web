import type { TierOneAndTwo, TierThree } from "../../reducer.ts";

interface ExerciseTierThreeProtocolItemProps {
  exercise: TierThree;
}

export const ExerciseTierThreeProtocolItem = ({
  exercise,
}: ExerciseTierThreeProtocolItemProps) => {
  return (
    <div className={" list-row"}>
      <span className={"font-semibold"}>{exercise.name}:</span>
      <div className={"space-x-1"}>
        Tier 3:{" "}
        <div className="badge badge-primary">
          {exercise.protocol.set} x {exercise.protocol.reps}
        </div>
      </div>
    </div>
  );
};

interface ExerciseTierOneAndTwoProtocolItemProps {
  exercise: TierOneAndTwo;
}

export const ExerciseTierOneAndTwoProtocolItem = ({
  exercise,
}: ExerciseTierOneAndTwoProtocolItemProps) => {
  return (
    <div className={"list-row"}>
      <span className={"font-semibold"}>{exercise.name}:</span>
      <div className={"space-x-1"}>
        Tier 1:{" "}
        <div className="badge badge-primary">
          {exercise.protocol.tier1.set} x {exercise.protocol.tier1.reps}
        </div>
        Tier 2:{" "}
        <div className="badge badge-primary">
          {exercise.protocol.tier2.set} x {exercise.protocol.tier2.reps}
        </div>
      </div>
    </div>
  );
};
