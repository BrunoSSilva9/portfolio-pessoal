// =============================================================================
// ProjectCard — Card com efeito de flip 3D
// AGENTS.md Seção 6 (Projetos) + Seção 7
// - Frente: screenshot + nome + stack badges
// - Verso: descrição + problema resolvido + links
// - Flip no hover (desktop) + clique (mobile/teclado)
// - Reduced motion: exibe frente e verso em coluna (sem flip)
// - aria-expanded + aria-controls para acessibilidade
// =============================================================================

import { useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Project } from '@/types'

const typeLabel: Record<Project['type'], string> = {
  fullstack:    'Full Stack',
  frontend:     'Frontend',
  backend:      'Backend',
  mobile:       'Mobile',
  'open-source': 'Open Source',
}

const typeBadgeStyle: Record<Project['type'], { bg: string; color: string; border: string }> = {
  fullstack:    { bg: 'rgba(127,119,221,0.06)', color: 'var(--color-purple-text)',  border: 'rgba(127,119,221,0.3)' },
  frontend:     { bg: 'rgba(29,158,117,0.06)',  color: 'var(--color-emerald-text)', border: 'rgba(29,158,117,0.3)'  },
  backend:      { bg: 'rgba(232,168,56,0.06)',  color: 'var(--color-gold-text)',    border: 'rgba(232,168,56,0.3)'  },
  mobile:       { bg: 'rgba(127,119,221,0.06)', color: 'var(--color-purple-text)',  border: 'rgba(127,119,221,0.3)' },
  'open-source':{ bg: 'rgba(29,158,117,0.06)',  color: 'var(--color-emerald-text)', border: 'rgba(29,158,117,0.3)'  },
}

interface ProjectCardProps {
  project: Project
}

// GitHub SVG inline
function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export function ProjectCard({ project }: ProjectCardProps) {
  const prefersReduced = useReducedMotion()
  const [isFlipped, setIsFlipped] = useState(false)
  const badge = typeBadgeStyle[project.type]
  const hasImage = !!project.imageUrl

  const handleFlipToggle = () => setIsFlipped((prev) => !prev)

  // ── Reduced motion: layout em coluna sem flip ───────────────────────────
  if (prefersReduced) {
    return (
      <article
        aria-label={`Projeto: ${project.title}${project.featured ? ' — Destaque' : ''}`}
        className="card-base flex flex-col gap-0 overflow-hidden"
        style={{
          padding: 0,
          borderColor: project.featured ? 'rgba(232,168,56,0.4)' : undefined,
          boxShadow: project.featured ? 'var(--glow-gold)' : undefined,
        }}
      >
        {/* Badge de destaque */}
        {project.featured && (
          <div className="absolute top-3 right-3 badge"
            style={{ background: 'rgba(232,168,56,0.15)', color: 'var(--color-gold)', border: '1px solid rgba(232,168,56,0.4)', fontSize: '0.6875rem' }}
            aria-label="Projeto em destaque"
          >
            ✦ Destaque
          </div>
        )}
        {/* Frente */}
        <ProjectCardFront project={project} badge={badge} hasImage={hasImage} />
        {/* Verso (expandido) */}
        <div
          id={`project-details-${project.id}`}
          className="flex flex-col gap-3 p-6 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <ProjectCardBack project={project} />
        </div>
      </article>
    )
  }

  // ── Layout flip 3D ─────────────────────────────────────────────────────
  return (
    <article
      aria-label={`Projeto: ${project.title}${project.featured ? ' — Destaque' : ''}`}
      className={`flip-container relative group ${isFlipped ? 'flipped' : ''}`}
      style={{
        height: 460,
        borderRadius: 'var(--radius-lg)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleFlipToggle}
    >
      {/* Botão de flip acessível — não visível mas focável */}
      <button
        className="sr-only"
        aria-expanded={isFlipped}
        aria-controls={`project-details-${project.id}`}
        onClick={handleFlipToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleFlipToggle()
          }
        }}
      >
        <span>{isFlipped ? 'Ver capa' : 'Ver detalhes'} de {project.title}</span>
      </button>

      <div className="flip-inner">
        {/* FRENTE */}
        <div
          className="flip-face"
          style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            background: 'var(--color-bg-secondary)',
            border: `1px solid ${project.featured ? 'rgba(232,168,56,0.4)' : 'var(--color-border)'}`,
            boxShadow: project.featured ? 'var(--glow-gold)' : undefined,
          }}
        >
          {/* Badge de destaque */}
          {project.featured && (
            <div
              className="absolute top-3 right-3 z-10 badge"
              style={{ background: 'rgba(232,168,56,0.15)', color: 'var(--color-gold)', border: '1px solid rgba(232,168,56,0.4)', fontSize: '0.6875rem' }}
              aria-label="Projeto em destaque"
            >
              ✦ Destaque
            </div>
          )}
          <ProjectCardFront project={project} badge={badge} hasImage={hasImage} />
        </div>

        {/* VERSO */}
        <div
          className="flip-face flip-face-back"
          id={`project-details-${project.id}`}
          style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            background: 'var(--color-bg-secondary)',
            border: `1px solid ${project.featured ? 'rgba(232,168,56,0.4)' : 'var(--color-border-accent)'}`,
            boxShadow: project.featured ? 'var(--glow-gold)' : 'var(--glow-purple)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <ProjectCardBack project={project} />
        </div>
      </div>
    </article>
  )
}

