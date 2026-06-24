// Navbar — Navegação principal acessível
// eMAG rec. 1.5, 3.5 — nav com aria-label, mobile menu com aria-expanded

import { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'

const navLinks = [
  { href: '#about',        label: 'Sobre' },
  { href: '#skills',       label: 'Skills' },
  { href: '#projects',     label: 'Projetos' },
  { href: '#publications', label: 'Publicações' },
  { href: '#education',    label: 'Formação' },
  { href: '#experience',   label: 'Experiência' },
  { href: '#contact',      label: 'Contato' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Detecta scroll para mudar aparência do header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fecha menu mobile no resize para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fecha mobile menu ao pressionar Escape
  useEffect(() => {
    if (!mobileOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  // Bloqueia scroll do body quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Intersection Observer para highlight de seção ativa
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    // Smooth scroll com fallback
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header
      className={cn(
        'fixed left-0 right-0 z-[var(--z-overlay)] transition-all duration-300',
        isScrolled
          ? 'bg-[var(--color-bg-primary)]/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-lg'
          : 'bg-transparent'
      )}
      style={{ zIndex: 'var(--z-overlay)', top: 'var(--a11y-bar-height, 36px)' } as React.CSSProperties}
    >
      <nav
        id="main-nav"
        aria-label="Navegação principal"
        className="max-w-[1200px] mx-auto px-[var(--section-padding-x)] h-16 flex items-center justify-between"
      >
        {/* Logo / Nome */}
        <a
          href="#main-content"
          className="flex flex-col text-[var(--color-text-primary)] hover:text-[var(--color-gold)] transition-colors no-underline group"
          aria-label="{BrunoSantos} // ogarotodev — Voltar ao início"
        >
          <div className="font-display font-bold text-lg leading-tight">
            <span className="text-[var(--color-gold)]">{'{'}</span>
            <span className="mx-1">Bruno</span>
            <span className="text-[var(--color-purple)]">Santos</span>
            <span className="text-[var(--color-gold)]">{'}'}</span>
          </div>
          <div className="font-mono text-[11px] text-[var(--color-purple)] leading-tight">
            // ogarotodev
          </div>
        </a>

        {/* Links desktop */}
        <ul
          className="hidden md:flex items-center gap-1"
          role="list"
          aria-label="Links de navegação"
        >
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'block px-3 py-2 rounded-md font-body text-sm font-medium transition-all duration-150',
                    'hover:text-[var(--color-gold)] hover:bg-[var(--color-bg-tertiary)]',
                    isActive
                      ? 'text-[var(--color-gold)] bg-[var(--color-bg-tertiary)]'
                      : 'text-[var(--color-text-secondary)]'
                  )}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA desktop */}
        <a
          href="https://github.com/BrunoSSilva9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver perfil no GitHub (abre em nova aba)"
          className="btn-secondary hidden md:inline-flex text-sm py-2 px-4"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>

        {/* Botão hamburger mobile */}
        <button
          id="btn-mobile-menu"
          className="md:hidden p-2 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {/* Ícone hamburger / X animado */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação mobile"
        hidden={!mobileOpen}
        className={cn(
          'md:hidden fixed inset-0 top-[calc(4rem+var(--a11y-bar-height,36px))] z-[var(--z-modal)]',
          'bg-[var(--color-bg-primary)]/98 backdrop-blur-lg',
          'flex flex-col p-6 gap-2 border-t border-[var(--color-border)]',
          mobileOpen ? 'flex' : 'hidden'
        )}
      >
        <ul role="list" aria-label="Links de navegação mobile" className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'block px-4 py-3 rounded-lg font-body text-base font-medium transition-all duration-150',
                    'hover:text-[var(--color-gold)] hover:bg-[var(--color-bg-tertiary)]',
                    isActive
                      ? 'text-[var(--color-gold)] bg-[var(--color-bg-tertiary)]'
                      : 'text-[var(--color-text-primary)]'
                  )}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
          <a
            href="https://github.com/BrunoSSilva9"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver perfil no GitHub (abre em nova aba)"
            className="btn-secondary w-full justify-center"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}
