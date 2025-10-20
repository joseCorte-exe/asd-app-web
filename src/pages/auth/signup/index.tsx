import { SignUp } from "@clerk/clerk-react";
import { clerkAppearance } from "../../../lib/clerk-config";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center">
      <SignUp
        path="/auth/signup"
        appearance={clerkAppearance}
        signInUrl="/signin"
        forceRedirectUrl="/"
      />
    </div>
  );
}