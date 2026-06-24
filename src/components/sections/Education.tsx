// =============================================================================
// Seção Education — "Jornada do Aprendiz"
// Dados reais: UNIFESSPA, Sistemas de Informação, 7º semestre, Dez/2026
// Fase 2: timeline vertical polida
// =============================================================================

import { educationItems } from '@/data/education'
import type { EducationItem } from '@/types'
import { SectionReveal } from '@/components/ui/SectionReveal'

const typeConfig: Record<
  EducationItem['type'],
  { label: string; color: string; dimColor: string; icon: string }
> = {
  graduacao:    { label: 'Graduação',    color: 'var(--color-gold)',    dimColor: 'rgba(232,168,56,0.15)',  icon: '🎓' },
  curso:        { label: 'Curso',        color: 'var(--color-purple)',  dimColor: 'rgba(127,119,221,0.15)', icon: '📖' },
  certificacao: { label: 'Certificação', color: 'var(--color-emerald)', dimColor: 'rgba(29,158,117,0.15)',  icon: '✅' },
  bootcamp:     { label: 'Bootcamp',     color: 'var(--color-purple)',  dimColor: 'rgba(127,119,221,0.15)', icon: '⚡' },
  evento:       { label: 'Evento',       color: 'var(--color-text-secondary)', dimColor: 'var(--color-bg-tertiary)', icon: '🎪' },
}

export default function Education() {
  const sorted = [...educationItems].sort((a, b) => b.startYear - a.startYear)

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div className="section-container">
        <SectionReveal>
          {/* Cabeçalho */}
          <p className="section-label mb-4">Seção 06</p>
          <h2
            id="education-heading"
            className="font-display"
            style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}
          >
            Jornada do Aprendiz
          </h2>
          <div className="magic-divider mb-6" aria-hidden="true" />

          <p
            className="font-body mb-12 max-w-xl"
            style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}
          >
            Formação acadêmica e complementar — cada etapa rumo ao
            desenvolvimento de software profissional.
          </p>
        </SectionReveal>

        {/* Timeline como <ol> — eMAG: ordem cronológica é semântica */}
        <ol
          aria-label="Linha do tempo de formação acadêmica e complementar"
          className="relative flex flex-col gap-0"
          style={{ paddingLeft: '0', listStyle: 'none' }}
        >
          {/* Linha vertical decorativa */}
          <div
            aria-hidden="true"
            className="absolute"
            style={{
              left: '1.125rem',
              top: '1.5rem',
              bottom: '1.5rem',
              width: '2px',
              background: 'linear-gradient(180deg, var(--color-gold) 0%, var(--color-purple-dim) 50%, var(--color-border) 100%)',
              borderRadius: '2px',
            }}
          />

          {sorted.map((item, index) => {
            const cfg = typeConfig[item.type]
            const isInProgress = !item.endYear
            const isLast = index === sorted.length - 1

            return (
              <li
                key={item.id}
                className="relative"
                style={{ paddingLeft: '3.5rem', paddingBottom: isLast ? 0 : '2.5rem' }}
              >
                {/* Marcador da timeline */}
                <div
                  aria-hidden="true"
                  className="absolute flex items-center justify-center rounded-full"
                  style={{
                    left: 0,
                    top: 0,
                    width: '2.25rem',
                    height: '2.25rem',
                    background: cfg.dimColor,
                    border: `2px solid ${cfg.color}`,
                    boxShadow: `0 0 14px ${cfg.color}30`,
                    fontSize: '1rem',
                    zIndex: 1,
                  }}
                >
                  {cfg.icon}
                </div>

                {/* Card */}
                <div
                  className="card-base"
                  style={{
                    borderLeft: `3px solid ${cfg.color}`,
                    borderLeftColor: cfg.color,
                    transition: 'box-shadow 250ms ease, border-color 250ms ease',
                  }}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex flex-col gap-1.5">
                      {/* Badge de tipo */}
                      <span
                        className="badge w-fit"
                        style={{
                          background: cfg.dimColor,
                          color: cfg.color,
                          border: `1px solid ${cfg.color}40`,
                          fontSize: '0.6875rem',
                        }}
                      >
                        {cfg.label}
                      </span>

                      {/* Título */}
                      <h3
                        className="font-display font-bold"
                        style={{
                          color: 'var(--color-text-primary)',
                          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                          lineHeight: 1.3,
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* Instituição */}
                      <p
                        className="font-body"
                        style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}
                      >
                        {item.institution}
                      </p>
                    </div>

                    {/* Período */}
                    <div className="text-right shrink-0">
                      <div
                        className="font-body font-semibold tabular-nums"
                        style={{ color: cfg.color, fontSize: '0.9375rem' }}
                      >
                        <time dateTime={String(item.startYear)}>{item.startYear}</time>
                        {(item.endYear ?? item.expectedYear) && (
                          <>
                            {' '}–{' '}
                            <time dateTime={String(item.endYear ?? item.expectedYear)}>
                              {item.endYear ?? `Dez/${item.expectedYear}`}
                            </time>
                          </>
                        )}
                      </div>

                      {isInProgress && (
                        <span
                          className="badge mt-1"
                          style={{
                            background: 'rgba(29,158,117,0.12)',
                            color: 'var(--color-emerald)',
                            border: '1px solid rgba(29,158,117,0.3)',
                            fontSize: '0.6875rem',
                          }}
                        >
                          Em andamento
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Descrição */}
                  {item.description && (
                    <p
                      className="font-body mb-5"
                      style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.75 }}
                    >
                      {item.description}
                    </p>
                  )}

                  {/* Disciplinas relevantes (graduação) */}
                  {item.subjects && item.subjects.length > 0 && (
                    <div>
                      <p
                        className="font-body font-semibold mb-3"
                        style={{
                          fontSize: '0.6875rem',
                          color: 'var(--color-text-tertiary)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Disciplinas relevantes
                      </p>
                      <ul
                        className="flex flex-wrap gap-1.5"
                        aria-label="Disciplinas cursadas na graduação"
                      >
                        {item.subjects.map((subject) => (
                          <li key={subject}>
                            <span
                              className="badge"
                              style={{
                                background: 'var(--color-bg-primary)',
                                color: 'var(--color-text-secondary)',
                                border: '1px solid var(--color-border)',
                                fontSize: '0.6875rem',
                              }}
                            >
                              {subject}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Certificado */}
                  {item.certificateUrl && (
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver certificado de ${item.title} (abre em nova aba)`}
                      className="inline-flex items-center gap-1.5 mt-4 font-body font-medium text-xs transition-colors"
                      style={{ color: 'var(--color-purple)' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Ver certificado
                    </a>
                  )}
                </div>
              </li>
            )
          })}
        </ol>

        {/* Nota — adicionar cursos */}
        <p
          className="font-body text-center mt-10"
          style={{ color: 'var(--color-text-tertiary)', fontSize: '0.8125rem' }}
        >
          📚 Cursos e certificações complementares serão adicionados em breve.
        </p>
      </div>
    </section>
  )
}
