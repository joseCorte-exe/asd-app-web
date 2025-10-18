import React from 'react'
import type { LazyRouteFunction, RouteObject } from 'react-router-dom'

type ImportFn = Promise<{ default: () => React.ReactNode }>
type LazyImportFunction = (importFn: ImportFn) => LazyRouteFunction<RouteObject>

export const lazyImport: LazyImportFunction = (importFn) => async () => ({
  Component: (await importFn).default,
})
