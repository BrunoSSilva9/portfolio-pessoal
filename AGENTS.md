# AGENTS.md — Portfólio Pessoal de Desenvolvedor
> Instruções para Claude Sonnet 4.6 (Thinking) no Google Antigravity  
> Leia este arquivo **inteiro** antes de escrever qualquer linha de código.

---

## 1. Visão geral do projeto

Você está construindo um **portfólio pessoal de desenvolvedor** para um estudante de graduação em **Sistemas de Informação** que busca a primeira vaga como desenvolvedor júnior. O site é simultaneamente pessoal e profissional — tem identidade própria e forte, mas não sacrifica clareza nem profissionalismo.

**Identidade visual central: o "Codex do Mago"**  
O portfólio adota a metáfora de um grimório digital sofisticado. O dono ama livros de ficção, animes de magia (Pokémon, Black Clover) e vôlei. Essa personalidade aparece no visual — tema sombrio, paleta mágica, nomenclatura temática nas seções — mas a execução é **elegante e madura**, nunca infantil. Recrutadores precisam ver um desenvolvedor sério; a temática é o tempero, não o prato principal.

**URL alvo:** `seuprimeironome.dev` (ou similar)  
**Deploy:** Vercel (CI/CD automático via GitHub)

---

## 2. Stack tecnológica obrigatória

```
Frontend:    React 18 + Vite + TypeScript
Estilo:      Tailwind CSS v3 (utilitários) + CSS Modules para casos específicos
Animações:   Framer Motion (scroll, reveals, hover) + GSAP (ScrollTrigger, timeline)
3D/Hero:     Three.js (partículas do hero, círculo mágico)
Formulário:  EmailJS (envio sem backend)
Roteamento:  React Router v6 (SPA single-page)
Lint/Format: ESLint + Prettier (configs estritas)
Testes:      Vitest + Testing Library (ao menos smoke tests)
Deploy:      Vercel via GitHub Actions
```

**Bibliotecas de apoio permitidas:**
- `@react-three/fiber` + `@react-three/drei` (wrapper React para Three.js)
- `react-intersection-observer` (triggers de animação no scroll)
- `react-hot-toast` (feedback do formulário)
- `clsx` + `tailwind-merge` (composição de classes)
- Fontes: **Inter** (corpo) + **Cinzel** (títulos/display) via Google Fonts

**Proibido:**
- jQuery ou manipulação direta de DOM desnecessária
- CSS-in-JS (styled-components, emotion) — use Tailwind
- Bibliotecas de UI prontas (MUI, Chakra, Ant Design) — o design é 100% customizado
- Qualquer dependência com CVE crítico não corrigido

---

## 3. Estrutura de pastas obrigatória

```
portfolio/
├── public/
│   ├── favicon.svg              # Ícone de grimório/estrela mágica
│   ├── og-image.png             # Open Graph 1200×630
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AccessibilityBar.tsx    # Barra de acessibilidade eMAG
│   │   │   ├── SkipLinks.tsx           # Skip links eMAG (rec. 1.5)
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx               # Seção 1 — Invocação
│   │   │   ├── About.tsx              # Seção 2 — O Grimório
│   │   │   ├── Skills.tsx             # Seção 3 — Magias Dominadas
│   │   │   ├── Projects.tsx           # Seção 4 — Grimório de Feitiços
│   │   │   ├── Publications.tsx       # Seção 5 — Produção Acadêmica ← NOVA
│   │   │   ├── Education.tsx          # Seção 6 — Jornada do Aprendiz
│   │   │   └── Contact.tsx            # Seção 7 — Convocar o Mago
│   │   ├── ui/
│   │   │   ├── MagicCursor.tsx        # Cursor customizado
│   │   │   ├── ParticleCanvas.tsx     # Three.js hero
│   │   │   ├── ProjectCard.tsx        # Card com flip effect
│   │   │   ├── PublicationCard.tsx    # Card de artigo/congresso
│   │   │   ├── SkillBar.tsx           # Barra de mana/habilidade
│   │   │   ├── SectionReveal.tsx      # Wrapper de animação scroll
│   │   │   └── TypewriterText.tsx     # Efeito de digitação
│   │   └── accessibility/
│   │       └── AccessibilityPage.tsx  # Página /acessibilidade eMAG
│   ├── data/
│   │   ├── projects.ts                # Array de projetos com tipagem
│   │   ├── publications.ts            # Array de publicações com tipagem
│   │   ├── skills.ts                  # Array de skills com tipagem
│   │   └── education.ts               # Array de formação
│   ├── hooks/
│   │   ├── useReducedMotion.ts        # Hook para prefers-reduced-motion
│   │   ├── useTheme.ts                # Hook para dark/light mode
│   │   └── useIntersection.ts         # Hook de IntersectionObserver
│   ├── styles/
│   │   ├── globals.css                # Reset + variáveis CSS + classes base
│   │   └── accessibility.css          # Estilos específicos acessibilidade
│   ├── types/
│   │   └── index.ts                   # Types globais (Project, Publication, etc.)
│   ├── utils/
│   │   └── cn.ts                      # Helper clsx + tailwind-merge
│   ├── App.tsx
│   └── main.tsx
├── .agents/
│   └── rules/
│       └── portfolio.md               # Este arquivo (cópia de referência)
├── AGENTS.md                          # Este arquivo (raiz do projeto)
├── index.html                         # lang="pt-BR", meta tags, skip links
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc
└── vercel.json
```

