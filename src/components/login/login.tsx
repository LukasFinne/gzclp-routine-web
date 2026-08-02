import React, { useActionState, useState } from "react";
import { WarningAlert } from "../alert";
import { loginAction, type LoginState } from "./loginAction";
import { Email } from "./email";
import { Password } from "./password";
import { Button } from "../button";
import { LoadingDots } from "../loading";
import { Navigate, type LinkComponentProps } from "@tanstack/react-router";

interface LoginProps{
  redirect?: LinkComponentProps["to"]
}

const Login = ({ redirect }: LoginProps) => {
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

  if (actionState.success && redirect) {
    return <Navigate to={redirect} replace />
  }

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
          <Button type="submit" name="loginBtn" className="mt-4 w-full">
            {isPending ? (
              <LoadingDots />
            ) : (
              <p>Login</p>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
