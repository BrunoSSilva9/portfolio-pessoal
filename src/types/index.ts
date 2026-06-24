// =============================================================================
// TYPES GLOBAIS — Codex do Mago Portfolio
// =============================================================================

// --- Projeto ---
export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  problemSolved: string
  techStack: string[]
  githubUrl: string
  liveUrl?: string
  imageUrl: string
  featured: boolean
  type: 'fullstack' | 'frontend' | 'backend' | 'mobile' | 'open-source'
}

// --- Skills ---
export type SkillLevel = 'Iniciante' | 'Aprendiz' | 'Praticante' | 'Mestre'
export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Other'

export interface Skill {
  name: string
  level: SkillLevel
  percent: number
  category: SkillCategory
  icon: string
}

// --- Publicações ---
export type PublicationType =
  | 'artigo-publicado'
  | 'artigo-aprovado'
  | 'resumo-expandido'
  | 'apresentacao-oral'
  | 'poster'
  | 'participacao'

export interface Publication {
  id: string
  title: string
  type: PublicationType
  venue: string
  venueAcronym?: string
  venueFullName?: string
  year: number
  authors: string[]
  ownerAuthor: string
  doi?: string
  url?: string
  abstract?: string
  isHighlighted?: boolean
}

// --- Formação ---
export type EducationType = 'graduacao' | 'curso' | 'certificacao' | 'bootcamp' | 'evento'

export interface EducationItem {
  id: string
  type: EducationType
  title: string
  institution: string
  startYear: number
  endYear?: number // undefined = em andamento
  expectedYear?: number // previsão de conclusão
  description?: string
  subjects?: string[] // disciplinas relevantes
  certificateUrl?: string
}

// --- Navegação ---
export interface NavLink {
  href: string
  label: string
  accessKey?: string
}

// --- Tema ---
export type Theme = 'dark' | 'light'
