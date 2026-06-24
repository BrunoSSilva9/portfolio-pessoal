// =============================================================================
// ExperienceCard — Card de experiência profissional
// eMAG: <time>, <abbr>, aria-label, listas semânticas
// =============================================================================

import type { Experience } from '@/data/experience'
import { employmentTypeLabels } from '@/data/experience'
import { formatDuration, formatDateRange, toDateTimeAttr } from '@/utils/dateUtils'

interface ExperienceCardProps {
  experience: Experience
  index: number
}

const locationModeLabels: Record<Experience['locationMode'], string> = {
  presencial: 'Presencial',
  remoto:     'Remoto',
  hibrido:    'Híbrido',
}

const locationModeIcons: Record<Experience['locationMode'], string> = {
  presencial: '🏢',
  remoto:     '🌐',
  hibrido:    '🔀',
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const isCurrent = experience.endDate === null
  const duration  = formatDuration(experience.startDate, experience.endDate)

  // Cores temáticas: verde esmeralda para atual, cinza para encerrado
  const accentColor = isCurrent ? 'var(--color-emerald)' : 'var(--color-text-tertiary)'
  const dotColor    = isCurrent ? 'var(--color-emerald)' : 'var(--color-text-tertiary)'
  const badgeTechBg = isCurrent
    ? 'rgba(29, 158, 117, 0.10)'
    : 'rgba(240, 238, 232, 0.05)'
  const badgeTechColor = isCurrent ? 'var(--color-emerald)' : 'var(--color-text-tertiary)'

  return (
    <li className="relative flex gap-6">
      {/* ── Linha e ponto da timeline ─────────────────────────────────── */}
      <div className="flex flex-col items-center" aria-hidden="true">
        {/* Dot */}
        <div
          className="relative z-10 w-3 h-3 rounded-full mt-1.5 shrink-0"
          style={{
            background: dotColor,
            outline: `2px solid ${dotColor}`,
            outlineOffset: '2px',
            boxShadow: isCurrent ? `0 0 8px ${dotColor}` : 'none',
          }}
        />
        {/* Linha vertical (escondida no último item via CSS parent) */}
        <div
          className="timeline-line flex-1 w-px mt-1"
          style={{ background: 'var(--color-border)' }}
        />
      </div>

      {/* ── Card de conteúdo ─────────────────────────────────────────── */}
      <article
        className="flex-1 pb-10"
        aria-label={`Experiência: ${experience.role} na ${experience.company}`}
      >
        <div
          className="card-base group relative"
          style={{
            borderLeftWidth: '3px',
            borderLeftColor: accentColor,
            borderLeftStyle: 'solid',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.5rem',
            transition: 'all 250ms ease',
          }}
        >
          {/* ── Topo do card: Cargo + badges ───────────────────────── */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <h3
                className="font-display font-semibold"
                style={{
                  color: 'var(--color-text-primary)',
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  lineHeight: 1.3,
                }}
              >
                {experience.role}
              </h3>

              {/* Empresa + tipo de vínculo */}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <svg
                  width="13" height="13"
                  viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  aria-hidden="true"
                  style={{ color: 'var(--color-text-tertiary)', flexShrink: 0 }}
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <span
                  className="font-body font-medium"
                  style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}
                >
                  {experience.company}
                </span>

                {/* Badge: tipo de vínculo */}
                <span
                  className="font-body font-medium"
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.04em',
                    padding: '2px 7px',
                    borderRadius: '9999px',
                    background: 'rgba(127, 119, 221, 0.1)',
                    color: 'var(--color-purple-text)',
                    border: '1px solid rgba(127, 119, 221, 0.25)',
                  }}
                >
                  {employmentTypeLabels[experience.employmentType]}
                </span>
              </div>
            </div>

            {/* Badge: Atual ou Encerrado */}
            <span
              aria-label={isCurrent ? 'Emprego atual' : 'Experiência encerrada'}
              className="font-body font-semibold shrink-0"
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '3px 10px',
                borderRadius: '9999px',
                background: isCurrent
                  ? 'rgba(29, 158, 117, 0.15)'
                  : 'rgba(240, 238, 232, 0.05)',
                color: isCurrent
                  ? 'var(--color-emerald)'
                  : 'var(--color-text-tertiary)',
                border: `1px solid ${isCurrent ? 'rgba(29,158,117,0.3)' : 'var(--color-border)'}`,
              }}
            >
              {isCurrent ? '● Atual' : 'Encerrado'}
            </span>
          </div>

          {/* ── Linha de meta: datas + localização ─────────────────── */}
          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4"
            style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}
          >
            {/* Intervalo de datas com <time> semântico */}
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <time dateTime={toDateTimeAttr(experience.startDate)}>
                {formatDateRange(experience.startDate, experience.endDate)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{duration}</span>
            </span>

            {/* Localização + modo */}
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {experience.location}
              <span aria-hidden="true">·</span>
              <span aria-hidden="true">{locationModeIcons[experience.locationMode]}</span>
              {locationModeLabels[experience.locationMode]}
            </span>
          </div>

          {/* ── Descrição geral ─────────────────────────────────────── */}
          <p
            className="font-body mb-4"
            style={{
              fontSize: '0.9375rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.75,
            }}
          >
            {experience.description}
          </p>

          {/* ── Responsabilidades ───────────────────────────────────── */}
          {experience.responsibilities.length > 0 && (
            <ul
              aria-label={`Responsabilidades em ${experience.role}`}
              className="mb-4 flex flex-col gap-1.5"
              style={{ paddingLeft: '1rem' }}
            >
              {experience.responsibilities.slice(0, 4).map((resp, i) => (
                <li
                  key={i}
                  className="font-body"
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)',
                    listStyleType: 'disc',
                    lineHeight: 1.6,
                  }}
                >
                  {resp}
                </li>
              ))}
            </ul>
          )}

          {/* ── Tech Stack badges ───────────────────────────────────── */}
          {experience.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5" aria-label="Tecnologias utilizadas">
              {experience.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-body font-medium"
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.04em',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    background: badgeTechBg,
                    color: badgeTechColor,
                    border: `1px solid ${isCurrent ? 'rgba(29,158,117,0.2)' : 'var(--color-border)'}`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </li>
  )
}
