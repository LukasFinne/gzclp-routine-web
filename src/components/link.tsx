import { Link as TanstackLink, type LinkComponentProps } from "@tanstack/react-router";

interface LinkProps {
  to: LinkComponentProps["to"];
  children?: React.ReactNode;
}

export const Link = ({ to, children }: LinkProps) => {
  return <TanstackLink className={"btn btn-ghost"} to={to}>{children}</TanstackLink>;
};

