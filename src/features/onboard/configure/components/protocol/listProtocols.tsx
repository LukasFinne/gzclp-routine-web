import { Button } from "../../../../../components/ui/button";
import type { TierOneAndTwo, Action } from "../../reducer";
import { TierOneProtocols, TierTwoProtocols, type Protocol } from "../../types";
import { SetRepsItem } from "./setRepsItem";

interface ListOfTierOneProtocolsProps {
  selected: TierOneAndTwo;
  onClick: (action: Action) => void;
}

export const ListOfTierOneProtocols = ({
  selected,
  onClick,
}: ListOfTierOneProtocolsProps) => {
  const handleAction = (isSelected: boolean, protocol: Protocol) => {
    if (!isSelected) {
      onClick({
        type: "PICK_PROTOCOL",
        payload: {
          ...selected,
          protocol: {
            ...selected.protocol,
            tier1: protocol,
          },
        },
      });
    }
  };

  return (
    <>
      <span>Tier 1: </span>
      {Object.entries(TierOneProtocols).map(([stage, protocol]) => {
        const isSelected = protocol === selected.protocol.tier1;
        return (
          <Button
            className={`btn btn-sm mr-1 ${
              isSelected ? "btn-primary" : "btn-secondary"
            }`}
            key={`${selected.name}-tier1-${stage}`}
            onClick={() => {
              handleAction(isSelected, protocol);
            }}
          >
            <SetRepsItem protocol={protocol} isSelected={isSelected} />
          </Button>
        );
      })}
    </>
  );
};

interface ListOfTierTwoProtocolsProps {
  selected: TierOneAndTwo;
  onClick: (action: Action) => void;
}

export const ListOfTierTwoProtocols = ({
  selected,
  onClick,
}: ListOfTierTwoProtocolsProps) => {
  const handleAction = (isSelected: boolean, protocol: Protocol) => {
    if (!isSelected) {
      onClick({
        type: "PICK_PROTOCOL",
        payload: {
          ...selected,
          protocol: {
            ...selected.protocol,
            tier2: protocol,
          },
        },
      });
    }
  };

  return (
    <>
      <span>Tier 2: </span>
      {Object.entries(TierTwoProtocols).map(([stage, protocol]) => {
        const isSelected = protocol === selected.protocol.tier2;
        return (
          <Button
            className={`btn btn-sm mr-1 ${
              isSelected ? "btn-primary" : "btn-secondary"
            }`}
            key={`${selected.name}-tier2-${stage}`}
            onClick={() => {
              handleAction(isSelected, protocol);
            }}
          >
            <SetRepsItem protocol={protocol} isSelected={isSelected} />
          </Button>
        );
      })}
    </>
  );
};
