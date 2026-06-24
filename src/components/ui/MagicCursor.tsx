// =============================================================================
// MagicCursor — Cursor customizado para desktop
// AGENTS.md Seção 7
// - Círculo roxo 12px com lerp suave seguindo o mouse
// - Hover em elementos clicáveis: expande para 40px com mix-blend-mode: difference
// - pointer: coarse (mobile/touch) → não renderiza
// - Reduced motion → não renderiza
// =============================================================================

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function MagicCursor() {
  const prefersReduced = useReducedMotion()
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const rafRef = useRef<number>(0)

  // Detectar dispositivo touch/coarse pointer — não renderiza em mobile
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    if (mq.matches) {
      setIsPointer(true) // coarse = mobile → não renderiza
    }
    const handler = (e: MediaQueryListEvent) => setIsPointer(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    // Não inicializa em mobile ou reduced motion
    if (isPointer || prefersReduced) return

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.closest('a, button, [role="button"]') !== null
      setIsHovering(isClickable)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setIsHovering(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Loop de animação com lerp
    const animate = () => {
      // Lerp: posição atual → target
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.12
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.12

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetRef.current.x}px, ${targetRef.current.y}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    // Esconder cursor padrão
    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
      document.body.style.cursor = ''
    }
  }, [isPointer, prefersReduced, isVisible])

  // Não renderizar em mobile ou reduced motion
  if (isPointer || prefersReduced) return null

  return (
    <>
      {/* Círculo grande (lag) — mix-blend-mode: difference ao hover */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? 40 : 14,
          height: isHovering ? 40 : 14,
          marginLeft: isHovering ? -20 : -7,
          marginTop: isHovering ? -20 : -7,
          borderRadius: '50%',
          backgroundColor: isHovering ? 'var(--color-purple)' : 'transparent',
          border: `2px solid ${isHovering ? 'transparent' : 'var(--color-purple)'}`,
          mixBlendMode: isHovering ? 'difference' : 'normal',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.25s ease, height 0.25s ease, margin 0.25s ease, background-color 0.25s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
      {/* Ponto central (segue imediatamente) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          borderRadius: '50%',
          backgroundColor: isHovering ? 'var(--color-gold)' : 'var(--color-purple)',
          pointerEvents: 'none',
          zIndex: 100000,
          opacity: isVisible ? 1 : 0,
          transition: 'background-color 0.2s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
