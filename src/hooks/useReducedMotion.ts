import { useEffect, useState } from 'react'

/**
 * Hook para detectar a preferência do usuário por movimento reduzido.
 * Respeita a media query `prefers-reduced-motion: reduce`.
 *
 * Uso: desabilitar animações Framer Motion e GSAP condicionalmente.
 * eMAG rec. 2.5
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)

    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