// ── Conteúdo da frente ────────────────────────────────────────────────────
function ProjectCardFront({
  project,
  badge,
  hasImage,
}: {
  project: Project
  badge: { bg: string; color: string; border: string }
  hasImage: boolean
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Preview de imagem */}
      <div
        className="relative overflow-hidden"
        style={{ height: '200px', background: 'var(--color-bg-tertiary)', borderBottom: '1px solid var(--color-border)' }}
      >
        {hasImage ? (
          <img
            src={project.imageUrl}
            alt={`Captura de tela do projeto ${project.title}`}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ transition: 'transform 0.5s ease' }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2" aria-hidden="true">
            <span style={{ fontSize: '2.5rem' }}>⚗️</span>
            <span className="font-body" style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', letterSpacing: '0.08em' }}>
              screenshot em breve
            </span>
          </div>
        )}
        {/* Overlay hint de hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(10,11,15,0.8)' }}
          aria-hidden="true"
        >
          <span className="font-body text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
            Ver detalhes →
          </span>
        </div>
      </div>

      {/* Corpo */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <span
          className="badge self-start"
          style={{ background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`, fontSize: '0.6875rem' }}
        >
          {typeLabel[project.type]}
        </span>

        <div>
          <h3 className="font-display font-bold mb-1"
            style={{ color: 'var(--color-text-primary)', fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}
          >
            {project.title}
          </h3>
          <p className="font-body" style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            {project.subtitle}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.techStack.map((tech) => (
            <span key={tech} className="badge"
              style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-tertiary)', border: '1px solid var(--color-border)', fontSize: '0.6875rem' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Conteúdo do verso ─────────────────────────────────────────────────────
function ProjectCardBack({ project }: { project: Project }) {
  return (
    <>
      {/* Título */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div style={{ width: 3, height: 20, background: 'var(--color-gold)', borderRadius: 2 }} aria-hidden="true" />
          <h3 className="font-display font-bold"
            style={{ color: 'var(--color-text-primary)', fontSize: '1.0625rem' }}
          >
            {project.title}
          </h3>
        </div>
        <p className="font-body" style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '1rem' }}>
          {project.description}
        </p>
      </div>

      {/* Problema resolvido */}
      <div
        className="flex items-start gap-2 rounded-lg p-3 mb-4"
        style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)' }}
      >
        <span aria-hidden="true" style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>💡</span>
        <p className="font-body italic" style={{ color: 'var(--color-text-secondary)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
          {project.problemSolved}
        </p>
      </div>

      {/* Links */}
      <div className="flex gap-4 mt-auto">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Ver código-fonte de ${project.title} no GitHub (abre em nova aba)`}
          className="flex items-center gap-2 font-body font-medium text-sm"
          style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
        >
          <GithubIcon />
          Código-fonte
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Ver ${project.title} em produção (abre em nova aba)`}
            className="flex items-center gap-2 font-body font-medium text-sm"
            style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-emerald)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
          >
            <ExternalIcon />
            Ver online
          </a>
        )}
      </div>
    </>
  )
}
