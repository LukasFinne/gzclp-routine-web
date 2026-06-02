import type { Tier as TierData } from "../../lib/workout/tier";
import { Button } from "../button";
import type { Action } from "./reducer";

interface TierProps {
  data: TierData;
  onClick: (action: Action) => void;
}

export const Tier = ({
  data,
  onClick,
}:TierProps) => {
  return (
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">{data.name}</h1>
      <ul className="py-6">
        <li>{data.name}</li>
      </ul>
      <div className="w-full space-x-4 ">
        <Button
          onClick={() => {
            onClick({ type: "WORKOUT_ON_FAILURE" });
          }}
          className="btn btn-secondary btn-xl sm:btn-md"
        >
          Failed
        </Button>
        <Button
          onClick={() => {
            onClick({ type: "WORKOUT_ON_SUCCESS" });
          }}
          className="btn btn-primary btn-xl sm:btn-md"
        >
          Success
        </Button>
      </div>
    </div>
  );
};
