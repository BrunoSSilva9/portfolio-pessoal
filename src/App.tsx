import { lazy, Suspense } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AccessibilityBar } from '@/components/layout/AccessibilityBar'
import { SkipLinks } from '@/components/layout/SkipLinks'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MagicCursor } from '@/components/ui/MagicCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

// Carregamento lazy para code splitting (performance)
// Three.js e seções pesadas carregam só quando necessário
import Hero from '@/components/sections/Hero'
const About        = lazy(() => import('@/components/sections/About'))
const Skills       = lazy(() => import('@/components/sections/Skills'))
const Projects     = lazy(() => import('@/components/sections/Projects'))
const Publications = lazy(() => import('@/components/sections/Publications'))
const Education    = lazy(() => import('@/components/sections/Education'))
const Experience   = lazy(() => import('@/components/sections/Experience'))
const Contact      = lazy(() => import('@/components/sections/Contact'))
const AccessibilityPage = lazy(() => import('@/components/accessibility/AccessibilityPage'))

// Fallback para Suspense — spinner mínimo acessível
function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Carregando conteúdo"
      className="flex items-center justify-center min-h-screen bg-[var(--color-bg-primary)]"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner visual */}
        <div
          aria-hidden="true"
          className="w-10 h-10 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-gold)] animate-spin"
        />
        <p className="text-[var(--color-text-tertiary)] text-sm font-body">
          Invocando o grimório…
        </p>
      </div>
    </div>
  )
}

// Página principal — todas as seções
function HomePage() {
  return (
    <>
      {/* tabIndex={-1} permite receber foco do skip link eMAG rec. 1.5 */}
      <main id="main-content" tabIndex={-1} aria-label="Conteúdo principal">
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Projects />
          <Publications />
          <Education />
          <Experience />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* PRIMEIRO elemento no DOM — eMAG rec. 1.5 */}
      <SkipLinks />

      {/* Barra de progresso de scroll global via GSAP */}
      <ScrollProgress />

      {/* Barra de acessibilidade — eMAG Parte 4 */}
      <AccessibilityBar />

      {/* MagicCursor — desktop only, desativado em mobile e reduced motion */}
      <MagicCursor />

      {/* Navbar */}
      <Navbar />

      {/* Toast notifications para formulário de contato */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--color-bg-secondary)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-accent)',
            fontFamily: 'var(--font-body)',
          },
        }}
      />

      <Suspense fallback={<PageLoader />}>
        <LazyMotion features={domAnimation}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/acessibilidade" element={<AccessibilityPage />} />
            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <main
                  id="main-content"
                  tabIndex={-1}
                  className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4"
                >
                  <h1 className="font-display text-4xl text-[var(--color-gold)]">
                    404
                  </h1>
                  <p className="text-[var(--color-text-secondary)]">
                    Esta página não existe no grimório.
                  </p>
                  <a href="/" className="btn-primary mt-4">
                    Voltar ao Início
                  </a>
                </main>
              }
            />
          </Routes>
        </LazyMotion>
      </Suspense>
    </BrowserRouter>
  )
}
