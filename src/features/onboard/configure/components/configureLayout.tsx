interface ConfigureLayoutProps {
  steps: React.ReactNode;
  content: React.ReactNode;
  rightButton: React.ReactNode;
  leftButton: React.ReactNode;
}

export const ConfigureLayout = ({
  content,
  steps,
  rightButton,
  leftButton,
}: ConfigureLayoutProps) => {
  return (
    <div className="grid grid-cols-4 grid-rows-6 gap-4 h-full">
      <div className="col-start-1 md:col-start-2 col-span-4 md:col-span-2 pt-8">
        {steps}
      </div>
      <div className="row-start-2 row-span-3 col-span-4 w-full flex justify-center">
        {content}
      </div>
      <div className="row-start-5 col-start-1 col-span-2 w-full  flex items-center p-1">
        {leftButton}
      </div>
      <div className="row-start-5 col-start-3 col-span-2 w-full flex items-center p-1">
        {rightButton}
      </div>
    </div>
  );
};
