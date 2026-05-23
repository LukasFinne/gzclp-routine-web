import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export const SignOut = () => {
  const signOutAction = async () => {
    try {
      await signOut(auth);
      console.log("Logged out!");
    } catch(error) {
      console.log(error);
      console.log("Something unexpected happened!");
    }
  };

  return (
    <form action={signOutAction}>
      <Button name="Sign out" type="submit" />
    </form>
  );
};
interface ButtonProps {
  name: string;
  type?: "button" | "submit";
  style?: string;
}
const Button = ({
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
