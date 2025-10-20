import { useLocation, type Location } from 'react-router-dom';

type RedirectState = { from?: { pathname?: string; search?: string } }

export function useRedirectFromState(defaultPath = '/') {
  const location = useLocation() as Location<RedirectState>
  const from = location.state?.from

  return from ? `${from.pathname ?? ''}${from.search ?? ''}` : defaultPath
}