---

## 4. Paleta de cores e design tokens

Defina as seguintes variáveis CSS em `globals.css`. Tailwind deve referenciar essas variáveis via `tailwind.config.ts`:

```css
:root {
  /* Backgrounds */
  --color-bg-primary:    #0A0B0F;   /* Quase preto — fundo principal (dark) */
  --color-bg-secondary:  #12141A;   /* Cards e superfícies */
  --color-bg-tertiary:   #1C1F2B;   /* Hover states */

  /* Acentos mágicos */
  --color-gold:          #E8A838;   /* Dourado — CTA, destaques */
  --color-gold-dim:      #A3731C;   /* Dourado escurecido — hover */
  --color-purple:        #7F77DD;   /* Roxo — links, badges, skills */
  --color-purple-dim:    #534AB7;   /* Roxo escurecido */
  --color-emerald:       #1D9E75;   /* Verde-esmeralda — sucesso, publicações */
  --color-emerald-dim:   #0F6E56;

  /* Texto */
  --color-text-primary:  #F0EEE8;   /* Branco-pergaminho */
  --color-text-secondary:#A8A69E;   /* Cinza-suave */
  --color-text-tertiary: #6B6962;   /* Hints, placeholders */

  /* Bordas */
  --color-border:        rgba(240, 238, 232, 0.08);
  --color-border-accent: rgba(127, 119, 221, 0.3);

  /* Tipografia */
  --font-display: 'Cinzel', serif;       /* Títulos de seção, nome */
  --font-body:    'Inter', sans-serif;   /* Corpo, UI */

  /* Sombras mágicas */
  --glow-gold:    0 0 20px rgba(232, 168, 56, 0.25);
  --glow-purple:  0 0 20px rgba(127, 119, 221, 0.25);

  /* Raios de borda */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
}

/* Modo claro (toggle) — "pergaminho iluminado" */
[data-theme="light"] {
  --color-bg-primary:    #F5F0E8;
  --color-bg-secondary:  #EDE8DC;
  --color-bg-tertiary:   #E2DAC8;
  --color-text-primary:  #1A1814;
  --color-text-secondary:#4A4640;
  --color-text-tertiary: #8A8680;
  --color-border:        rgba(26, 24, 20, 0.1);
}
```

**Contraste obrigatório:** Toda combinação texto/fundo DEVE passar 4.5:1 (texto normal) ou 3:1 (texto grande ≥18pt). Teste com a ferramenta [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) antes de fixar. O dourado `#E8A838` sobre `#0A0B0F` passa — não degrade sem verificar.

---

## 5. Acessibilidade — eMAG 3.1 (OBRIGATÓRIO em 100% das features)

