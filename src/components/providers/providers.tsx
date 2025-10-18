import { RouterProvider } from "react-router";
import { router } from "../../routes/router";

export function Providers() {
  return <>
    <RouterProvider router={router} />
  </>
}