import { Link } from "@tanstack/react-router";
import { useUser } from "../lib/hooks";
import { SignOut } from "./sign-out";

export const Header = () => {
  const { user } = useUser();
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          GZCLP
        </Link>
      </div>
      <div className="navbar-end">{user && <SignOut />}</div>
    </div>
  );
};
