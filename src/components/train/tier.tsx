import type { Tier as TierData } from "../../lib/workout/tier";
import { Button } from "../button";
import type { Action } from "./reducer";

interface TierProps {
  data: TierData;
  onFail: Action;
  onSuccess: Action;
  onClick: (action: Action) => void;
}

export const Tier = ({ data, onFail, onSuccess, onClick }: TierProps) => {
  return (
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">{data.name}</h1>
      <ul className="py-6">
        <li>{data.name}</li>
      </ul>
      <div className="w-full space-x-4 ">
        <Button
          onClick={() => {
            onClick(onFail);
          }}
          className="btn btn-secondary btn-xl sm:btn-md"
        >
          Failed
        </Button>
        <Button
          onClick={() => {
            onClick(onSuccess);
          }}
          className="btn btn-primary btn-xl sm:btn-md"
        >
          Success
        </Button>
      </div>
    </div>
  );
};
