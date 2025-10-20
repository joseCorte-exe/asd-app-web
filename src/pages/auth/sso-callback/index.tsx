import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export default function SSOCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="text-foreground mb-4">Processando login...</div>
        <AuthenticateWithRedirectCallback />
      </div>
    </div>
  );
}