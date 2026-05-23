import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import React, { useActionState, useState } from "react";
import z from "zod";
import { auth } from "../lib/firebase";

const createLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type LoginState = {
  success: boolean;
  message: string | null;
} | null;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const loginAction = async (
    prevState: LoginState, // The first argument is the state, NOT the form data
    formData: FormData,
  ): Promise<LoginState> => {
    // Must return the same LoginState type

    const validatedFields = createLoginSchema.safeParse(
      Object.fromEntries(formData),
    );

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const { email, password } = validatedFields.data;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, message: "Logged in successfully!" };
    } catch (err: any) {
      console.error(err);
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }
  };

  const [actionState, dispatch, isPending] = useActionState<
    LoginState,
    FormData
  >(
    loginAction,
    null, // Initial state matches 'LoginState' because we included '| null'
  );
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        {actionState?.message && (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{actionState.message}</span>
          </div>
        )}
        <form action={dispatch} className="space-y-2">
          {/*Like the article with comments and posts. use the composition pattern for email and password */}
          <InputWithLabel
            id="email"
            type="email"
            disabled={isPending}
            value={email}
            onInputChange={handleEmailInput}
          >
            Email
          </InputWithLabel>
          <InputWithLabel
            id="password"
            type="password"
            disabled={isPending}
            value={password}
            onInputChange={handlePasswordInput}
          >
            Password
          </InputWithLabel>
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-neutral mt-4 w-full"
          >
            {isPending ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              <p>Login</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// 1. Define the interface for your props
interface InputWithLabelProps {
  id: string;
  value: string;
  type?: string; // Optional because you provided a default value ("text")
  disabled?: boolean;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode; // Correct type for anything passed between component tags
}

// 2. Apply the interface to the component
const InputWithLabel = ({
  id,
  value,
  type = "text",
  disabled = false,
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
        className="input"
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
export default Login;
