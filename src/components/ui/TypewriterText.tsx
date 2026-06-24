// =============================================================================
// TypewriterText — Efeito de digitação para o subtítulo do Hero
// AGENTS.md Seção 6 (Hero) + Seção 7
// - Velocidade: 60ms por caractere, pausa 2000ms entre strings
// - aria-live="off" no elemento visual (não anunciar letra por letra)
// - <span sr-only> com texto completo estático para leitores de tela
// - Reduced motion: mostra apenas a primeira string, sem animação
// =============================================================================

import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface TypewriterTextProps {
  strings: string[]
  typingSpeed?: number  // ms por caractere
  pauseDuration?: number // ms de pausa ao completar
  className?: string
}

export function TypewriterText({
  strings,
  typingSpeed = 60,
  pauseDuration = 2000,
  className,
}: TypewriterTextProps) {
  const prefersReduced = useReducedMotion()
  const [displayed, setDisplayed] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPausing, setIsPausing] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Se prefere menos movimento, não anima
    if (prefersReduced) return

    const currentString = strings[currentIndex]

    // Limpeza de timeout anterior
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (isPausing) {
      // Pausa após completar a digitação
      timeoutRef.current = setTimeout(() => {
        setIsPausing(false)
        setIsDeleting(true)
      }, pauseDuration)
      return
    }

    if (!isDeleting) {
      // Digitando
      if (displayed.length < currentString.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(currentString.slice(0, displayed.length + 1))
        }, typingSpeed)
      } else {
        // Completou — inicia pausa
        setIsPausing(true)
      }
    } else {
      // Apagando
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, typingSpeed / 2) // Apagar é mais rápido
      } else {
        // Completou apagar — avança para próxima string
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % strings.length)
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayed, currentIndex, isDeleting, isPausing, prefersReduced, strings, typingSpeed, pauseDuration])

  // Reduced motion: exibe apenas a primeira string
  if (prefersReduced) {
    return (
      <span className={className} aria-live="off">
        {strings[0]}
      </span>
    )
  }

  return (
    <span className={className} aria-live="off" aria-atomic="false">
      {/* Texto estático para leitores de tela */}
      <span className="sr-only">{strings.join(', ')}</span>

      {/* Texto visual animado — oculto de leitores de tela */}
      <span 
        aria-hidden="true"
        className={strings[currentIndex]?.startsWith('//') ? 'font-mono text-[var(--color-purple)] text-[0.9em]' : ''}
      >
        {displayed}
        <span
          aria-hidden="true"
          className="inline-block ml-0.5 h-[1em] w-[2px] bg-current align-middle animate-blink"
        />
      </span>
    </span>
  )
}
