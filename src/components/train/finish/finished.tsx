interface FinishedProps {
  children: React.ReactNode;
}

export const Finished = ({children}: FinishedProps) => (
  <div className="hero bg-base-200 min-h-screen py-8 flex items-center justify-center">
    <div className="hero-content text-center w-full max-w-lg">
      <div className="w-full">
        {children}
      </div>
    </div>
  </div>
);
