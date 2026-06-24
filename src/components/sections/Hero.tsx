// =============================================================================
// Seção Hero — "Invocação"
// Fase 4: ParticleCanvas Three.js + TypewriterText animado + Framer Motion
// =============================================================================

import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { TypewriterText } from '@/components/ui/TypewriterText'

const ParticleCanvas = lazy(() => import('@/components/ui/ParticleCanvas').then(m => ({ default: m.ParticleCanvas })))

gsap.registerPlugin(ScrollTrigger)

// Textos que o typewriter vai alternar (AGENTS.md Seção 6)
const TYPEWRITER_TEXTS = [
  '// ogarotodev',
  'Estudante de Sistemas de Informação',
  'Desenvolvedor Full Stack',
  'Aprendiz de Feitiços em Código',
]

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Defer canvas mounting to prioritize main content paint (improves LCP and TBT)
    const timeout = setTimeout(() => setIsMounted(true), 300)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      particlesRef.current.forEach((particle, i) => {
        if (!particle) return
        // Efeito parallax: cada partícula move verticalmente em velocidades diferentes
        gsap.to(particle, {
          y: (i + 1) * 30, // move para baixo (ou negativo para cima) simulando profundidade
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReduced])

  // Variantes de animação de entrada (fade + slide up)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden:   { opacity: 0, y: 24 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        background: 'var(--color-bg-primary)',
        paddingInline: 'var(--section-padding-x)',
        paddingTop: 'calc(var(--a11y-bar-height, 36px) + var(--navbar-height, 64px))'
      }}
    >
      {/* ── Three.js ParticleCanvas — aria-hidden, pointer-events: none ────── */}
      {isMounted && !prefersReduced && (
        <Suspense fallback={null}>
          <ParticleCanvas />
        </Suspense>
      )}

      {/* ── Grade decorativa (subtle) ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Partículas decorativas estáticas com Parallax ─────────────── */}
      {[
        { top: '18%', left: '8%',  size: 3, color: '--color-gold',    opacity: 0.5 },
        { top: '30%', right: '6%', size: 2, color: '--color-purple',  opacity: 0.7 },
        { top: '65%', left: '12%', size: 2, color: '--color-emerald', opacity: 0.4 },
        { top: '75%', right: '10%',size: 3, color: '--color-gold',    opacity: 0.3 },
        { top: '12%', right: '20%',size: 1.5,color: '--color-purple', opacity: 0.6 },
        { top: '55%', left: '4%', size: 1.5,color: '--color-emerald', opacity: 0.5 },
      ].map((p, i) => (
        <div
          key={i}
          ref={(el) => { if (el) particlesRef.current[i] = el }}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            top: p.top,
            left: 'left' in p ? p.left : undefined,
            right: 'right' in p ? p.right : undefined,
            width: p.size,
            height: p.size,
            background: `var(${p.color})`,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 4}px var(${p.color})`,
            animation: prefersReduced ? 'none' : `pulse_slow ${3 + i * 0.5}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* ── Conteúdo principal ───────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6"
        initial={prefersReduced ? 'visible' : 'hidden'}
        animate="visible"
        variants={prefersReduced ? {} : containerVariants}
      >
        {/* Label decorativa de seção */}
        <motion.div
          className="flex items-center gap-3"
          aria-hidden="true"
          variants={prefersReduced ? {} : itemVariants}
        >
          <div style={{ width: 40, height: 1, background: 'var(--color-gold)', opacity: 0.6 }} />
          <span
            className="font-body font-semibold text-xs tracking-[0.25em] uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            Portfólio
          </span>
          <div style={{ width: 40, height: 1, background: 'var(--color-gold)', opacity: 0.6 }} />
        </motion.div>

        {/* H1 — único na página (eMAG rec. 3.5) */}
        <motion.h1
          id="hero-heading"
          className="font-display font-bold"
          style={{
            fontSize: 'clamp(2.25rem, 6vw, 4rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
          }}
          variants={prefersReduced ? {} : itemVariants}
        >
          Bruno{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--color-gold), var(--color-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            da Silva
          </span>
          {' '}dos Santos
        </motion.h1>

        {/* Subtítulo com TypewriterText */}
        <motion.div
          className="relative"
          variants={prefersReduced ? {} : itemVariants}
        >
          {/* Texto estático para leitores de tela (sr-only) */}
          <p className="sr-only">
            {TYPEWRITER_TEXTS.join(' | ')}
          </p>

          {/* TypewriterText — aria-live="off", aria-hidden="true" no elemento visual */}
          <p
            aria-hidden="true"
            className="font-body font-medium"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.375rem)',
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.01em',
              minHeight: '1.8em',
            }}
          >
            <TypewriterText
              strings={TYPEWRITER_TEXTS}
              typingSpeed={60}
              pauseDuration={2000}
            />
          </p>
        </motion.div>

        {/* Descrição */}
        <motion.p
          className="font-body max-w-2xl"
          style={{
            fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
            lineHeight: 1.8,
            color: 'var(--color-text-secondary)',
          }}
          variants={prefersReduced ? {} : itemVariants}
        >
          Transformando lógica em magia digital na{' '}
          <abbr title="Universidade Federal do Sul e Sudeste do Pará">UNIFESSPA</abbr>.
          {' '}Construindo soluções robustas com foco em acessibilidade,
          performance e experiência do usuário.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-2"
          variants={prefersReduced ? {} : itemVariants}
        >
          <a
            href="#projects"
            id="hero-cta-projects"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Ver Projetos
            <svg
              width="16" height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>

          <a
            href="/cv-bruno-santos.pdf"
            id="hero-cta-cv"
            className="btn-secondary"
            download
            aria-label="Baixar CV — currículo de Bruno da Silva dos Santos em PDF"
          >
            <svg
              width="16" height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Baixar CV
          </a>
        </motion.div>

        {/* Indicadores de stack — decorativos */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mt-4"
          aria-label="Principais tecnologias"
          role="list"
          variants={prefersReduced ? {} : itemVariants}
        >
          {['React', 'TypeScript', 'Python', 'Java', 'Node.js', 'SQL'].map((tech) => (
            <span
              key={tech}
              role="listitem"
              className="badge"
              style={{
                background: 'rgba(127,119,221,0.08)',
                color: 'var(--color-text-tertiary)',
                border: '1px solid var(--color-border)',
                fontSize: '0.6875rem',
                letterSpacing: '0.05em',
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Indicador de scroll ──────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={prefersReduced ? { opacity: 0.4 } : { opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          animation: prefersReduced ? 'none' : `scroll_bounce 1.5s ease-in-out infinite 2s`,
        }}
      >
        <span
          className="font-body font-semibold"
          style={{ fontSize: '0.625rem', letterSpacing: '0.2em', color: 'var(--color-text-tertiary)' }}
        >
          SCROLL
        </span>
        <svg
          width="16" height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  )
}
