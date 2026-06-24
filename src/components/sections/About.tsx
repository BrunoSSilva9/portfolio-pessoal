// =============================================================================
// Seção About — "O Grimório"
// Fase 2: conteúdo real com dados de Bruno + visual polido
// Fase 4: scroll reveal com Framer Motion
// =============================================================================

import { useState } from 'react'
import { SectionReveal } from '@/components/ui/SectionReveal'

const hobbies = [
  {
    emoji: '📚',
    label: 'Apaixonado por livros de ficção científica e fantasia',
    short: 'Leitura',
  },
  {
    emoji: '🏐',
    label: 'Apreciador de vôlei (voleifã',
    short: 'Vôlei',
  },
  {
    emoji: '✨',
    label: 'Fã de animes/séries de magia — Pokémon e Black Clover',
    short: 'Séries',
  },
]

const timelineSteps = [
  {
    year: '2023',
    label: 'Início',
    desc: '1º semestre',
    done: true,
    current: false,
  },
  {
    year: '2026',
    label: 'Agora',
    desc: '7º semestre',
    done: true,
    current: true,
  },
  {
    year: 'Maio/2027',
    label: 'Formatura',
    desc: 'Previsão',
    done: false,
    current: false,
  },
]

export default function About() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div className="section-container">
        <SectionReveal>
          {/* Cabeçalho de seção */}
          <p className="section-label mb-4">Seção 02</p>
          <h2
            id="about-heading"
            className="font-display"
            style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}
          >
            O Grimório
          </h2>
          <div className="magic-divider mb-12" aria-hidden="true" />
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Foto / Avatar ──────────────────────────────────────────────── */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Moldura com gradiente dourado */}
              <div
                className="relative w-72 h-72 rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 0 0 2px var(--color-gold), var(--glow-gold)',
                }}
              >
                {/* TODO: Substituir pelo src da sua foto real */}
                {<img
                  src="/foto-bruno.webp"
                  alt="Foto de Bruno da Silva dos Santos, desenvolvedor e estudante de Sistemas de Informação"
                  width={288}
                  height={288}
                  className="w-full h-full object-cover"
                />}

                {/* Placeholder enquanto a foto não é adicionada */}
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-3"
                  style={{ background: 'var(--color-bg-tertiary)' }}
                  role="img"
                  aria-label="Foto de Bruno da Silva dos Santos"
                >
                  <span style={{ fontSize: '4rem' }} aria-hidden="true">🧙‍♂️</span>
                  <span
                    className="font-body text-xs"
                    style={{ color: 'var(--color-text-tertiary)', letterSpacing: '0.1em' }}
                  >
                    foto em breve
                  </span>
                </div>

                {/* Overlay de gradiente sutil na borda */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(232,168,56,0.05) 0%, transparent 50%, rgba(127,119,221,0.05) 100%)',
                  }}
                />
              </div>

              {/* Badge flutuante — UNIFESSPA */}
              <div
                className="absolute -bottom-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border-accent)',
                  boxShadow: 'var(--glow-purple)',
                }}
                role="complementary"
                aria-label="Universidade Federal do Sul e Sudeste do Pará"
              >
                <span aria-hidden="true" style={{ fontSize: '1.125rem' }}>🎓</span>
                <div>
                  <p
                    className="font-body font-bold"
                    style={{ fontSize: '0.6875rem', color: 'var(--color-purple)', lineHeight: 1.2 }}
                  >
                    UNIFESSPA
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: '0.625rem', color: 'var(--color-text-tertiary)', lineHeight: 1.2 }}
                  >
                    7º semestre
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Texto + conteúdo ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p
                className="font-body leading-relaxed"
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                  lineHeight: 1.8,
                }}
              >
                Olá! Sou Bruno, estudante de{' '}
                <strong style={{ color: 'var(--color-text-primary)' }}>
                  Sistemas de Informação
                </strong>{' '}
                na{' '}
                <abbr title="Universidade Federal do Sul e Sudeste do Pará">
                  UNIFESSPA
                </abbr>
                {' '}e desenvolvedor em construção. Apaixonado por criar
                soluções que realmente fazem diferença — com código limpo,
                interfaces acessíveis e atenção aos detalhes.
              </p>

              <p
                className="font-body leading-relaxed"
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                  lineHeight: 1.8,
                }}
              >
                Fora do teclado, você me encontra lendo livros de fantasia,
                vendo uma boa partida de vôlei ou assistindo animes(eventualmente é fato!). Essa mistura de mundos
                alimenta minha criatividade e minha forma de pensar em sistemas.
              </p>
            </div>

            {/* Hobbies */}
            <div>
              <p
                className="font-body font-semibold mb-3"
                style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                Interesses
              </p>
              <div className="flex gap-4" role="list" aria-label="Hobbies e interesses pessoais">
                {hobbies.map((hobby) => (
                  <div
                    key={hobby.short}
                    role="listitem"
                    className="relative flex flex-col items-center gap-2 cursor-default"
                    onMouseEnter={() => setHovered(hobby.short)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(hobby.short)}
                    onBlur={() => setHovered(null)}
                    tabIndex={0}
                    aria-label={hobby.label}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-200"
                      style={{
                        background:
                          hovered === hobby.short
                            ? 'var(--color-bg-primary)'
                            : 'var(--color-bg-tertiary)',
                        border: `1px solid ${hovered === hobby.short ? 'var(--color-border-accent)' : 'var(--color-border)'}`,
                        boxShadow: hovered === hobby.short ? 'var(--glow-purple)' : 'none',
                      }}
                    >
                      <span role="img" aria-hidden="true">{hobby.emoji}</span>
                    </div>
                    <span
                      className="font-body"
                      style={{ fontSize: '0.6875rem', color: 'var(--color-text-tertiary)' }}
                    >
                      {hobby.short}
                    </span>

                    {/* Tooltip */}
                    {hovered === hobby.short && (
                      <div
                        role="tooltip"
                        className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg z-10"
                        style={{
                          background: 'var(--color-bg-primary)',
                          border: '1px solid var(--color-border-accent)',
                          fontSize: '0.75rem',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {hobby.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline de graduação */}
            <div>
              <p
                className="font-body font-semibold mb-4"
                style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                Jornada Acadêmica
              </p>

              <div
                className="flex items-start gap-0"
                role="list"
                aria-label="Progresso da graduação em Sistemas de Informação"
              >
                {timelineSteps.map((step, i) => (
                  <div key={step.year} className="flex items-center" role="listitem">
                    <span className="sr-only">{step.label}: </span>
                    <div className="flex flex-col items-center gap-1">
                      {/* Ponto */}
                      <div
                        aria-hidden="true"
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                        style={{
                          background: step.done ? 'var(--color-gold)' : 'transparent',
                          borderColor: step.current
                            ? 'var(--color-gold)'
                            : step.done
                              ? 'var(--color-gold)'
                              : 'var(--color-border)',
                          boxShadow: step.current ? 'var(--glow-gold)' : 'none',
                        }}
                      >
                        {step.current && (
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: 'var(--color-bg-primary)' }}
                          />
                        )}
                      </div>

                      {/* Labels */}
                      <span
                        className="font-body font-medium whitespace-nowrap"
                        style={{
                          fontSize: '0.6875rem',
                          color: step.done ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                        }}
                      >
                        {step.year}
                      </span>
                      <span
                        className="font-body whitespace-nowrap"
                        style={{ fontSize: '0.625rem', color: 'var(--color-text-tertiary)' }}
                      >
                        {step.desc}
                      </span>
                    </div>

                    {/* Linha conectora */}
                    {i < timelineSteps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="h-px mx-2 mb-8"
                        style={{
                          width: '4rem',
                          background: step.done
                            ? 'linear-gradient(90deg, var(--color-gold), rgba(232,168,56,0.3))'
                            : 'var(--color-border)',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA para contato */}
            <div className="flex gap-3 flex-wrap">
              <a
                href="#contact"
                className="btn-primary"
                style={{ paddingBlock: '0.625rem', fontSize: '0.875rem' }}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Entre em contato
              </a>
              <a
                href="https://www.linkedin.com/in/bruno-silva-530726274"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver perfil de Bruno Santos no LinkedIn (abre em nova aba)"
                className="btn-secondary"
                style={{ paddingBlock: '0.625rem', fontSize: '0.875rem' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
