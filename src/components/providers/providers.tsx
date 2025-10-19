import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router";
import { router } from "../../routes/router";

export function Providers() {
  return <>
    <HeroUIProvider>
      <main className="text-foreground bg-background w-dvw h-dvh">
        <RouterProvider router={router} />
      </main>
    </HeroUIProvider>
  </>
}