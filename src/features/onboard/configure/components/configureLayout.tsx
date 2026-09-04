import {ErrorAlert} from "../../../../components/ui/alert.tsx";

interface ConfigureLayoutProps {
    error?: string | null;
  steps: React.ReactNode;
  content: React.ReactNode;
  rightButton: React.ReactNode;
  leftButton: React.ReactNode;
}

export const ConfigureLayout = ({
    error,
  content,
  steps,
  rightButton,
  leftButton,
}: ConfigureLayoutProps) => {
  return (
 <>
     {error && <ErrorAlert message={error} />}
     <div className="grid grid-cols-4 grid-rows-7 gap-4 h-full">

         <div className="row-start-1 row-end-1 col-start-1 md:col-start-2 col-span-4 md:col-span-2 pt-4">
             {steps}
         </div>

         <div className="row-start-2 row-end-6 col-span-4 w-full flex justify-center">
             {content}
         </div>
         <div className="row-start-6 col-start-1 col-span-2 w-full  flex items-center p-1">
             {leftButton}
         </div>
         <div className="row-start-6 col-start-3 col-span-2 w-full flex items-center p-1">
             {rightButton}
         </div>
     </div>
 </>
  );
};
