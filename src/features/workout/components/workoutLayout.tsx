interface WorkoutLayoutProps {
  children: React.ReactNode;
}

export const WorkoutLayout = ({ children }: WorkoutLayoutProps) => (
  <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content text-center">
      <div className="max-w-md space-y-4">{children}</div>
    </div>
  </div>
);
