import { Button } from "@/components/ui/button";
import {
  SignUpButton,
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Navbuttons({ isDashboard = false }) {
  return (
    <>
      <SignedIn>
        <div className="flex gap-4">
          {!isDashboard && (
            <Link href={"/dashboard"}>
              <Button className="text-md px-6">Go To Dashboard</Button>
            </Link>
          )}
          <SignOutButton>
            <Button variant={"outline"} className="text-md px-6">
              Signout
            </Button>
          </SignOutButton>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex gap-4">
          <SignInButton forceRedirectUrl={"/dashboard?from=login"}>
            <Button className="text-md px-6">Login</Button>
          </SignInButton>

          <SignUpButton forceRedirectUrl={"/dashboard?from=signup"}>
            <Button variant={"outline"} className="text-md px-6">
              Signup
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>
    </>
  );
}
