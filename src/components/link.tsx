import { Link as TanstackLink, type LinkComponentProps } from "@tanstack/react-router";

interface LinkProps {
  className?: string 
  to: LinkComponentProps["to"];
  children?: React.ReactNode;
}

export const Link = ({ to, className = "btn btn-ghost", children }: LinkProps) => {
  return <TanstackLink className={className} to={to}>{children}</TanstackLink>;
};

