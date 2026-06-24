// =============================================================================
// Seção Skills — "Magias Dominadas"
// Fase 4: SkillBar animada (mana loading) + SectionReveal
// =============================================================================

import { useState } from 'react'
import { skills, skillCategories } from '@/data/skills'
import type { SkillCategory, SkillLevel } from '@/types'
import { cn } from '@/utils/cn'
import { SectionReveal, SectionRevealGroup, RevealItem } from '@/components/ui/SectionReveal'
import { SkillBar } from '@/components/ui/SkillBar'

// Mapa visual de nível → ícone e cor
const levelConfig: Record<SkillLevel, { icon: string; color: string; label: string }> = {
  Iniciante:  { icon: '◦', color: 'var(--color-text-tertiary)',  label: 'Iniciante' },
  Aprendiz:   { icon: '◈', color: 'var(--color-purple-dim-text)', label: 'Aprendiz'  },
  Praticante: { icon: '◆', color: 'var(--color-purple-text)',     label: 'Praticante'},
  Mestre:     { icon: '✦', color: 'var(--color-gold-text)',       label: 'Mestre'    },
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'Todas'>('Todas')

  const filtered =
    activeCategory === 'Todas'
      ? skills
      : skills.filter((s) => s.category === activeCategory)

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      <div className="section-container">
        <SectionReveal>
        {/* Cabeçalho */}
        <p className="section-label mb-4">Seção 03</p>
        <h2
          id="skills-heading"
          className="font-display"
          style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}
        >
          Magias Dominadas
        </h2>
        <div className="magic-divider mb-6" aria-hidden="true" />

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <p
            className="font-body max-w-lg"
            style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)',
            }}
          >
            Habilidades desenvolvidas ao longo da graduação e de projetos pessoais.
            Níveis <strong style={{ color: 'var(--color-text-primary)' }}>honestos</strong>{' '}
            — em constante evolução.
          </p>

          {/* Legenda de níveis */}
          <div
            className="flex flex-wrap gap-3"
            aria-label="Legenda dos níveis de habilidade"
            role="list"
          >
            {(Object.entries(levelConfig) as [SkillLevel, typeof levelConfig[SkillLevel]][]).map(
              ([level, cfg]) => (
                <div
                  key={level}
                  role="listitem"
                  className="flex items-center gap-1.5"
                >
                  <span style={{ color: cfg.color, fontSize: '0.875rem' }} aria-hidden="true">
                    {cfg.icon}
                  </span>
                  <span
                    className="font-body"
                    style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}
                  >
                    {cfg.label}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
        </SectionReveal>

        {/* Filtro por categoria */}
        <fieldset className="mb-10 border-none p-0">
          <legend className="sr-only">Filtrar habilidades por categoria</legend>
          <div className="flex flex-wrap gap-2" role="group">
            {(['Todas', ...skillCategories] as const).map((cat) => {
              const isActive = activeCategory === cat
              return (
                <label
                  key={cat}
                  className={cn(
                    'relative flex items-center cursor-pointer font-body font-semibold transition-all duration-150',
                    'px-4 py-2 rounded-lg text-sm border'
                  )}
                  style={{
                    background: isActive ? 'rgba(127,119,221,0.06)' : 'transparent',
                    borderColor: isActive ? 'var(--color-purple-text)' : 'var(--color-border)',
                    color: isActive ? 'var(--color-purple-text)' : 'var(--color-text-secondary)',
                    boxShadow: isActive ? 'var(--glow-purple)' : 'none',
                  }}
                >
                  <input
                    type="radio"
                    name="skill-category"
                    value={cat}
                    checked={isActive}
                    onChange={() => setActiveCategory(cat as SkillCategory | 'Todas')}
                    className="sr-only"
                    aria-label={`Mostrar habilidades de ${cat}`}
                  />
                  {cat}
                </label>
              )
            })}
          </div>
        </fieldset>

        {/* Grid de skill cards com SectionRevealGroup para stagger */}
        <SectionRevealGroup key={activeCategory} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
          {filtered.map((skill, index) => {
            const cfg = levelConfig[skill.level]
            return (
              <RevealItem key={skill.name}>
                <div
                  className="card-base group"
                  style={{ gap: '1rem', transition: 'all 250ms ease' }}
                >
                  {/* Header do card */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Ícone da tecnologia */}
                      <div
                        className="w-10 h-10 rounded-lg overflow-hidden p-1.5 flex items-center justify-center shrink-0"
                        style={{ background: 'var(--color-bg-tertiary)' }}
                      >
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          width={28}
                          height={28}
                          loading="lazy"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const el = e.target as HTMLImageElement
                            el.style.display = 'none'
                            if (el.parentElement) {
                              el.parentElement.textContent = skill.name[0]
                              el.parentElement.style.fontSize = '1rem'
                              el.parentElement.style.fontWeight = '700'
                              el.parentElement.style.color = 'var(--color-purple-text)'
                            }
                          }}
                        />
                      </div>

                      <div>
                        <h3
                          className="font-body font-semibold"
                          style={{ color: 'var(--color-text-primary)', fontSize: '0.9375rem', lineHeight: 1.3 }}
                        >
                          {skill.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span style={{ color: cfg.color, fontSize: '0.6875rem' }} aria-hidden="true">
                            {cfg.icon}
                          </span>
                          <span
                            className="font-body"
                            style={{ color: cfg.color, fontSize: '0.6875rem', fontWeight: 500 }}
                          >
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Percentual */}
                    <span
                      className="font-body font-bold tabular-nums"
                      style={{ fontSize: '1.125rem', color: 'var(--color-text-tertiary)' }}
                      aria-hidden="true"
                    >
                      {skill.percent}%
                    </span>
                  </div>

                  {/* Barra de mana animada — SkillBar com IntersectionObserver */}
                  <SkillBar skill={skill} delay={index} />
                </div>
              </RevealItem>
            )
          })}
        </SectionRevealGroup>

        {/* Nota de rodapé */}
        <p
          className="font-body text-center mt-10"
          style={{ color: 'var(--color-text-tertiary)', fontSize: '0.8125rem' }}
        >
          💡 Novas magias sendo aprendidas continuamente.
          Atualizado em{' '}
          <time dateTime="2026-06">junho de 2026</time>.
        </p>
      </div>
    </section>
  )
}
