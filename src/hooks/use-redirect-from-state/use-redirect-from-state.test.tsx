import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { useRedirectFromState } from './use-redirect-from-state'

function wrapperWithState(state: unknown) {
  return ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={[{ pathname: '/login', state }]}>
      {children}
    </MemoryRouter>
  )
}

describe('useRedirectFromState', () => {
  it('deve retornar o pathname do estado se existir', () => {
    const wrapper = wrapperWithState({ from: { pathname: '/accounts' } })

    const { result } = renderHook(() => useRedirectFromState(), { wrapper })

    expect(result.current).toBe('/accounts')
  })

  it('deve retornar a rota padrão se o estado estiver vazio', () => {
    const wrapper = wrapperWithState(null)

    const { result } = renderHook(() => useRedirectFromState('/fallback'), {
      wrapper,
    })

    expect(result.current).toBe('/fallback')
  })

  it('deve retornar "/" como padrão se nenhum defaultPath for passado', () => {
    const wrapper = wrapperWithState(undefined)

    const { result } = renderHook(() => useRedirectFromState(), {
      wrapper,
    })

    expect(result.current).toBe('/')
  })
})
