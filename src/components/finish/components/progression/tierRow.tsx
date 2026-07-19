import type { Tier } from "../../../../lib/workout/tier";
import { ProtocolRow } from "./protocol";
import { Weight } from "./weight";

interface TierRowProps {
  initialTier: Tier;
  currentTier: Tier;
  tier: string;
}
// RED when failed and Green on Success
// If the weight and protocl is the same == success?
// else red?
export const TierRow = ({
  initialTier,
  currentTier,
  tier,
}: TierRowProps) => {

  return (
    <tr>
      <td className="">{tier}</td>
      <td>{currentTier.name}</td>
      <Weight weight={currentTier.weight} initialWeight={initialTier.weight}/>
      <ProtocolRow
        initialProtocol={initialTier.protocol}
        currentProtocol={currentTier.protocol}
      />
    </tr>
  );
};
