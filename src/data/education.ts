import type { EducationItem } from '@/types'

// =============================================================================
// JORNADA DO APRENDIZ — Education de Bruno da Silva dos Santos
// Universidade Federal do Sul e Sudeste do Pará — UNIFESSPA
// =============================================================================

export const educationItems: EducationItem[] = [
  {
    id: 'edu-unifesspa',
    type: 'graduacao',
    title: 'Bacharelado em Sistemas de Informação',
    institution: 'Universidade Federal do Sul e Sudeste do Pará (UNIFESSPA)',
    startYear: 2023,
    endYear: undefined, // em andamento — 7º semestre
    expectedYear: 2026,
    description:
      'Formação em desenvolvimento de sistemas, banco de dados, engenharia de software, ' +
      'redes de computadores e gestão de TI. Participação em projetos de pesquisa e ' +
      'iniciação científica durante o curso.',
    subjects: [
      'Estrutura de Dados',
      'Banco de Dados',
      'Engenharia de Software',
      'Algoritmos e Programação',
      'Redes de Computadores',
      'Sistemas Operacionais',
      'Análise e Projeto de Sistemas',
      'Mineração de Dados',
      'Inteligência Artificial',
      'Empreendedorismo em Informática',
    ],
  },

  // ── Substitua/adicione cursos e certificações reais abaixo ─────────────────

  // {
  //   id: 'edu-curso-01',
  //   type: 'curso',
  //   title: 'Nome do Curso',
  //   institution: 'Plataforma (ex: Alura, Coursera, DIO, Rocketseat)',
  //   startYear: 2024,
  //   endYear: 2024,
  //   description: 'Descrição breve do que foi aprendido no curso.',
  //   certificateUrl: 'https://link-do-certificado.com',
  // },

  // {
  //   id: 'edu-bootcamp-01',
  //   type: 'bootcamp',
  //   title: 'Nome do Bootcamp',
  //   institution: 'Organização',
  //   startYear: 2023,
  //   endYear: 2023,
  //   description: 'O que foi desenvolvido durante o bootcamp.',
  // },
]
