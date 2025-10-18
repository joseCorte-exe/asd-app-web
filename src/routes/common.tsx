import type { RouteObject } from "react-router";
import { lazyImport } from "../utils/lazy-import";

export const commonRoutes: RouteObject[] = [
  {
    path: "/",
    lazy: lazyImport(import("../pages/auth/login"))
  }
]
