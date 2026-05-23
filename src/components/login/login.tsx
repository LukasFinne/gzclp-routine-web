import React, { useActionState, useState } from "react";
import { WarningAlert } from "../alert";
import { loginAction, type LoginState } from "./loginAction";
import { Email } from "./email";
import { Password } from "./password";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [actionState, dispatch, isPending] = useActionState<
    LoginState,
    FormData
  >(
    loginAction,
    { success: false }, // Initial state matches 'LoginState' because we included '| null'
  );
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        {actionState.message && WarningAlert(actionState.message)}
        <form action={dispatch} className="space-y-2">
          <Email
            value={email}
            onInputChange={handleEmailInput}
            disabled={isPending}
            validationErrors={actionState.errors?.email}
          />
          <Password
            value={password}
            onInputChange={handlePasswordInput}
            disabled={isPending}
            validationErrors={actionState.errors?.password}
          />

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

export default Login;
