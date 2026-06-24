// Footer — Links sociais acessíveis + declaração eMAG
// eMAG rec. 3.4 — links externos com aria-label

const currentYear = new Date().getFullYear()

const socialLinks = [
  {
    id: 'footer-github',
    href: 'https://github.com/BrunoSSilva9',
    label: 'Ver perfil de Bruno Santos no GitHub (abre em nova aba)',
    displayLabel: 'GitHub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 'footer-linkedin',
    href: 'https://www.linkedin.com/in/bruno-silva-530726274',
    label: 'Ver perfil de Bruno Santos no LinkedIn (abre em nova aba)',
    displayLabel: 'LinkedIn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'footer-email',
    href: 'mailto:brunos.ss2002@gmail.com',
    label: 'Enviar e-mail para Bruno Santos',
    displayLabel: 'E-mail',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer
      className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] py-12 px-[var(--section-padding-x)]"
      role="contentinfo"
      aria-label="Rodapé do portfólio"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Identidade */}
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-1">
              <span className="text-[var(--color-gold)]">{'{'}</span>
              <span className="mx-1">Bruno</span>
              <span className="text-[var(--color-purple)]">Santos</span>
              <span className="text-[var(--color-gold)]">{'}'}</span>
            </p>
            <p className="text-[var(--color-text-tertiary)] text-sm">
              Estudante de Sistemas de Informação · Desenvolvedor Full Stack
            </p>
          </div>

          {/* Links sociais */}
          <nav aria-label="Links sociais e de contato">
            <ul className="flex items-center gap-3" role="list">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    id={link.id}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    aria-label={link.label}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] hover:bg-[var(--color-bg-tertiary)] transition-all duration-150 text-sm font-medium"
                  >
                    {link.icon}
                    <span className="hidden sm:inline">{link.displayLabel}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divisor */}
        <div className="border-t border-[var(--color-border)] mt-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--color-text-tertiary)] text-xs">
            <p>
              © {currentYear} <span className="text-[var(--color-purple)] font-mono text-[13px]">ogarotodev</span>{' '}
              <span className="text-[var(--color-text-secondary)]">· Bruno da Silva dos Santos</span>
            </p>

            <div className="flex items-center gap-4">
              {/* Declaração de conformidade eMAG */}
              <a
                href="/acessibilidade"
                className="hover:text-[var(--color-gold)] transition-colors"
                aria-label="eMAG 3.1 | WCAG 2.0 AA — Ver declaração de conformidade de acessibilidade"
              >
                <abbr title="Modelo de Acessibilidade em Governo Eletrônico versão 3.1">eMAG 3.1</abbr>
                {' | '}
                <abbr title="Web Content Accessibility Guidelines 2.0, nível AA">WCAG 2.0 AA</abbr>
              </a>

              <span aria-hidden="true">·</span>

              <span>
                {/*Feito com{' '}
                <span role="img" aria-label="amor">❤️</span>
                {' '}e React*/}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
