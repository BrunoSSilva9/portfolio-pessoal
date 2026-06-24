// Página /acessibilidade — eMAG Parte 4
// Declaração de conformidade + atalhos de teclado + recursos implementados

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <main
        id="main-content"
        tabIndex={-1}
        aria-label="Página de acessibilidade"
        className="section-container max-w-3xl"
      >
        {/* Cabeçalho */}
        <div className="mb-12">
          <h1 className="text-[var(--color-text-primary)] mb-4">
            Declaração de Acessibilidade
          </h1>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            Este portfólio foi desenvolvido seguindo as recomendações do{' '}
            <strong>
              <abbr title="Modelo de Acessibilidade em Governo Eletrônico versão 3.1">
                eMAG 3.1
              </abbr>
            </strong>{' '}
            e das diretrizes{' '}
            <strong>
              <abbr title="Web Content Accessibility Guidelines versão 2.0, nível de conformidade AA">
                WCAG 2.0 nível AA
              </abbr>
            </strong>
            . A acessibilidade é um compromisso técnico e ético, não um
            requisito opcional.
          </p>
        </div>

        {/* Conformidade */}
        <section aria-labelledby="conformance-heading" className="mb-10">
          <h2 id="conformance-heading" className="text-[var(--color-text-primary)] mb-4">
            Conformidade
          </h2>
          <div className="card-base">
            <ul className="flex flex-col gap-3">
              {[
                'Navegação completa por teclado (Tab, Shift+Tab, Enter, Space, Escape)',
                'Skip links visíveis ao receber foco (eMAG rec. 1.5)',
                'Atributo lang="pt-BR" no elemento <html> (eMAG rec. 1.8)',
                'Hierarquia de headings respeitada: h1 → h2 → h3 → h4 (eMAG rec. 3.5)',
                'Foco visível em todos os elementos interativos (WCAG 2.4.7)',
                'Contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande',
                'Suporte a prefers-reduced-motion — animações desativadas (eMAG rec. 2.5)',
                'Todas as imagens têm texto alternativo descritivo (eMAG rec. 3.2)',
                'Links externos indicam abertura em nova aba via aria-label (eMAG rec. 3.4)',
                'Siglas e abreviações usam <abbr> com title (eMAG rec. 3.10)',
                'Formulário de contato com aria-required, aria-invalid e aria-live (eMAG Seção 6)',
                'Tabela de publicações com scope nos <th> (eMAG rec. 3.7)',
                'Canvas Three.js decorativo com aria-hidden="true"',
                'Toggle de alto contraste disponível na barra de acessibilidade',
                'Toggle dark/light mode disponível na barra de acessibilidade',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-emerald)] mt-0.5 shrink-0" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Atalhos de teclado */}
        <section aria-labelledby="shortcuts-heading" className="mb-10">
          <h2 id="shortcuts-heading" className="text-[var(--color-text-primary)] mb-4">
            Atalhos de Teclado
          </h2>
          <table className="a11y-page-shortcut-table" aria-label="Atalhos de teclado disponíveis">
            <caption className="sr-only">
              Atalhos de teclado e teclas de acesso disponíveis neste portfólio
            </caption>
            <thead>
              <tr>
                <th scope="col">Tecla de acesso</th>
                <th scope="col">Ação</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  combo: 'Alt + 1 (Windows/Linux) ou Ctrl+Option+1 (Mac)',
                  action: 'Pular para o conteúdo principal',
                },
                {
                  combo: 'Alt + 2',
                  action: 'Pular para a navegação',
                },
                {
                  combo: 'Alt + 3',
                  action: 'Pular para a seção de contato',
                },
                { combo: 'Tab', action: 'Avançar entre elementos interativos' },
                { combo: 'Shift + Tab', action: 'Voltar entre elementos interativos' },
                { combo: 'Enter / Space', action: 'Ativar botão ou link focado' },
                { combo: 'Escape', action: 'Fechar menu mobile ou modal' },
              ].map((row) => (
                <tr key={row.combo}>
                  <td>
                    <kbd>{row.combo}</kbd>
                  </td>
                  <td>{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Recursos implementados */}
        <section aria-labelledby="resources-heading" className="mb-10">
          <h2 id="resources-heading" className="text-[var(--color-text-primary)] mb-4">
            Recursos de Acessibilidade
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Alto Contraste',
                desc: 'Aumenta o contraste de cores para melhor visibilidade. Disponível na barra de acessibilidade.',
                icon: '◑',
              },
              {
                title: 'Modo Claro / Escuro',
                desc: 'Alterna entre o tema sombrio (padrão) e o tema claro "Pergaminho Iluminado".',
                icon: '☀️',
              },
              {
                title: 'Movimento Reduzido',
                desc: 'Quando o sistema solicita prefers-reduced-motion, todas as animações são desativadas automaticamente.',
                icon: '⏸️',
              },
              {
                title: 'Leitores de Tela',
                desc: 'Compatível com NVDA, VoiceOver e JAWS. Testado com NVDA no Windows e VoiceOver no macOS.',
                icon: '🔊',
              },
            ].map((resource) => (
              <div key={resource.title} className="card-base">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl" role="img" aria-label={resource.title}>
                    {resource.icon}
                  </span>
                  <h3 className="font-body font-semibold text-[var(--color-text-primary)] text-base">
                    {resource.title}
                  </h3>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">{resource.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reporte de barreiras */}
        <section aria-labelledby="report-heading" className="mb-10">
          <h2 id="report-heading" className="text-[var(--color-text-primary)] mb-4">
            Reportar Barreiras de Acessibilidade
          </h2>
          <div className="card-base">
            <p className="text-[var(--color-text-secondary)] mb-4">
              Se você encontrou alguma barreira de acessibilidade neste portfólio,
              por favor entre em contato. Seu feedback é importante para melhorar
              continuamente a acessibilidade do site.
            </p>
            <a
              href="mailto:brunos.ss2002@gmail.com?subject=Barreira de Acessibilidade - Portfólio Bruno Santos"
              aria-label="Reportar por e-mail — Enviar e-mail para relatar barreira de acessibilidade"
              className="btn-primary inline-flex"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Reportar por e-mail
            </a>
          </div>
        </section>

        {/* Data da avaliação */}
        <section aria-labelledby="eval-heading">
          <h2 id="eval-heading" className="text-[var(--color-text-primary)] mb-4">
            Avaliação de Conformidade
          </h2>
          <div className="card-base">
            <dl className="flex flex-col gap-3">
              <div className="flex gap-4">
                <dt className="text-[var(--color-text-tertiary)] text-sm w-40 shrink-0">
                  Padrão
                </dt>
                <dd className="text-[var(--color-text-secondary)] text-sm">
                  eMAG 3.1 · WCAG 2.0 nível AA
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-[var(--color-text-tertiary)] text-sm w-40 shrink-0">
                  Ferramentas usadas
                </dt>
                <dd className="text-[var(--color-text-secondary)] text-sm">
                  Google Lighthouse · ASES Online (DGE) · NVDA
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-[var(--color-text-tertiary)] text-sm w-40 shrink-0">
                  Última avaliação
                </dt>
                <dd className="text-[var(--color-text-secondary)] text-sm">
                  <time dateTime="2026-06-19">Junho de 2026</time>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-[var(--color-text-tertiary)] text-sm w-40 shrink-0">
                  Responsável
                </dt>
                <dd className="text-[var(--color-text-secondary)] text-sm">
                  Bruno da Silva dos Santos
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Voltar */}
        <div className="mt-12">
          <a
            href="/"
            className="btn-secondary inline-flex"
            aria-label="Voltar ao portfólio — Ir para a página inicial"
          >
            ← Voltar ao portfólio
          </a>
        </div>
      </main>
    </div>
  )
}
