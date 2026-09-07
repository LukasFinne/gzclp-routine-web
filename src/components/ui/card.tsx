interface BasicCardProps {
  children: React.ReactNode;
}

export const BasicCard = ({ children }: BasicCardProps) => {
  return (
    <div className="card bg-base-100 space-y-2 p-2 h-full items-center overflow-auto">
      {children}
    </div>
  );
};
