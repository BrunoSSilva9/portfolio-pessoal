import { useCallback, useEffect, useRef, useState } from 'react'
import type { Theme } from '@/types'

const STORAGE_KEY = 'codex-theme'

/**
 * Hook para gerenciar o tema dark/light e alto contraste.
 * Persiste no localStorage e sincroniza com o atributo data-theme no <html>.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    // Padrão sempre dark (identidade "Codex do Mago") — usuário pode alternar
    return stored ?? 'dark'
  })

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('codex-high-contrast') === 'true'
  })

  const announceRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-high-contrast',
      highContrast ? 'true' : 'false'
    )
    localStorage.setItem('codex-high-contrast', String(highContrast))
  }, [highContrast])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const toggleHighContrast = useCallback(() => {
    setHighContrast((prev) => !prev)
  }, [])

  return { theme, highContrast, toggleTheme, toggleHighContrast, announceRef }
}
