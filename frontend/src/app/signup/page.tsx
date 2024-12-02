import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp appearance={{ baseTheme: dark }} />
    </div>
  );
}