Este portfólio segue as **45 recomendações do eMAG 3.1** (Modelo de Acessibilidade em Governo Eletrônico, versão brasileira compatível com WCAG 2.0). Aplicar o eMAG num portfólio pessoal é um diferencial técnico explícito que deve aparecer no rodapé e na página `/acessibilidade`.

### 5.1 Implementações obrigatórias em todas as telas

**Skip links (eMAG rec. 1.5)** — Primeira coisa no `<body>`, visível apenas quando focado por teclado:
```tsx
// src/components/layout/SkipLinks.tsx
export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a href="#main-content" accessKey="1">Pular para o conteúdo principal [1]</a>
      <a href="#main-nav"     accessKey="2">Pular para a navegação [2]</a>
      <a href="#contact"      accessKey="3">Pular para o contato [3]</a>
    </div>
  );
}
```

**Barra de acessibilidade (eMAG Parte 4)** — Fixada no topo, acima da Navbar, com contraste adequado:
```tsx
// src/components/layout/AccessibilityBar.tsx
// Deve conter:
// - Toggle de alto contraste
// - Toggle dark/light
// - Acesskey indicados visualmente
// - aria-live para anunciar mudanças
```

**Atributo lang (eMAG rec. 1.8):**
```html
<!-- index.html -->
<html lang="pt-BR">
```
Trechos em inglês no código (labels de tecnologias como "React", "Node.js") não precisam de `lang`, mas citações ou textos em inglês em prosa precisam de `<span lang="en">`.

**Hierarquia de headings (eMAG rec. 3.5):**
```
<h1>  → Nome do desenvolvedor (apenas 1 por página)
<h2>  → Nome de cada seção (Sobre, Skills, Projetos, etc.)
<h3>  → Subtítulos dentro de seções
<h4>  → Títulos de cards individuais
```
Nunca pule nível. Use font-size e weight via CSS, não mudando o nível semântico.

**Foco visível (WCAG 2.4.7):**
```css
/* globals.css — nunca remova o outline, estilize-o */
:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}
```

**Reduced motion (eMAG rec. 2.5):**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
No React, use o hook `useReducedMotion()` para desativar Framer Motion e GSAP condicionalmente:
```tsx
// src/hooks/useReducedMotion.ts
import { useEffect, useState } from 'react';
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    mq.addEventListener('change', e => setPrefersReduced(e.matches));
  }, []);
  return prefersReduced;
}
```

**Imagens e ícones (eMAG rec. 3.2 / 1.9):**
- Foto do desenvolvedor: `<img alt="[Nome], estudante de Sistemas de Informação" />`
- Logos de tecnologias: `<img alt="React" />` (nome da tecnologia, sem "logo de")
- Ícones decorativos: `aria-hidden="true"`
- SVGs informativos: `role="img"` + `<title>` + `<desc>`

**Links externos (eMAG rec. 3.4):**
```tsx
<a
  href="https://github.com/..."
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Ver projeto no GitHub (abre em nova aba)"
>
  GitHub <ExternalLinkIcon aria-hidden="true" />
</a>
```

**Abreviações e siglas (eMAG rec. 3.10)** — Importante na seção de publicações:
```tsx
<abbr title="Simpósio Brasileiro de Sistemas de Informação">SBSI</abbr>
<abbr title="Sociedade Brasileira de Computação">SBC</abbr>
```

**Animações piscantes (eMAG rec. 5.4):** Nenhum elemento deve piscar mais de 3 vezes por segundo. As partículas do Three.js e o typewriter devem ter taxa de refresh suave e contínua.

**Controles de mídia (eMAG rec. 5.5):** Se houver vídeo de demo de projeto, deve ter `controls`, `<track kind="captions">` e possibilidade de pausar.

### 5.2 Formulário de contato (eMAG Seção 6 — todas as 8 recomendações)

