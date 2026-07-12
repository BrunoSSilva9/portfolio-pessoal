// =============================================================================
// Dados de Experiência Profissional — "Missões do Mago"
// TODO: substituir pelos dados reais de Bruno após preenchimento
// =============================================================================

export type EmploymentType =
  | 'clt'
  | 'estagio'
  | 'bolsista'
  | 'freelance'
  | 'voluntario'
  | 'pesquisa'

export interface Experience {
  id: string
  role: string
  company: string
  employmentType: EmploymentType
  location: string
  locationMode: 'presencial' | 'remoto' | 'hibrido'
  startDate: string       // formato "YYYY-MM" ex: "2024-03"
  endDate: string | null  // null = emprego atual (badge "Atual")
  description: string
  responsibilities: string[]
  techStack: string[]
  isHighlighted: boolean
}

// Mapa de rótulos legíveis para cada tipo de vínculo
export const employmentTypeLabels: Record<EmploymentType, string> = {
  clt: 'CLT',
  estagio: 'Estágio',
  bolsista: 'Bolsista',
  freelance: 'Freelance',
  voluntario: 'Voluntário',
  pesquisa: 'Pesquisa',
}

export const experiences: Experience[] = [
  // TODO: preencher com experiências reais do Bruno
  // Exemplo de estrutura (substituir ou duplicar conforme necessário):
  {
    id: 'exp-001',
    role: 'Exception Júnior',
    company: 'Empresa jr de Sistemas de Informação - UNIFESSPA',
    employmentType: 'voluntario',
    location: 'Marabá, PA',
    locationMode: 'hibrido',
    startDate: '2024-06',
    endDate: null, // null = ainda em andamento
    description:
      'Atuação como Gerente de Gente e Gestão(RH) e FullStack no desenvolvimento de sistemas com foco na resolução de problemas reais.',
    responsibilities: [
      'Atuação FullStack em Desenvolvimento de sistemas multifacetados',
      'Coleta e Análise de Requisitos.',
      'Gerenciamento de projetos e equipes.',
      'Diretor de Gente e Gestão.',
      'Documentação técnica de projetos e relatórios acadêmicos.',
    ],
    techStack: ['React', 'TypeScript', 'SQL', 'PostgreSQL', 'Git'],
    isHighlighted: true,
  },

  {
    id: 'exp-002',
    role: 'PROPIT',
    company: 'Pró-Reitoria de Pós Graduação, Pesquisa e Inovação Tecnológica - UNIFESSPA',
    employmentType: 'estagio',
    location: 'Marabá, PA',
    locationMode: 'presencial',
    startDate: '2025-04',
    endDate: null, // null = ainda em andamento
    description:
      'Atuação no apoio técnico e gerencial de atividades de ti desenvolvidos pela Pró-reitoria',
    responsibilities: [
      'Apoio técnico e atualização dos sites da unidade geridos pelo CMS Joomla.',
      'Criação e atualização de dashboards com PowerBI da pós-garduação, pesquisa e Inovação Tecnológica.',
      'Atuação como Gestor/Coordenador de TI dos eventos realizados pela unidade.',
    ],
    techStack: ['PowerBI', 'Excel', 'joomla'],
    isHighlighted: true,
  },

  {
    id: 'exp-003',
    role: 'Pet Saúde',
    company: 'Programa de Educação pelo Trabalho para a Saúde',
    employmentType: 'bolsista',
    location: 'Marabá, PA',
    locationMode: 'presencial',
    startDate: '2025-09',
    endDate: null, // null = ainda em andamento
    description:
      'O PET-Saúde Digital tem como foco a inovação e o uso de tecnologias digitais na atenção primária à saúde, com ênfase nas realidades amazônicas.',
    responsibilities: [

    ],
    techStack: ['React', 'TypeScript', 'SQL', 'Postgree', 'Git'],
    isHighlighted: true,
  },
]
