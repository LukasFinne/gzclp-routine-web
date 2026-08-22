export type Steps = "Day" | "Weight" | "Protocol" | "Finish";

interface StepsBarProps {
  listOfSteps: Steps[];
}

export const StepsBar = ({ listOfSteps }: StepsBarProps) => {
  return (
    <ul className="steps w-full">
      <li className={`step ${listOfSteps.includes("Day") ? "step-primary" : ""}`}>Day</li>
      <li className={`step ${listOfSteps.includes("Weight") ? "step-primary" : ""}`}>Weight</li>
      <li className={`step ${listOfSteps.includes("Protocol") ? "step-primary" : ""}`}>Protocol</li>
      <li className={`step ${listOfSteps.includes("Finish") ? "step-primary" : ""}`}>Finish</li>
    </ul>
  );
};