```tsx
// src/components/sections/Contact.tsx
<form noValidate aria-labelledby="contact-heading">
  <h2 id="contact-heading">Convocar o Mago</h2>
  <p id="form-instructions">
    Campos marcados com <abbr title="obrigatório">*</abbr> são obrigatórios.
  </p>
  <fieldset>
    <legend className="sr-only">Informações de contato</legend>
    <div>
      <label htmlFor="name">
        Nome <abbr title="obrigatório" aria-label="obrigatório">*</abbr>
      </label>
      <input
        id="name"
        type="text"
        autoComplete="name"
        aria-required="true"
        aria-describedby="name-error"
      />
      <span id="name-error" role="alert" aria-live="polite" />
    </div>
    {/* Repita o padrão para email e mensagem */}
  </fieldset>
  <button type="submit">Enviar mensagem</button>
  <div role="alert" aria-live="assertive" id="form-feedback" />
</form>
```

Ao submeter com erro: mova o foco para o campo inválido com `elementRef.current?.focus()`.  
Ao submeter com sucesso: escreva no `#form-feedback` e anuncie via `aria-live="assertive"`.

### 5.3 Tabela de publicações (eMAG rec. 1.6, 3.7, 3.8)

```tsx
<section aria-labelledby="pub-heading">
  <h2 id="pub-heading">Produção Acadêmica</h2>
  <table aria-describedby="pub-caption">
    <caption id="pub-caption">
      Artigos publicados e participações em congressos científicos,
      ordenados do mais recente ao mais antigo.
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
      {/* Linhas de dados */}
    </tbody>
  </table>
</section>
```

### 5.4 Página de acessibilidade (eMAG Parte 4)

Crie a rota `/acessibilidade` com:
- Lista de atalhos de teclado disponíveis (accesskeys 1, 2, 3)
- Descrição dos recursos implementados (alto contraste, redução de movimento, redimensionamento de fonte)
- Informação sobre conformidade: "Este portfólio segue as recomendações do eMAG 3.1 e WCAG 2.0 nível AA"
- E-mail para reportar barreiras de acessibilidade
- Data da última avaliação (usar ASES + Lighthouse)

### 5.5 Ferramenta de validação

Após implementar cada seção, rode:
```bash
npx lighthouse http://localhost:5173 --only-categories=accessibility --output=html
```
O score de acessibilidade alvo é **≥ 95**. Corrija todos os erros antes de continuar.

---

## 6. Seções do site — especificação detalhada

### Seção 1: Hero — "Invocação"

**Objetivo:** primeira impressão memorável, identidade imediata.

