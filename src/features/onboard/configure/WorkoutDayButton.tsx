import type { DocumentId } from "../../../lib/workout/types";
import type { Action } from "./reducer";


const workoutDays: DocumentId[] = ["A1", "B1", "A2", "B2"];

interface WorkoutDaysProps {
  currentDay: DocumentId;
  onClick: (action:Action) => void;
}

export const WorkoutDays = ({onClick, currentDay}: WorkoutDaysProps) => (
  <div className="card bg-base-100 p-4 h-full flex flex-col gap-4">
    {workoutDays.map((day) => (
      <WorkoutDayButton key={day} day={day} currentDay={currentDay} onClick={onClick} />
    ))}
  </div>
);

interface WorkoutDayButtonProps {
  day: DocumentId;
  currentDay: DocumentId;
  onClick: (action:Action) => void;
}

const WorkoutDayButton = ({
  day,
  currentDay,
  onClick,
}: WorkoutDayButtonProps) => {
  const button = (
    <label className="label w-full cursor-pointer justify-start gap-3 rounded-2xl border border-base-300 bg-base-200/50 p-4 transition-all duration-150 hover:bg-base-200 hover:border-base-content/20 has-checked:border-primary has-checked:bg-primary has-checked:text-primary-content has-checked:shadow-sm">
      <input onChange={() => {
        onClick({ type: "PICK_DAY", payload: day })
      }} type="radio" name="radio-1" className="peer hidden" checked={day === currentDay} />
      <span className="label-text font-medium text-inherit">{day}</span>
    </label>
  );

  if (day === "A1") return (
    <div className="indicator w-full">
      <span className="indicator-item indicator-center badge badge-accent">
        Default
      </span>
      {button}
    </div>
  )

  return button
};