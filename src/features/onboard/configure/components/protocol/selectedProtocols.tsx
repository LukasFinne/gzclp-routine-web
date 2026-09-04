import type { TierOneAndTwo } from "../../reducer";
import { SetRepsItem } from "./setRepsItem";

interface SelectedProtocolsProps {
  selected: TierOneAndTwo;
}

export const SelectedProtocols = ({ selected }: SelectedProtocolsProps) => {
  return (
    <>
      <SetRepsItem protocol={selected.protocol.tier1} isSelected={true} />
      <SetRepsItem protocol={selected.protocol.tier2} isSelected={true} />
    </>
  );
};
