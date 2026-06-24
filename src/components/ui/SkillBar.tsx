// =============================================================================
// SkillBar — Barra de mana animada
// AGENTS.md Seção 6 (Skills) + Seção 7
// - Anima de 0 → percent quando entra no viewport (IntersectionObserver)
// - Metáfora: "carregamento de mana" — barra preenche esq → dir com cor --color-purple
// - Reduced motion: aparece já preenchida
// - role="progressbar" acessível
// =============================================================================

import { useRef, useState, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Skill } from '@/types/index'

interface SkillBarProps {
  skill: Skill
  delay?: number
}

// Removed unused levelColors

export function SkillBar({ skill, delay = 0 }: SkillBarProps) {
  const prefersReduced = useReducedMotion()
  const barRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(prefersReduced ? skill.percent : 0)
  const [hasAnimated, setHasAnimated] = useState(prefersReduced)

  useEffect(() => {
    if (prefersReduced) {
      setProgress(skill.percent)
      setHasAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            // Atraso opcional por índice para efeito cascata
            setTimeout(() => {
              setProgress(skill.percent)
            }, delay * 100)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (barRef.current) {
      observer.observe(barRef.current)
    }

    return () => observer.disconnect()
  }, [skill.percent, delay, hasAnimated, prefersReduced])

  return (
    <div ref={barRef} className="group mt-4">
      {/* Barra de mana — fundo + fill animado */}
      <div
        role="progressbar"
        aria-valuenow={skill.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name}: ${skill.level} (${skill.percent}%)`}
        className="relative h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
      >
        {/* Trilha de fundo (ranhura de grimório) */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.03) 8px, rgba(255,255,255,0.03) 9px)'
          }}
        />

        {/* Fill animado */}
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${progress}%`,
            transition: prefersReduced
              ? 'none'
              : `width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            background: `linear-gradient(90deg, var(--color-purple-dim), var(--color-purple))`,
            boxShadow: progress > 0
              ? '0 0 8px rgba(127, 119, 221, 0.4)'
              : 'none',
          }}
        >
          {/* Brilho na ponta da barra */}
          <div
            className="absolute right-0 top-0 bottom-0 w-2 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              opacity: progress > 5 ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        </div>
      </div>
    </div>
  )
}
