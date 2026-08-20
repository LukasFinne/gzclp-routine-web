import type { TierExerciseData } from "../../../../lib/workout/types";
import { ProtocolRow } from "./protocol";
import { Weight } from "./weight";

interface TierRowProps {
  initialTier: TierExerciseData;
  currentTier: TierExerciseData;
  tier: string;
}

export const TierRow = ({ initialTier, currentTier, tier }: TierRowProps) => {
  const initialProtocol = {
    reps: initialTier.reps,
    set: initialTier.set,
    stage: initialTier.stage,
  };

  const currentProtocol = {
    reps: currentTier.reps,
    set: currentTier.set,
    stage: currentTier.stage,
  };

  return (
    <tr>
      <td className="">{tier}</td>
      <td>{currentTier.exercise}</td>
      <Weight weight={currentTier.weight} initialWeight={initialTier.weight} />
      <ProtocolRow
        initialProtocol={initialProtocol}
        currentProtocol={currentProtocol}
      />
    </tr>
  );
};
