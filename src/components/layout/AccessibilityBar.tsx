// Barra de acessibilidade — eMAG Parte 4
// Fixada acima da Navbar com controles de alto contraste, tema e acesskeys

import { useRef } from 'react'
import { useTheme } from '@/hooks/useTheme'

export function AccessibilityBar() {
  const { theme, highContrast, toggleTheme, toggleHighContrast } = useTheme()
  const liveRef = useRef<HTMLSpanElement>(null)

  const handleThemeToggle = () => {
    toggleTheme()
    if (liveRef.current) {
      liveRef.current.textContent =
        theme === 'dark' ? 'Modo claro ativado' : 'Modo escuro ativado'
    }
  }

  const handleContrastToggle = () => {
    toggleHighContrast()
    if (liveRef.current) {
      liveRef.current.textContent = highContrast
        ? 'Alto contraste desativado'
        : 'Alto contraste ativado'
    }
  }

  return (
    <div className="accessibility-bar" role="region" aria-label="Barra de acessibilidade">
      {/* Anúncio para leitores de tela (aria-live) */}
      <span
        ref={liveRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      <div className="accessibility-bar__inner justify-end sm:justify-between">
        <div className="accessibility-bar__controls w-full justify-between sm:justify-end" role="group" aria-label="Controles de acessibilidade">
          {/* Toggle dark/light */}
          <button
            id="btn-toggle-theme"
            className="accessibility-bar__btn"
            onClick={handleThemeToggle}
            aria-pressed={theme === 'light'}
            aria-label={
              theme === 'dark'
                ? 'Ativar modo claro (pergaminho iluminado)'
                : 'Ativar modo escuro (codex sombrio)'
            }
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span>{theme === 'dark' ? 'Modo claro' : 'Modo escuro'}</span>
          </button>

          {/* Toggle alto contraste */}
          <button
            id="btn-toggle-contrast"
            className="accessibility-bar__btn"
            onClick={handleContrastToggle}
            aria-pressed={highContrast}
            aria-label={
              highContrast
                ? 'Desativar alto contraste'
                : 'Ativar alto contraste'
            }
            title="Alto contraste"
          >
            <span aria-hidden="true">◑</span>
            <span>Alto contraste</span>
          </button>

          {/* Link para página de acessibilidade */}
          <a
            href="/acessibilidade"
            className="accessibility-bar__btn"
            aria-label="Abrir página de declaração de acessibilidade"
            title="Acessibilidade"
          >
            <span aria-hidden="true">♿</span>
            <span>Acessibilidade</span>
          </a>
        </div>
      </div>
    </div>
  )
}
