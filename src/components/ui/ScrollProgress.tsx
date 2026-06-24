import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const prefersReduced = useReducedMotion()
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReduced || !progressBarRef.current) return

    // Animação da barra de progresso de leitura (mana global do grimório)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2, // Scrub suave
      },
    })

    tl.fromTo(
      progressBarRef.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none' }
    )

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [prefersReduced])

  if (prefersReduced) return null

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
      }}
    >
      <div
        ref={progressBarRef}
        className="h-full origin-left"
        style={{
          background: 'linear-gradient(90deg, var(--color-purple), var(--color-gold))',
          boxShadow: 'var(--glow-purple)',
        }}
      />
    </div>
  )
}
