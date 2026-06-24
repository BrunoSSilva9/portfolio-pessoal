import type { Publication } from '@/types'

// =============================================================================
// PRODUÇÃO ACADÊMICA — Publications de Bruno da Silva dos Santos
// Substituir pelos dados reais após inserção.
// =============================================================================

export const publications: Publication[] = [
  // ── Exemplo de artigo publicado ────────────────────────────────────────────
  // {
  //   id: 'pub-001',
  //   title: 'Título Completo do Artigo Publicado',
  //   type: 'artigo-publicado',
  //   venue: 'Simpósio Brasileiro de Sistemas de Informação',
  //   venueAcronym: 'SBSI',
  //   venueFullName: 'Simpósio Brasileiro de Sistemas de Informação',
  //   year: 2024,
  //   authors: ['Bruno da Silva dos Santos', 'Co-autor 1', 'Orientador(a)'],
  //   ownerAuthor: 'Bruno da Silva dos Santos',
  //   doi: '10.xxxx/xxxxx',
  //   url: 'https://sol.sbc.org.br/index.php/sbsi/article/view/xxxxx',
  //   abstract: 'Resumo curto do trabalho para exibição em tooltip ou expand.',
  //   isHighlighted: true,
  // },

  {
    id: 'pub-001',
    title: 'Saúde Mental na Universidade: Um Sistema Web para Gestão' +
      ' e Acompanhamento de Atendimentos Psicológicos',
    type: 'artigo-publicado',
    venue: 'Simpósio Brasileiro de Computação Aplicado a Saúde',
    venueAcronym: 'SBCAS',
    venueFullName: 'Simpósio Brasileiro de Sistemas de Informação',
    year: 2026,
    authors: ['Bruno da Silva dos Santos', 'André Santos', 'Warley Junior'],
    ownerAuthor: 'Bruno da Silva dos Santos',
    doi: '10.xxxx/xxxxx',
    url: 'https://sol.sbc.org.br/index.php/sbsi/article/view/xxxxx',
    abstract: 'Resumo curto do trabalho para exibição em tooltip ou expand.',
    isHighlighted: true,
  },

  // ── Exemplo de resumo expandido ────────────────────────────────────────────
  // {
  //   id: 'pub-002',
  //   title: 'Título do Resumo Expandido',
  //   type: 'resumo-expandido',
  //   venue: 'Workshop de Sistemas Computacionais de Alto Desempenho',
  //   venueAcronym: 'WSCAD',
  //   venueFullName: 'Workshop de Sistemas Computacionais de Alto Desempenho',
  //   year: 2023,
  //   authors: ['Bruno da Silva dos Santos', 'Orientador(a)'],
  //   ownerAuthor: 'Bruno da Silva dos Santos',
  //   url: 'https://...',
  //   isHighlighted: false,
  // },

  // ── Exemplo de participação ────────────────────────────────────────────────
  // {
  //   id: 'pub-003',
  //   title: 'Nome do Evento (participação como ouvinte)',
  //   type: 'participacao',
  //   venue: 'Congresso Brasileiro de Informática na Educação',
  //   venueAcronym: 'CBIE',
  //   venueFullName: 'Congresso Brasileiro de Informática na Educação',
  //   year: 2023,
  //   authors: ['Bruno da Silva dos Santos'],
  //   ownerAuthor: 'Bruno da Silva dos Santos',
  //   isHighlighted: false,
  // },
]

/** Labels legíveis por tipo de publicação */
export const publicationTypeLabel: Record<Publication['type'], string> = {
  'artigo-publicado': 'Artigo Publicado',
  'artigo-aprovado': 'Artigo Aprovado',
  'resumo-expandido': 'Resumo Expandido',
  'apresentacao-oral': 'Apresentação Oral',
  poster: 'Poster',
  participacao: 'Participação',
}

/** Cores de badge por tipo (referenciando CSS vars) */
export const publicationTypeBadge: Record<
  Publication['type'],
  { bg: string; text: string; border: string }
> = {
  'artigo-publicado': { bg: 'rgba(29,158,117,0.06)', text: 'var(--color-emerald-text)', border: 'rgba(29,158,117,0.3)' },
  'artigo-aprovado': { bg: 'rgba(29,158,117,0.06)', text: 'var(--color-emerald-text)', border: 'rgba(29,158,117,0.3)' },
  'resumo-expandido': { bg: 'rgba(127,119,221,0.06)', text: 'var(--color-purple-text)', border: 'rgba(127,119,221,0.3)' },
  'apresentacao-oral': { bg: 'rgba(232,168,56,0.06)', text: 'var(--color-gold-text)', border: 'rgba(232,168,56,0.3)' },
  poster: { bg: 'rgba(232,168,56,0.06)', text: 'var(--color-gold-text)', border: 'rgba(232,168,56,0.3)' },
  participacao: { bg: 'rgba(107,105,98,0.06)', text: 'var(--color-text-secondary)', border: 'var(--color-border)' },
}
