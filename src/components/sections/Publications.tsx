// =============================================================================
// Seção Publications — "Produção Acadêmica"
// eMAG: rec. 1.6 (idioma), 3.7-3.8 (tabela acessível), 3.10 (abbr)
// Fase 2: estado vazio premium + toggle cards/tabela
// =============================================================================

import { useState } from 'react'
import { publications, publicationTypeLabel, publicationTypeBadge } from '@/data/publications'
import type { Publication } from '@/types'
import { SectionReveal } from '@/components/ui/SectionReveal'

// ── Card individual ─────────────────────────────────────────────────────────
function PublicationCard({ pub }: { pub: Publication }) {
  const badge = publicationTypeBadge[pub.type]
  const isOwner = (name: string) => name === pub.ownerAuthor

  return (
    <article
      aria-label={`Publicação${pub.isHighlighted ? ' em destaque' : ''}: ${pub.title}`}
      className="card-base flex flex-col gap-4"
      style={
        pub.isHighlighted
          ? { borderColor: 'rgba(232,168,56,0.5)', boxShadow: 'var(--glow-gold)' }
          : {}
      }
    >
      {/* Badges de tipo + destaque */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span
          className="badge"
          style={{
            background: badge.bg,
            color: badge.text,
            border: `1px solid ${badge.border}`,
            fontSize: '0.6875rem',
          }}
        >
          {publicationTypeLabel[pub.type]}
        </span>
        {pub.isHighlighted && (
          <span
            className="badge"
            style={{
              background: 'rgba(232,168,56,0.15)',
              color: 'var(--color-gold)',
              border: '1px solid rgba(232,168,56,0.4)',
              fontSize: '0.6875rem',
            }}
            aria-label="Trabalho em destaque"
          >
            ✦ Destaque
          </span>
        )}
      </div>

      {/* Título */}
      <h3 style={{ lineHeight: 1.4 }}>
        {pub.url || pub.doi ? (
          <a
            href={pub.doi ? `https://doi.org/${pub.doi}` : pub.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${pub.title} — acessar publicação (abre em nova aba)`}
            className="font-display font-bold transition-colors"
            style={{ color: 'var(--color-text-primary)', fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = 'var(--color-gold)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)')
            }
          >
            {pub.title}
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              style={{ display: 'inline-block', marginLeft: '0.375rem', opacity: 0.5, verticalAlign: 'middle' }}
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ) : (
          <span
            className="font-display font-bold"
            style={{ color: 'var(--color-text-primary)', fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}
          >
            {pub.title}
          </span>
        )}
      </h3>

      {/* Venue + ano */}
      <p className="font-body" style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
        {pub.venueAcronym ? (
          <>
            <abbr title={pub.venueFullName ?? pub.venue} style={{ textDecoration: 'underline dotted' }}>
              {pub.venueAcronym}
            </abbr>
            <span style={{ color: 'var(--color-gold)', margin: '0 0.5rem' }}>·</span>
          </>
        ) : null}
        <time dateTime={String(pub.year)}>{pub.year}</time>
      </p>

      {/* Autores — nome do dono em destaque */}
      <p className="font-body" style={{ color: 'var(--color-text-tertiary)', fontSize: '0.8125rem', lineHeight: 1.6 }}>
        {pub.authors.map((author, i) => (
          <span key={author}>
            {isOwner(author) ? (
              <strong style={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                {author}
              </strong>
            ) : (
              author
            )}
            {i < pub.authors.length - 1 && '; '}
          </span>
        ))}
      </p>
    </article>
  )
}

// ── Estado vazio elegante ────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div
      className="card-base text-center"
      style={{ padding: '4rem 2rem' }}
      role="status"
      aria-label="Nenhuma publicação cadastrada ainda"
    >
      {/* Ícone decorativo */}
      <div
        className="flex items-center justify-center mx-auto mb-6 rounded-full"
        style={{
          width: '5rem',
          height: '5rem',
          background: 'rgba(127,119,221,0.08)',
          border: '2px solid var(--color-border-accent)',
          fontSize: '2rem',
        }}
        aria-hidden="true"
      >
        📜
      </div>

      <h3
        className="font-display font-bold mb-3"
        style={{ color: 'var(--color-text-primary)', fontSize: '1.25rem' }}
      >
        Grimório em construção
      </h3>

      <p
        className="font-body max-w-md mx-auto mb-6"
        style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem' }}
      >
        Trabalhos acadêmicos e participações em congressos serão listados aqui.
        Produção científica em desenvolvimento durante o 7º semestre na{' '}
        <abbr title="Universidade Federal do Sul e Sudeste do Pará">UNIFESSPA</abbr>.
      </p>

      {/* Call to action */}
      <a
        href="https://github.com/BrunoSSilva9"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ver projetos no GitHub — repositórios de Bruno Santos enquanto as publicações não estão disponíveis (abre em nova aba)"
        className="btn-secondary inline-flex"
        style={{ fontSize: '0.875rem' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        Ver projetos no GitHub
      </a>
    </div>
  )
}

// ── Seção principal ──────────────────────────────────────────────────────────
export default function Publications() {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [filter, setFilter] = useState<Publication['type'] | 'all'>('all')

  const filtered =
    filter === 'all' ? publications : publications.filter((p) => p.type === filter)

  const isEmpty = publications.length === 0

  return (
    <section
      id="publications"
      aria-labelledby="pub-heading"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      <div className="section-container">
        <SectionReveal>
          {/* Cabeçalho */}
          <p className="section-label mb-4">Seção 05</p>
          <h2
            id="pub-heading"
            className="font-display"
            style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}
          >
            Produção Acadêmica
          </h2>
          <div className="magic-divider mb-6" aria-hidden="true" />

          <p
            className="font-body mb-10 max-w-xl"
            style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}
          >
            Artigos, trabalhos e participações em eventos científicos durante a
            formação em Sistemas de Informação.
          </p>
        </SectionReveal>

        {/* Estado vazio ou conteúdo */}
        {isEmpty ? (
          <EmptyState />
        ) : (
          <>
            {/* Controles */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8"
            >
              {/* Filtros por tipo */}
              <fieldset className="border-none p-0">
                <legend className="sr-only">Filtrar publicações por tipo</legend>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { value: 'all', label: 'Todos' },
                      { value: 'artigo-publicado', label: 'Artigos' },
                      { value: 'resumo-expandido', label: 'Resumos' },
                      { value: 'participacao', label: 'Eventos' },
                    ] as const
                  ).map((opt) => {
                    const isActive = filter === opt.value
                    return (
                      <label
                        key={opt.value}
                        className="font-body font-semibold cursor-pointer transition-all"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.375rem 0.875rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.8125rem',
                          border: `1px solid ${isActive ? 'var(--color-emerald)' : 'var(--color-border)'}`,
                          background: isActive ? 'rgba(29,158,117,0.06)' : 'transparent',
                          color: isActive ? 'var(--color-emerald-text)' : 'var(--color-text-secondary)',
                        }}
                      >
                        <input
                          type="radio"
                          name="pub-filter"
                          value={opt.value}
                          checked={isActive}
                          onChange={() => setFilter(opt.value)}
                          className="sr-only"
                          aria-label={`Mostrar publicações do tipo ${opt.label}`}
                        />
                        {opt.label}
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              {/* Toggle cards / tabela */}
              <div role="group" aria-label="Modo de visualização das publicações">
                {(['cards', 'table'] as const).map((mode, i) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    aria-pressed={viewMode === mode}
                    aria-label={mode === 'cards' ? 'Ver como cards' : 'Ver como tabela'}
                    style={{
                      padding: '0.375rem 0.875rem',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      border: `1px solid ${viewMode === mode ? 'var(--color-border-accent)' : 'var(--color-border)'}`,
                      borderRight: mode === 'cards' ? 'none' : undefined,
                      borderRadius: i === 0 ? '0.5rem 0 0 0.5rem' : '0 0.5rem 0.5rem 0',
                      background: viewMode === mode ? 'var(--color-bg-tertiary)' : 'transparent',
                      color: viewMode === mode ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                      cursor: 'pointer',
                      transition: 'all 150ms ease',
                    }}
                  >
                    {mode === 'cards' ? 'Cards' : 'Tabela'}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de cards */}
            {viewMode === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((pub) => (
                  <PublicationCard key={pub.id} pub={pub} />
                ))}
              </div>
            )}

            {/* Tabela acessível — eMAG rec. 3.7, 3.8 */}
            {viewMode === 'table' && (
              <div className="overflow-x-auto">
                <table
                  className="accessible-table"
                  aria-label="Publicações e participações em eventos científicos"
                >
                  <caption
                    id="pub-table-caption"
                    style={{
                      textAlign: 'left',
                      paddingBottom: '0.75rem',
                      fontSize: '0.8125rem',
                      color: 'var(--color-text-tertiary)',
                      fontStyle: 'italic',
                      captionSide: 'top',
                    }}
                  >
                    Publicações ordenadas do mais recente ao mais antigo.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Tipo</th>
                      <th scope="col">Título</th>
                      <th scope="col">Evento / Periódico</th>
                      <th scope="col">Ano</th>
                      <th scope="col">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((pub) => {
                      const badge = publicationTypeBadge[pub.type]
                      return (
                        <tr key={pub.id}>
                          <td>
                            <span
                              className="badge"
                              style={{
                                background: badge.bg,
                                color: badge.text,
                                border: `1px solid ${badge.border}`,
                                fontSize: '0.6875rem',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {publicationTypeLabel[pub.type]}
                            </span>
                          </td>
                          <td
                            className="font-body font-medium"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {pub.title}
                          </td>
                          <td className="font-body" style={{ color: 'var(--color-text-secondary)' }}>
                            {pub.venueAcronym ? (
                              <abbr title={pub.venueFullName ?? pub.venue}>
                                {pub.venueAcronym}
                              </abbr>
                            ) : (
                              pub.venue
                            )}
                          </td>
                          <td>
                            <time dateTime={String(pub.year)}>{pub.year}</time>
                          </td>
                          <td>
                            {pub.url || pub.doi ? (
                              <a
                                href={pub.doi ? `https://doi.org/${pub.doi}` : pub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Acessar publicação "${pub.title}" (abre em nova aba)`}
                                className="font-body font-medium transition-colors"
                                style={{ color: 'var(--color-purple)', fontSize: '0.875rem' }}
                              >
                                Ver →
                              </a>
                            ) : (
                              <span style={{ color: 'var(--color-text-tertiary)', fontSize: '0.875rem' }}>
                                —
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
