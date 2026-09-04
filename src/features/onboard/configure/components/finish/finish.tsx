import type { State } from "../../reducer.ts";
import { ViewModal } from "../../../../../components/ui/model.tsx";
import {
  ExerciseTierOneAndTwoProtocolItem,
  ExerciseTierThreeProtocolItem,
} from "./protocolItem.tsx";
import { ExerciseWeightItem } from "./weightItem.tsx";

interface FinishProps {
  state: State;
}

export const Finish = ({ state }: FinishProps) => {
  return (
    <ul className="list bg-base-100 rounded-box flex">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Overview of Workout configuration
      </li>

      <li className="list-row">
        <div>
          <span className="pt-2 material-symbols-outlined">calendar_today</span>
        </div>
        <div>
          <div>Workout starting day</div>
          <div className="">
            Chosen day:{" "}
            <span className={"text-xs uppercase font-semibold opacity-60"}>
              {" "}
              {state.workOutDay}
            </span>
          </div>
        </div>
      </li>

      <li className="list-row">
        <div>
          <span className="pt-2 material-symbols-outlined">weight</span>
        </div>
        <div>
          <div>Weight</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            Starting weight
          </div>
        </div>

        <ViewModal title={"Weight"}>
          <div className={"list"}>
            {Object.entries(state.exercises).map(([name, weight]) => (
              <ExerciseWeightItem name={name} weight={weight} />
            ))}
          </div>
        </ViewModal>
      </li>

      <li className="list-row">
        <div>
          <span className="pt-2 material-symbols-outlined">exercise</span>
        </div>
        <div>
          <div>Protocols</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            Set x Reps for each exercise
          </div>
        </div>

        <ViewModal title={"Protocols"}>
          <div className={"list"}>
            {state.protocols.tierOneAndTwo.map((exercise) => (
              <ExerciseTierOneAndTwoProtocolItem exercise={exercise} />
            ))}
            {state.protocols.tierThree.map((exercise) => (
              <ExerciseTierThreeProtocolItem exercise={exercise} />
            ))}
          </div>
        </ViewModal>
      </li>
    </ul>
  );
};
