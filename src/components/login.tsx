import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import React, { useState, type ChangeEvent } from "react";
import z from "zod";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth/cordova";
import { useUser } from "../lib/hooks";

const createLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const Login = () => {
  const user = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const loginAction = async (formData: FormData) => {
    const { email, password } = createLoginSchema.parse(
      Object.fromEntries(formData),
    );
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out!");
      })
      .catch((error) => {
        console.log(error);
        console.log("Something unexpected happened!");
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <p>{user?.email}</p>
            {user && (
              <button onClick={handleSignOut} className="btn btn-neutral mt-4">
                Sign out
              </button>
            )}
            <form action={loginAction} className="space-y-2">
              {/*Like the article with comments and posts. use the composition pattern for email and password */}
              <InputWithLabel
                id="email"
                type="email"
                value={email}
                onInputChange={handleEmailInput}
              >
                Email
              </InputWithLabel>
              <InputWithLabel
                id="password"
                type="password"
                value={password}
                onInputChange={handlePasswordInput}
              >
                Password
              </InputWithLabel>
              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// 1. Define the interface for your props
interface InputWithLabelProps {
  id: string;
  value: string;
  type?: string; // Optional because you provided a default value ("text")
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode; // Correct type for anything passed between component tags
}

// 2. Apply the interface to the component
const InputWithLabel = ({
  id,
  value,
  type = "text",
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
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};
export default Login;
