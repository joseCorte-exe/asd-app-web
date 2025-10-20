import type { RouteObject } from "react-router";
import { lazyImport } from "../utils/lazy-import";

export const commonRoutes: RouteObject[] = [
  {
    path: "/",
    lazy: lazyImport(import("../pages/home"))
  },
  {
    path: "/signin",
    lazy: lazyImport(import("../pages/auth/login"))
  },
  {
    path: "/signin/sso-callback",
    lazy: lazyImport(import("../pages/auth/sso-callback"))
  },
  {
    path: "/auth/signup",
    lazy: lazyImport(import("../pages/auth/signup"))
  }
]
