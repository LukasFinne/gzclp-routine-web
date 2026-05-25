import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Button } from "./button";

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
