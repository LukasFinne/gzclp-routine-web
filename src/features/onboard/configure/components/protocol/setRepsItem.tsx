import type { Protocol } from "../../types";

interface SetRepsItemProps {
  protocol: Protocol;
  isSelected: boolean;
}

export const SetRepsItem = ({ protocol, isSelected }: SetRepsItemProps) => (
  <div
    className={`badge badge-sm ${
      isSelected ? "badge-primary" : "badge-secondary"
    } mr-1`}
  >
    {protocol.set} x {protocol.reps}
  </div>
);
