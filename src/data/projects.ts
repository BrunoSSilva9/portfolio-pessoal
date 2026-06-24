import type { Project } from '@/types'

// =============================================================================
// GRIMÓRIO DE FEITIÇOS — Projects de Bruno da Silva dos Santos
//
// 📌 COMO PREENCHER:
//   1. Substitua os campos TODO pelo conteúdo real
//   2. Coloque screenshots reais em public/projects/nome-do-projeto.webp
//   3. Atualize os links de GitHub e deploy
//   4. Defina featured: true para os 2-3 projetos principais
// =============================================================================

export const projects: Project[] = [
  // ── PROJETO 1 ──────────────────────────────────────────────────────────────
  {
    id: 'projeto-01-apsi-papse',
    // TODO: Substitua pelo nome criativo do seu projeto
    title: 'APSIA',
    // TODO: Uma linha descrevendo o que o projeto faz
    subtitle: 'Sistema de Gestão e Acompanhamento Psicológico Integrado Ambientes Acadêmicos',
    // TODO: 2-3 frases sobre o projeto — contexto, tecnologia, resultado
    description:
      'Desenvolvido com arquitetura modular, o sistema foi concebido para ser replicável ' +
      'e implantado em qualquer Instituição de Ensino Superior (IES) ' +
      'que possua curso de Psicologia ou estrutura equivalente.',
    // TODO: Qual problema real do mundo esse projeto resolve?
    problemSolved:
      'O sistema permite encaminhar pacientes aos discentes de Psicologia, registrar informações em prontuários e relatórios, ' +
      'além de armazenar, organizar e utilizar dados clínicos dos atendimentos respeitando os padrões de privacidade e segurança dos, ' +
      'dados sensíveis dos pacientes, e dá suporte à pesquisa em psicanálise nas IES.',    // TODO: Substitua pelas tecnologias reais usadas
    techStack: ['React', 'Node.js', 'SQL', 'TypeScript', 'Docker', 'Git'],
    // TODO: Link real do repositório GitHub
    githubUrl: 'https://github.com/BrunoSSilva9/backend-papse',
    // TODO: Link do deploy em produção (remova a linha se não tiver deploy)
    liveUrl: 'https://projetopapse.org/',
    // TODO: Screenshot real em public/projects/projeto-01.webp (formato WebP, 800x500px)
    imageUrl: '/projects/projeto-01-apsia.webp',
    featured: true,
    type: 'fullstack',
  },

  // ── ADICIONE MAIS PROJETOS AQUI ────────────────────────────────────────────
  // {
  //   id: 'projeto-04',
  //   title: 'Nome do Projeto',
  //   subtitle: 'Uma linha descritiva',
  //   description: '...',
  //   problemSolved: '...',
  //   techStack: ['...'],
  //   githubUrl: 'https://github.com/BrunoSSilva9/...',
  //   liveUrl: 'https://...',
  //   imageUrl: '/projects/projeto-04.webp',
  //   featured: false,
  //   type: 'backend',
  // },
]

export const featuredProjects = projects.filter((p) => p.featured)
