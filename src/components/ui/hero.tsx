interface BasicHeroProps {
  children: React.ReactNode;
  textStyle?: string 
}

export const BasicHero = ({ children, textStyle = "text-center" }: BasicHeroProps) => (
  <div className="hero bg-base-200 min-h-screen">
    <div className={`hero-content ${textStyle}`}>{children}</div>
  </div>
);