**Elementos obrigatórios:**
- Canvas Three.js com partículas formando um círculo mágico ao fundo (velocidade baixa, suave)
- Nome do desenvolvedor com fonte Cinzel, surgindo com animação de fade + scale
- Subtítulo com typewriter effect: alterna entre "Estudante de Sistemas de Informação", "Desenvolvedor Full Stack", "Aprendiz de Feitiços em Código"
- Dois botões CTA: "Ver projetos" (ancora para #projects) e "Baixar CV" (link para PDF no `/public`)
- Scroll indicator animado na parte inferior

**Acessibilidade:**
- O canvas Three.js deve ter `aria-hidden="true"` — é puramente decorativo
- O typewriter deve ter `aria-live="off"` para não anunciar cada letra; use um `<span className="sr-only">` com o texto completo estático para leitores de tela
- Reduced motion: substituir partículas por gradiente CSS estático; substituir typewriter por texto fixo

**Código base do canvas:**
```tsx
// src/components/ui/ParticleCanvas.tsx
// Use @react-three/fiber + @react-three/drei
// Partículas: ~800 points em posição esférica, cor --color-purple com leve alpha
// Rotação lenta: 0.001 rad/frame
// Mouse parallax suave com useFrame
// aria-hidden="true" no elemento canvas
```

### Seção 2: Sobre — "O Grimório"

**Elementos:**
- Foto com moldura estilo "retrato de grimório" (borda com gradiente dourado, efeito sutil de glow no hover)
- Parágrafo de apresentação (3–4 linhas): apresentação profissional + pessoal em equilíbrio
- Mini linha do tempo horizontal da graduação (início → meio → formatura prevista)
- 3 ícones de hobbies discretos com tooltip: 📚 Leitura, 🏐 Vôlei, ✨ Animes de magia

**Acessibilidade:**
- `alt` na foto: "Foto de [Nome], desenvolvedor e estudante de Sistemas de Informação"
- Ícones de hobbies: `aria-label` descritivo + `role="img"` ou texto visível em mobile

### Seção 3: Skills — "Magias Dominadas"

**Estrutura de dados (`src/data/skills.ts`):**
```typescript
export type SkillLevel = 'Iniciante' | 'Aprendiz' | 'Praticante' | 'Mestre';

export interface Skill {
  name: string;           // "React"
  level: SkillLevel;      // Categoria semântica
  percent: number;        // 0-100 para a barra (honesto!)
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Other';
  icon: string;           // URL do devicon ou SVG local
}

export const skills: Skill[] = [
  { name: 'React',       level: 'Praticante', percent: 70, category: 'Frontend', icon: '...' },
  { name: 'TypeScript',  level: 'Aprendiz',   percent: 55, category: 'Frontend', icon: '...' },
  { name: 'Python',      level: 'Praticante', percent: 65, category: 'Backend',  icon: '...' },
  { name: 'Java',        level: 'Praticante', percent: 60, category: 'Backend',  icon: '...' },
  { name: 'SQL',         level: 'Praticante', percent: 65, category: 'Database', icon: '...' },
  { name: 'Node.js',     level: 'Aprendiz',   percent: 50, category: 'Backend',  icon: '...' },
  { name: 'Git',         level: 'Praticante', percent: 70, category: 'DevOps',   icon: '...' },
  { name: 'Docker',      level: 'Iniciante',  percent: 30, category: 'DevOps',   icon: '...' },
  // Adicionar conforme habilidades reais do desenvolvedor
];
```

**Importante:** os níveis DEVEM ser honestos. Recrutadores penalizam exagero mais do que humildade.

**SkillBar animada:**
- A barra de progresso anima de 0 para `percent` quando entra no viewport (IntersectionObserver)
- A animação metáfora é de "carregamento de mana" — a barra preenche da esquerda para a direita com cor `--color-purple`
- Reduced motion: barra aparece já preenchida, sem animação

**Acessibilidade:**
```tsx
<div
  role="progressbar"
  aria-valuenow={skill.percent}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={`${skill.name}: ${skill.level} (${skill.percent}%)`}
>
```

### Seção 4: Projetos — "Grimório de Feitiços"

**Estrutura de dados (`src/data/projects.ts`):**
```typescript
export interface Project {
  id: string;
  title: string;           // Nome criativo do projeto
  subtitle: string;        // Uma linha descrevendo o que faz
  description: string;     // 2-3 frases do problema resolvido
  problemSolved: string;   // Qual problema real foi resolvido
  techStack: string[];     // ["React", "Node.js", "PostgreSQL"]
  githubUrl: string;       // Link do repositório
  liveUrl?: string;        // Link do deploy (obrigatório se existir)
  imageUrl: string;        // Screenshot do projeto
  featured: boolean;       // true para os 2-3 projetos destaque
  type: 'fullstack' | 'frontend' | 'backend' | 'mobile' | 'open-source';
}
```

**ProjectCard — efeito de flip:**
- **Frente:** screenshot/preview + nome + stack badges
- **Verso:** descrição + problema resolvido + links (GitHub e Live)
- Flip animado no hover (desktop) e ao clicar (mobile/teclado)
- Reduced motion: exibir frente e verso side-by-side em vez de flip

**Acessibilidade do card:**
```tsx
<article aria-label={`Projeto: ${project.title}`}>
  {/* O botão de flip deve ser focável e ativável com Enter/Space */}
  <button
    aria-expanded={isFlipped}
    aria-controls={`project-details-${project.id}`}
    onClick={() => setIsFlipped(!isFlipped)}
  >
    <span className="sr-only">{isFlipped ? 'Ver capa' : 'Ver detalhes'} de {project.title}</span>
  </button>
  <div id={`project-details-${project.id}`} hidden={!isFlipped}>
    {/* Detalhes do projeto */}
  </div>
</article>
```

### Seção 5: Publicações — "Produção Acadêmica" ← NOVA

**Estrutura de dados (`src/data/publications.ts`):**
```typescript
export type PublicationType =
  | 'artigo-publicado'
  | 'artigo-aprovado'
  | 'resumo-expandido'
  | 'apresentacao-oral'
  | 'poster'
  | 'participacao';

export interface Publication {
  id: string;
  title: string;              // Título completo do trabalho
  type: PublicationType;
  venue: string;              // Nome do evento ou periódico
  venueAcronym?: string;      // Sigla (ex: "SBSI", "WSCAD")
  venueFullName?: string;     // Nome completo para o <abbr>
  year: number;
  authors: string[];          // Lista de autores; destacar o dono na renderização
  ownerAuthor: string;        // Nome do dono do portfólio (para destacar)
  doi?: string;               // DOI se disponível
  url?: string;               // URL dos anais ou PDF
  abstract?: string;          // Resumo curto (opcional, para tooltip/expand)
  isHighlighted?: boolean;    // Destaque visual para trabalhos principais
}

export const publications: Publication[] = [
  // Exemplo de estrutura — preencher com dados reais
  {
    id: 'pub-001',
    title: 'Título do artigo aqui',
    type: 'artigo-publicado',
    venue: 'Simpósio Brasileiro de Sistemas de Informação',
    venueAcronym: 'SBSI',
    venueFullName: 'Simpósio Brasileiro de Sistemas de Informação',
    year: 2024,
    authors: ['Seu Nome', 'Co-autor 1', 'Orientador'],
    ownerAuthor: 'Seu Nome',
    doi: '10.xxxx/xxxxx',
    url: 'https://...',
    isHighlighted: true,
  },
];
```

**Componente `Publications.tsx`:**

Layout padrão: cards em grid (2 colunas desktop, 1 mobile). Layout alternativo disponível: tabela (toggle via botão "Ver como tabela" — útil para muitas publicações).

Cada `PublicationCard` deve conter:
- Badge colorido por tipo (`artigo-publicado` → verde-esmeralda, `participacao` → cinza, etc.)
- Título clicável (link para DOI/URL se disponível)
- Sigla do evento com `<abbr>` e nome completo
- Ano e lista de autores (nome do dono em negrito)
- Ícone de link externo quando há URL
- Se `isHighlighted`: borda dourada e `aria-label` com "destaque"

Filtros acessíveis:
```tsx
<fieldset>
  <legend>Filtrar por tipo</legend>
  {/* Radio buttons estilizados como pills — NÃO apenas cor, deve ter texto */}
  <label><input type="radio" name="pub-filter" value="all" /> Todos</label>
  <label><input type="radio" name="pub-filter" value="artigo-publicado" /> Artigos</label>
  <label><input type="radio" name="pub-filter" value="participacao" /> Eventos</label>
</fieldset>
```

### Seção 6: Formação — "Jornada do Aprendiz"

**Estrutura:**
- Timeline vertical animada por scroll com dois tipos de item:
  - **Acadêmico:** Sistemas de Informação (universidade, período, previsão de formatura)
  - **Complementar:** cursos, certificações, bootcamps
- Disciplinas relevantes em badges (Estrutura de Dados, Banco de Dados, Engenharia de Software, etc.)

**Acessibilidade:** A timeline deve ser um `<ol>` (lista ordenada) — a ordem cronológica é semântica.
```tsx
<ol aria-label="Linha do tempo de formação">
  <li>
    <time dateTime="2022">2022</time>
    <h3>Bacharelado em Sistemas de Informação</h3>
    {/* ... */}
  </li>
</ol>
```

### Seção 7: Contato — "Convocar o Mago"

- Formulário via EmailJS (ver spec de acessibilidade na seção 5.2 acima)
- Links sociais: LinkedIn, GitHub, e-mail com `aria-label` completo
- Frase de CTA: "Pronto para iniciar uma nova quest?"
- Em mobile: botão flutuante de WhatsApp (se o desenvolvedor desejar)

---

## 7. Componentes de animação — regras de implementação

### MagicCursor (`src/components/ui/MagicCursor.tsx`)
- Cursor customizado: círculo roxo `--color-purple` de 12px que segue o mouse com `lerp` suave
- Em hover sobre elementos clicáveis: expande para 40px com blend-mode `difference`
- Em mobile/touch: **não renderizar** (detectar via `window.matchMedia('(pointer: coarse)')`)
- Reduced motion: não renderizar

### ParticleCanvas (Hero)
- Reduced motion → `return <div aria-hidden="true" className="bg-gradient-radial-magic" />` (gradiente estático)
- Mobile (< 768px): reduzir partículas para 200 (performance)
- O canvas NÃO pode bloquear eventos de clique nos elementos acima dele (`pointer-events: none`)

### SectionReveal (wrapper de scroll)
```tsx
// Usar Framer Motion + useReducedMotion
const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function SectionReveal({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={prefersReduced ? {} : variants}
    >
      {children}
    </motion.div>
  );
}
```

### TypewriterText (Hero subtitle)
- Array de strings para alternar
- Velocidade: 60ms por caractere, pausa de 2000ms entre strings
- Reduced motion: renderizar apenas a primeira string, sem animação
- Acessibilidade: `aria-live="off"` no elemento visual; `<span className="sr-only">` com o texto estático completo

---

## 8. HTML semântico — index.html base

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Portfólio de [Nome] — Desenvolvedor Full Stack e estudante de Sistemas de Informação. Projetos, publicações e habilidades." />
  <meta property="og:title" content="[Nome] — Desenvolvedor" />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="/og-image.png" />
  <meta name="theme-color" content="#0A0B0F" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

  <title>[Nome] — Portfólio</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

**App.tsx — estrutura semântica obrigatória:**
```tsx
// src/App.tsx
export default function App() {
  return (
    <>
      <SkipLinks />                    {/* PRIMEIRO elemento no DOM */}
      <AccessibilityBar />             {/* Segundo */}
      <Navbar />
      <main id="main-content" tabIndex={-1}>  {/* tabIndex={-1} para receber foco do skip link */}
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Publications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

---

## 9. Performance e SEO

**Vite + build:**
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three':   ['three', '@react-three/fiber', '@react-three/drei'],
          'motion':  ['framer-motion'],
          'vendor':  ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
```

**Lazy loading obrigatório:**
```tsx
// src/App.tsx — carregar Three.js só quando Hero entra no viewport
const Hero = lazy(() => import('./components/sections/Hero'));
const ParticleCanvas = lazy(() => import('./components/ui/ParticleCanvas'));
```

**Imagens:**
- Usar formato WebP para screenshots de projetos
- `loading="lazy"` em todas as imagens abaixo do fold
- Dimensões explícitas para evitar layout shift (CLS)

**Core Web Vitals alvo:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

---

## 10. Ordem de implementação recomendada para o agente

Execute nesta ordem para garantir base sólida antes de adicionar complexidade:

```
Fase 1 — Fundação (sem animação)
  1. Setup Vite + React + TypeScript + Tailwind + ESLint
  2. globals.css com todos os tokens de design
  3. index.html semântico + SkipLinks + AccessibilityBar (estrutura estática)
  4. Navbar acessível (nav, aria-label, mobile menu com aria-expanded)
  5. Footer com links sociais acessíveis

Fase 2 — Conteúdo (sem animação ainda)
  6. Seção Hero (estática, sem partículas)
  7. Seção About
  8. Seção Skills (barras estáticas)
  9. Seção Projects (cards sem flip)
  10. Seção Publications ← incluir desde o início
  11. Seção Education (timeline estática)
  12. Seção Contact (formulário + EmailJS)

Fase 3 — Acessibilidade
  13. Validar TODOS os formulários e aria
  14. Testar navegação completa por teclado (Tab, Enter, Escape)
  15. Rodar Lighthouse e corrigir até score ≥ 95
  16. Criar página /acessibilidade

Fase 4 — Animações (progressively enhanced)
  17. SectionReveal com Framer Motion
  18. SkillBar animada
  19. ProjectCard flip
  20. TypewriterText
  21. MagicCursor (desktop only)
  22. Three.js ParticleCanvas
  23. GSAP ScrollTrigger (efeitos avançados de scroll)

Fase 5 — Polimento e deploy
  24. Otimização de performance (lazy loading, code splitting)
  25. Testes com Vitest
  26. Deploy Vercel + domínio personalizado
  27. sitemap.xml + robots.txt
```

---

## 11. Guardrails — o que NUNCA fazer

```
❌ Nunca usar <div> para elementos interativos — use <button> ou <a>
❌ Nunca remover outline de focus — apenas estilizá-lo
❌ Nunca usar apenas cor para transmitir informação (eMAG rec. 4.2)
❌ Nunca criar animações que piscam > 3 vezes/segundo (eMAG rec. 5.4)
❌ Nunca usar position: fixed em elementos que podem crescer (quebra mobile)
❌ Nunca instalar biblioteca de UI pronta (MUI, Chakra, etc.)
❌ Nunca colocar texto importante como background-image CSS
❌ Nunca pular nível de heading (h1 → h3 sem h2)
❌ Nunca usar apenas placeholder como label de campo (eMAG rec. 6.1)
❌ Nunca hardcodar cores sem verificar contraste 4.5:1
❌ Nunca colocar eventos apenas em mouse (sempre adicionar keyboard equivalent)
❌ Nunca deixar o Three.js canvas sem aria-hidden="true"
❌ Nunca fazer deploy sem rodar Lighthouse e corrigir erros de acessibilidade
❌ Nunca criar tabela de publicações sem scope nos <th> (eMAG rec. 3.7)
```

---

## 12. Dados placeholder — substituir pelo desenvolvedor

Os dados abaixo são placeholders estruturais. O agente deve criar a estrutura tipada e comentada para fácil substituição:

```typescript
// src/data/projects.ts — exemplos de projetos para preencher
// Projeto 1: App fullstack (React + Node.js + PostgreSQL + deploy Vercel/Render)
// Projeto 2: Integração com IA ou API pública
// Projeto 3: Solução para problema real (estudo, vôlei, leitura)
// Projeto 4 (opcional): Contribuição open source

// src/data/publications.ts — preencher com dados reais:
// - Artigos em congressos da SBC (SBSI, WSCAD, CBIE, etc.)
// - Resumos expandidos
// - Participações como ouvinte (marcar com tipo 'participacao')
```

---

## 13. Verificação final antes de considerar completo

O agente deve garantir que TODOS estes itens são verdadeiros antes de encerrar:

- [ ] Lighthouse Accessibility score ≥ 95 em todas as páginas
- [ ] Lighthouse Performance score ≥ 85 em mobile
- [ ] Navegação 100% funcional apenas com teclado (Tab, Shift+Tab, Enter, Space, Escape)
- [ ] Skip links visíveis ao receber foco (testado manualmente)
- [ ] `lang="pt-BR"` no `<html>`
- [ ] Apenas um `<h1>` por página
- [ ] Nenhum heading pula nível
- [ ] Todos os `<img>` têm `alt` descritivo (ou `alt=""` se decorativa)
- [ ] Todos os links externos têm `aria-label` indicando "abre em nova aba"
- [ ] Formulário funciona com leitor de tela (testar com NVDA ou VoiceOver)
- [ ] `prefers-reduced-motion` desativa todas as animações
- [ ] Three.js canvas tem `aria-hidden="true"`
- [ ] TypewriterText tem texto estático alternativo para leitores de tela
- [ ] Seção Publications existe e está populada com dados placeholder tipados
- [ ] Página `/acessibilidade` existe e está linkada no footer
- [ ] Declaração de conformidade no footer: "eMAG 3.1 | WCAG 2.0 AA"
- [ ] Contrastes verificados: todos os textos passam 4.5:1 (normal) ou 3:1 (grande)
- [ ] Deploy funcionando na Vercel com domínio configurado
- [ ] README.md do repositório GitHub bem escrito (o portfólio é ele mesmo um projeto)

---

*AGENTS.md — versão 1.0 | Projeto: Portfólio Pessoal | Modelo: Claude Sonnet 4.6 (Thinking) via Google Antigravity*
