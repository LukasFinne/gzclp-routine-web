interface InputWithLabelProps {
  id: string;
  value: string;
  type?: string;
  disabled?: boolean;
  isValid?: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

export const InputWithLabel = ({
  id,
  value,
  type = "text",
  disabled = false,
  isValid = true,
  onInputChange,
  children,
}: InputWithLabelProps) => {
  return (
    <>
      <label className="label" htmlFor={id}>
        {children}
      </label>
      &nbsp;
      <input
        className={`input ${isValid ? "input-error" : ""}`}
        name={id}
        id={id}
        disabled={disabled}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};
