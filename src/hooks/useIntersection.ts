import { useEffect, useRef, useState } from 'react'

interface UseIntersectionOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
}

/**
 * Hook para detectar quando um elemento entra no viewport.
 * Usado para disparar animações de scroll e lazy loading.
 */
export function useIntersection<T extends HTMLElement = HTMLElement>({
  threshold = 0.15,
  rootMargin = '0px',
  triggerOnce = true,
}: UseIntersectionOptions = {}) {
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting
        setIsIntersecting(intersecting)

        if (intersecting && !hasIntersected) {
          setHasIntersected(true)
        }

        if (intersecting && triggerOnce) {
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [threshold, rootMargin, triggerOnce, hasIntersected])

  return { ref, isIntersecting, hasIntersected }
}
