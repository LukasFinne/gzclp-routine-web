import { InputWithLabel } from "./inputWithLabel";

interface EmailProps {
  value: string;
  disabled?: boolean;
  validationErrors: string[] | undefined;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Email = ({
  value,
  disabled,
  onInputChange,
  validationErrors,
}: EmailProps) => {
  const isValid = validationErrors != undefined;
  return (
    <>
      <InputWithLabel
        id="email"
        type="text"
        disabled={disabled}
        value={value}
        isValid={isValid}
        onInputChange={onInputChange}
      >
        Email
      </InputWithLabel>
      {isValid && <p className="text-error">{validationErrors}</p>}
    </>
  );
};
