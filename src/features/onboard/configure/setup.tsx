import type { DocumentId } from "../../../lib/workout/workout";
import type { Steps } from "./steps";

interface setupProps {
  step: Steps;
}

const workoutDays: DocumentId[] = ["A1", "B1", "A2", "B2"];

export const Setup = ({ step }: setupProps) => {
  return (
    <div className="flex flex-col space-y-4 p-4 w-full">{StepsState[step]}</div>
  );
};

const WorkoutDays = () => (
  <div className="card bg-base-100 p-4 h-full">
    {workoutDays.map((day) => (
      <div className="pt-4">
        {day === "A1" ? (
          <div className="indicator w-full">
            <span className="indicator-item indicator-center badge badge-accent">
              Default
            </span>
            <WorkoutDayButton day={day} />
          </div>
        ) : (
          <WorkoutDayButton day={day} />
        )}
      </div>
    ))}
  </div>
);

const WorkoutDayButton = ({ day }: { day: DocumentId }) => (
  <label className="label w-full cursor-pointer justify-start gap-3 rounded-2xl border border-base-300 bg-base-200/50 p-4 transition-all duration-150 hover:bg-base-200 hover:border-base-content/20 has-checked:border-primary has-checked:bg-primary has-checked:text-primary-content has-checked:shadow-sm">
    <input type="radio" name="radio-1" className="peer hidden" />
    <span className="label-text font-medium text-inherit">{day}</span>
  </label>
);

const StepsState = {
  Day: <WorkoutDays />,
  Weight: <p>weight </p>,
  Protocol: <p>protocol </p>,
  Finish: <p>finish </p>,
};
