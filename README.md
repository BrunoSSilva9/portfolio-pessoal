# Bruno da Silva dos Santos — Portfólio Pessoal

> **Codex do Mago** — Portfólio de desenvolvedor Full Stack construído com React 18, TypeScript e Tailwind CSS. Segue as 45 recomendações do eMAG 3.1 (WCAG 2.0 AA).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BrunoSSilva9/portfolio)

---

## 🧙 Sobre o Projeto

Este portfólio é simultaneamente pessoal e profissional. A identidade visual — o **Codex do Mago** — adota a metáfora de um grimório digital sofisticado: tema sombrio, paleta mágica e nomenclatura temática nas seções. A execução é elegante e madura, pensada para impressionar recrutadores enquanto mantém a personalidade do desenvolvedor.

**Live:** [brunosantos.dev](https://brunosantos.dev) *(em breve)*

---

## 🛠️ Stack Tecnológica

| Categoria | Tecnologia |
|---|---|
| Core | React 18 + Vite + TypeScript |
| Estilo | Tailwind CSS v3 + CSS Modules |
| Animações | Framer Motion + GSAP (ScrollTrigger) |
| 3D/Hero | Three.js via @react-three/fiber |
| Formulário | EmailJS (sem backend) |
| Roteamento | React Router v6 |
| Lint/Format | ESLint + Prettier |
| Testes | Vitest + Testing Library |
| Deploy | Vercel via GitHub Actions |

---

## ♿ Acessibilidade — eMAG 3.1

Este portfólio foi desenvolvido seguindo as **45 recomendações do eMAG 3.1** e WCAG 2.0 nível AA:

- ✅ Skip links visíveis ao foco (rec. 1.5)
- ✅ Atributo `lang="pt-BR"` no `<html>` (rec. 1.8)
- ✅ Hierarquia de headings respeitada h1→h2→h3→h4 (rec. 3.5)
- ✅ Foco visível em todos os elementos interativos (WCAG 2.4.7)
- ✅ Contraste mínimo 4.5:1 (texto normal) e 3:1 (texto grande)
- ✅ `prefers-reduced-motion` desativa todas as animações (rec. 2.5)
- ✅ Canvas Three.js decorativo com `aria-hidden="true"`
- ✅ Formulário com `aria-required`, `aria-invalid`, `aria-live`
- ✅ Tabela de publicações com `scope` nos `<th>` (rec. 3.7)
- ✅ Toggle de alto contraste e dark/light mode na barra de acessibilidade
- ✅ Página `/acessibilidade` com declaração de conformidade

---

## 🚀 Como Rodar Localmente

```bash
# Clonar o repositório
git clone https://github.com/BrunoSSilva9/portfolio.git
cd portfolio

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com as chaves do EmailJS

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173`

---

## 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── accessibility/  # Página /acessibilidade
│   ├── layout/         # Navbar, Footer, SkipLinks, AccessibilityBar
│   ├── sections/       # Hero, About, Skills, Projects, Publications, Education, Contact
│   └── ui/             # MagicCursor, ParticleCanvas, TypewriterText (Fase 4)
├── data/               # Arrays tipados: projects, skills, publications, education
├── hooks/              # useReducedMotion, useTheme, useIntersection
├── styles/             # globals.css (design tokens), accessibility.css
├── types/              # Types TypeScript globais
└── utils/              # cn() helper
```

---

## 🌐 Deploy

O deploy é feito automaticamente na [Vercel](https://vercel.com) via push na branch `main`.

### Variáveis de Ambiente (Vercel)

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

---

## 📝 Licença

Código disponível para estudo e referência. Design e conteúdo pessoal © 2026 Bruno da Silva dos Santos.

---

*Desenvolvido com ❤️ e React · eMAG 3.1 | WCAG 2.0 AA*
