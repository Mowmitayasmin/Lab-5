import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";

export function Nav() {
  const { isSignedIn, user } = useUser();

  return (
    <nav>
      <div className="links">
        {isSignedIn && (
          <>
            {" "}
            <span>
              <Link to="/employees">Employees</Link>
            </span>
            <span>
              <Link to="/organization">Organization</Link>
            </span>
            <SignedIn>
              <span>{user?.fullName}</span>
              <SignOutButton>Sign out</SignOutButton>
            </SignedIn>
          </>
        )}
        <SignedOut>
          <SignInButton>Sign in</SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
