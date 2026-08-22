import { BasicHero } from "../../../components/ui/hero";

interface WorkoutLayoutProps {
  children: React.ReactNode;
}

export const WorkoutLayout = ({ children }: WorkoutLayoutProps) => (
  <BasicHero>
    <div className="max-w-md space-y-4">{children}</div>
  </BasicHero>
);
