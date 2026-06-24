// =============================================================================
// Seção Projects — "Grimório de Feitiços"
// Fase 4: ProjectCard com flip 3D + SectionReveal
// =============================================================================

import { useState } from 'react'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionReveal, SectionRevealGroup, RevealItem } from '@/components/ui/SectionReveal'


// ── Seção completa ──────────────────────────────────────────────────────────
export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? projects : projects.slice(0, 3)

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div className="section-container">
        <SectionReveal>
          {/* Cabeçalho */}
          <p className="section-label mb-4">Seção 04</p>
          <h2
            id="projects-heading"
            className="font-display"
            style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}
          >
            Grimório de Soluções
          </h2>
          <div className="magic-divider mb-6" aria-hidden="true" />

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <p
              className="font-body max-w-lg"
              style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}
            >
              Projetos desenvolvidos com foco em resolver problemas reais. Cada solução
              tem um propósito claro e uma implementação sólida.
            </p>

            <a
              href="https://github.com/BrunoSSilva9"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver no GitHub — todos os repositórios de Bruno Santos (abre em nova aba)"
              className="btn-secondary shrink-0"
              style={{ fontSize: '0.875rem', paddingBlock: '0.625rem' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Ver no GitHub
            </a>
          </div>
        </SectionReveal>

        {/* Grid de cards com flip */}
        <SectionRevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.12}>
          {visible.map((project) => (
            <RevealItem key={project.id}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </SectionRevealGroup>

        {/* Botão "Ver mais" se há mais projetos */}
        {projects.length > 3 && (
          <div className="mt-10 text-center">
            <button
              id="btn-show-more-projects"
              className="btn-secondary"
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
              aria-label={showAll ? 'Ocultar projetos adicionais' : `Ver todos os ${projects.length} projetos`}
            >
              {showAll ? 'Mostrar menos' : `Ver todos os projetos (${projects.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
