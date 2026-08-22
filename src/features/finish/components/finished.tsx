import { BasicHero } from "../../../components/ui/hero";

interface FinishedProps {
  children: React.ReactNode;
}

export const Finished = ({ children }: FinishedProps) => (
  <BasicHero>
    <div className="w-full">{children}</div>
  </BasicHero>
);
