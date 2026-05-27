import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "style"
> {
  style?: string;
}

export const Button = ({
  name,
  type = "button",
  className = "",
  style = "btn btn-neutral",
  onClick,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      id={name}
      name={name}
      type={type}
      className={`${style} ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
