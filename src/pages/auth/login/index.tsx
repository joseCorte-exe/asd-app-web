import { SignIn, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { clerkAppearance } from "../../../lib/clerk-config";

export default function LoginPage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Pega a rota de onde veio ou usa home como padrão
  const from = (location.state as { from?: string })?.from || "/";

  useEffect(() => {
    if (isSignedIn) {
      navigate(from, { replace: true });
    }
  }, [isSignedIn, navigate, from]);

  if (isSignedIn) {
    return null; // Ou um loading spinner
  }

  return (
    <div className="flex justify-center items-center">
      <SignIn
        path="/signin"
        appearance={clerkAppearance}
        signUpUrl="/auth/signup"
        forceRedirectUrl={from}
      />
    </div>
  );
}