import { InputWithLabel } from "./inputWithLabel";

interface PasswordProps {
  value: string;
  disabled?: boolean;
  validationErrors: string[] | undefined;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Password = ({
  value,
  disabled,
  onInputChange,
  validationErrors,
}: PasswordProps) => {
  const isValid = validationErrors != undefined;

  return (
    <>
      <InputWithLabel
        id="password"
        type="password"
        disabled={disabled}
        isValid={isValid}
        value={value}
        onInputChange={onInputChange}
      >
        Password
      </InputWithLabel>
      {isValid && <p className="text-error">{validationErrors}</p>}
    </>
  );
};
