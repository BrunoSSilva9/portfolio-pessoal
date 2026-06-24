// eMAG rec. 1.5 — Skip links para navegação por teclado
// Visíveis apenas quando focados (comportamento padrão de leitores de tela)

export function SkipLinks() {
  return (
    <div className="skip-links" role="navigation" aria-label="Atalhos de navegação">
      <a href="#main-content" className="skip-link" accessKey="1">
        Ir para o conteúdo principal <kbd aria-hidden="true">[1]</kbd>
      </a>
      <a href="#main-nav" className="skip-link" accessKey="2">
        Ir para a navegação <kbd aria-hidden="true">[2]</kbd>
      </a>
      <a href="#contact" className="skip-link" accessKey="3">
        Ir para o contato <kbd aria-hidden="true">[3]</kbd>
      </a>
    </div>
  )
}
