import type { Skill } from '@/types'

// =============================================================================
// MAGIAS DOMINADAS — Skills de Bruno da Silva dos Santos
// IMPORTANTE: níveis e percentuais são honestos.
// Recrutadores penalizam exagero mais do que humildade.
// =============================================================================

export const skills: Skill[] = [
  // Frontend
  {
    name: 'React',
    level: 'Praticante',
    percent: 80,
    category: 'Frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'TypeScript',
    level: 'Aprendiz',
    percent: 80,
    category: 'Frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    name: 'HTML5',
    level: 'Praticante',
    percent: 90,
    category: 'Frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS3',
    level: 'Praticante',
    percent: 90,
    category: 'Frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },

  // Backend
  {
    name: 'Python',
    level: 'Praticante',
    percent: 50,
    category: 'Backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'Java',
    level: 'Praticante',
    percent: 70,
    category: 'Backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  },
  {
    name: 'Node.js',
    level: 'Aprendiz',
    percent: 90,
    category: 'Backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },

  // Database
  {
    name: 'SQL',
    level: 'Praticante',
    percent: 85,
    category: 'Database',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  },
  {
    name: 'PostgreSQL',
    level: 'Aprendiz',
    percent: 85,
    category: 'Database',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },

  // DevOps / Ferramentas
  {
    name: 'Git',
    level: 'Praticante',
    percent: 90,
    category: 'DevOps',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    name: 'Docker',
    level: 'Iniciante',
    percent: 80,
    category: 'DevOps',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    name: 'Linux',
    level: 'Aprendiz',
    percent: 50,
    category: 'DevOps',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  },
]

export const skillCategories: Skill['category'][] = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
]

/** Cores por nível de skill para renderização visual */
export const skillLevelColor: Record<Skill['level'], string> = {
  Iniciante: 'rgba(107, 105, 98, 0.6)',
  Aprendiz: 'var(--color-purple-dim)',
  Praticante: 'var(--color-purple)',
  Mestre: 'var(--color-gold)',
}
