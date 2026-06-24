// =============================================================================
// Seção Experience — "Missões Concluídas & Em Andamento"
// eMAG: <ol> semântico, <time>, aria-labelledby, SectionReveal
// =============================================================================

import { experiences } from '@/data/experience'
import { SectionReveal, SectionRevealGroup, RevealItem } from '@/components/ui/SectionReveal'
import { ExperienceCard } from '@/components/ui/ExperienceCard'

// Ordenação: empregos atuais (endDate === null) primeiro, depois mais recentes
function sortExperiences(exps: typeof experiences) {
  return [...exps].sort((a, b) => {
    if (a.endDate === null && b.endDate !== null) return -1
    if (a.endDate !== null && b.endDate === null) return 1
    // Ambos atuais ou ambos encerrados — mais recente startDate vem primeiro
    return b.startDate.localeCompare(a.startDate)
  })
}

export default function Experience() {
  const sorted = sortExperiences(experiences)

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      <div className="section-container">
        {/* ── Cabeçalho ─────────────────────────────────────────────── */}
        <SectionReveal>
          <p className="section-label mb-4">Seção 07</p>
          <h2
            id="experience-heading"
            className="font-display"
            style={{ color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}
          >
            Experiência Profissional
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-tertiary)',
              fontStyle: 'italic',
              marginBottom: '0.5rem',
            }}
          >
            Missões Concluídas &amp; Em Andamento
          </p>
          <div className="magic-divider mb-6" aria-hidden="true" />

          <p
            className="font-body max-w-lg mb-10"
            style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)',
            }}
          >
            {/*Trajetória profissional em construção — experiências acadêmicas, de pesquisa
            e projetos práticos que vêm moldando as habilidades do grimório.*/}
          </p>
        </SectionReveal>

        {/* ── Timeline ──────────────────────────────────────────────── */}
        {sorted.length === 0 ? (
          /* Estado vazio — sem experiências cadastradas */
          <SectionReveal delay={0.2}>
            <div
              className="card-base text-center py-16"
              style={{ borderStyle: 'dashed' }}
            >
              <p style={{ fontSize: '2rem', marginBottom: '1rem' }} aria-hidden="true">
                ⚔️
              </p>
              <p
                className="font-display font-semibold mb-2"
                style={{ color: 'var(--color-text-primary)', fontSize: '1.125rem' }}
              >
                Missões em preparação
              </p>
              <p
                className="font-body"
                style={{ color: 'var(--color-text-tertiary)', fontSize: '0.9375rem' }}
              >
                As experiências profissionais serão adicionadas em breve.
              </p>
            </div>
          </SectionReveal>
        ) : (
          <SectionRevealGroup>
            <ol
              aria-label="Histórico de experiências profissionais"
              className="flex flex-col"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
            >
              {sorted.map((exp, index) => (
                <RevealItem key={exp.id}>
                  <ExperienceCard experience={exp} index={index} />
                </RevealItem>
              ))}
            </ol>
          </SectionRevealGroup>
        )}
      </div>
    </section>
  )
}
