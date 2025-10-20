import { ClerkProvider } from "@clerk/clerk-react";
import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router";
import { env } from "../../env";
import { clerkAppearance, clerkLocalization } from "../../lib/clerk-config";
import { router } from "../../routes/router";

export function Providers() {
  return <>
    <HeroUIProvider>
      <ClerkProvider
        publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY}
        appearance={clerkAppearance}
        localization={clerkLocalization}
      >
        <RouterProvider router={router} />
      </ClerkProvider>
    </HeroUIProvider>
  </>
}
