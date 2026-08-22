import { useUser } from "../../lib/hooks";
import { Link } from "../ui/link";
import { SignOut } from "../../features/login/sign-out";

export const Header = () => {
  const { user } = useUser();
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link to="/">
          <p className="text-xl">GZCLP</p>
        </Link>
      </div>
      <div className="navbar-end">
        {user ? (
          <SignOut />
        ) : (
          <Link to="/login" className="btn btn-primary">
            <p className="text-lg">Login</p>
          </Link>
        )}
      </div>
    </div>
  );
};
