import type { Action, ListOfProtocols } from "../../reducer";
import {
  ListOfTierOneProtocols,
  ListOfTierTwoProtocols,
} from "./listProtocols";
import { SelectedProtocols } from "./selectedProtocols";

interface ProtocolProps {
  intialProtocols: ListOfProtocols;
  onClick: (action: Action) => void;
}

export const ProtocolComponent = ({
  intialProtocols,
  onClick,
}: ProtocolProps) => {
  return (
    <div className="overflow-auto">
      {intialProtocols.tierOneAndTwo.map((item) => (
        <div key={item.name} className="">
          <div className="collapse bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-1" defaultChecked />
            <div className="collapse-title font-semibold">
              {item.name} <SelectedProtocols selected={item} />
            </div>
            <div className="collapse-content text-sm space-y-1">
              <ListOfTierOneProtocols selected={item} onClick={onClick} />
              <br />
              <ListOfTierTwoProtocols selected={item} onClick={onClick} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
