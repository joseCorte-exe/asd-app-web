import { SignIn } from "@clerk/clerk-react";
import { useRedirectFromState } from "../../../hooks/use-redirect-from-state";
import { clerkAppearance } from "../../../lib/clerk-config";

const REDIRECT_STORAGE_KEY = '@asd-app/redirect-from'

export default function LoginPage() {
  const from = useRedirectFromState()

  const getRedirectUrl = () => {
    if (from && from !== '/') {
      sessionStorage.setItem(REDIRECT_STORAGE_KEY, from)
      return from
    }
    return sessionStorage.getItem(REDIRECT_STORAGE_KEY) || from
  }

  const redirectUrl = getRedirectUrl()

  console.log('LoginPage render, redirectUrl:', redirectUrl)

  return (
    <div className="flex justify-center items-center">
      <SignIn
        path="/signin"
        appearance={clerkAppearance}
        signUpUrl="/auth/signup"
        forceRedirectUrl={redirectUrl}
      />
    </div>
  );
}