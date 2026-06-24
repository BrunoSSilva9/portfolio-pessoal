// =============================================================================
// SectionReveal — Wrapper de animação scroll com Framer Motion
// AGENTS.md Seção 7 — Fase 4
// Reduced motion: renderiza visível imediatamente, sem animação
// =============================================================================

import { m } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SectionRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function SectionReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
}: SectionRevealProps) {
  const prefersReduced = useReducedMotion()

  const directionOffset = {
    up:    { y: 30,  x: 0   },
    down:  { y: -30, x: 0   },
    left:  { y: 0,   x: 30  },
    right: { y: 0,   x: -30 },
  }

  const variants = {
    hidden: {
      opacity: 0,
      ...directionOffset[direction],
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={prefersReduced ? {} : variants}
    >
      {children}
    </motion.div>
  )
}

// Variant para stagger de listas (filhos revelados sequencialmente)
export function SectionRevealGroup({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  const prefersReduced = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  // Removed unused childVariants

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Filhos devem usar <RevealItem> */}
      {children}
    </m.div>
  )
}

// Filho para uso dentro de SectionRevealGroup
export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  )
}
