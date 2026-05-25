interface ButtonProps {
  name: string;
  type?: "button" | "submit";
  style?: string;
}
export const Button = ({
  name,
  type = "button",
  style = "btn btn-netural",
}: ButtonProps) => {
  return (
    <button id={name} type={type} className={style}>
      {name}
    </button>
  );
};
