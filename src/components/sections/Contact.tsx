// =============================================================================
// Seção Contact — "Convocar o Mago"
// eMAG: Seção 6 completa (8 recomendações de formulários)
// Fase 2: formulário polido + dados reais de contato
// =============================================================================

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'
import { SectionReveal } from '@/components/ui/SectionReveal'

interface FormData {
  name: string
  email: string
  message: string
}
interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validate(data: FormData): FormErrors {
  const e: FormErrors = {}
  if (!data.name.trim() || data.name.trim().length < 2)
    e.name = 'Informe seu nome (mínimo 2 caracteres).'
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    e.email = 'Informe um e-mail válido.'
  if (!data.message.trim() || data.message.trim().length < 10)
    e.message = 'A mensagem precisa ter pelo menos 10 caracteres.'
  return e
}

// ── Links de contato ─────────────────────────────────────────────────────────
const contactLinks = [
  {
    id: 'contact-link-email',
    href: 'mailto:brunos.ss2002@gmail.com',
    label: 'brunos.ss2002@gmail.com — Enviar e-mail',
    display: 'brunos.ss2002@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: 'contact-link-github',
    href: 'https://github.com/BrunoSSilva9',
    label: 'github.com/BrunoSSilva9 — Ver perfil de Bruno Santos no GitHub (abre em nova aba)',
    display: 'github.com/BrunoSSilva9',
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 'contact-link-linkedin',
    href: 'https://www.linkedin.com/in/bruno-silva-530726274',
    label: 'linkedin.com/in/bruno-silva-... — Ver perfil de Bruno Santos no LinkedIn (abre em nova aba)',
    display: 'linkedin.com/in/bruno-silva-...',
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(formData)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Move foco para o primeiro campo inválido — eMAG rec. 6.7
      if (errs.name) nameRef.current?.focus()
      else if (errs.email) emailRef.current?.focus()
      else if (errs.message) messageRef.current?.focus()
      return
    }

    setSubmitting(true)
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'YOUR_TEMPLATE_ID',
        formRef.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? 'YOUR_PUBLIC_KEY'
      )
      if (feedbackRef.current)
        feedbackRef.current.textContent =
          'Mensagem enviada com sucesso! Bruno responderá em breve.'
      toast.success('Mensagem enviada! ✨')
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    } catch {
      if (feedbackRef.current)
        feedbackRef.current.textContent =
          'Erro ao enviar mensagem. Tente pelo e-mail direto.'
      toast.error('Erro ao enviar. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  // Estilo de campo base
  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.625rem',
    border: `1px solid ${hasError ? 'var(--color-error, #ef4444)' : 'var(--color-border)'}`,
    background: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9375rem',
    outline: 'none',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
  })

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      <div className="section-container">
        <SectionReveal>
          {/* Cabeçalho */}
          <p className="section-label mb-4">Seção 08</p>
          <h2
            id="contact-heading"
            className="font-display"
            style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}
          >
            Convocar o Mago
          </h2>
          <div className="magic-divider mb-12" aria-hidden="true" />
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Lado esquerdo: apresentação + links ─────────────────────── */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p
                className="font-body"
                style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}
              >
                Pronto para iniciar uma nova quest? Se você tem um projeto interessante,
                uma oportunidade de estágio ou simplesmente quer trocar
                uma ideia sobre tecnologia, estou disponível.
              </p>
              <p
                className="font-body"
                style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}
              >
                Respondo em até{' '}
                <strong style={{ color: 'var(--color-text-primary)' }}>24 horas</strong>{' '}
                durante a semana. Sem cerimônia — pode mandar mensagem direta.
              </p>
            </div>

            {/* Links de contato */}
            <nav aria-label="Meios de contato direto">
              <ul className="flex flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {contactLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      id={link.id}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      aria-label={link.label}
                      className="group flex items-center gap-4 rounded-xl p-4 transition-all"
                      style={{
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget
                        el.style.borderColor = 'var(--color-border-accent)'
                        el.style.color = 'var(--color-text-primary)'
                        el.style.boxShadow = 'var(--glow-purple)'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget
                        el.style.borderColor = 'var(--color-border)'
                        el.style.color = 'var(--color-text-secondary)'
                        el.style.boxShadow = 'none'
                      }}
                    >
                      <div
                        className="flex items-center justify-center rounded-lg shrink-0"
                        style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          background: 'var(--color-bg-tertiary)',
                          color: 'var(--color-text-secondary)',
                          transition: 'color 150ms',
                        }}
                      >
                        {link.icon}
                      </div>
                      <span className="font-body font-medium" style={{ fontSize: '0.9375rem' }}>
                        {link.display}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Formulário acessível — eMAG Seção 6 ─────────────────────── */}
          <div>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              aria-labelledby="contact-heading"
              aria-describedby="form-instructions"
              className="flex flex-col gap-5"
            >
              {/* Instrução geral — eMAG rec. 6.2 */}
              <p
                id="form-instructions"
                className="font-body"
                style={{ color: 'var(--color-text-tertiary)', fontSize: '0.8125rem' }}
              >
                Campos marcados com{' '}
                <abbr title="obrigatório" aria-label="obrigatório">*</abbr>{' '}
                são obrigatórios.
              </p>

              <fieldset style={{ border: 'none', padding: 0, margin: 0 }} className="flex flex-col gap-5">
                <legend className="sr-only">Dados para contato</legend>

                {/* Nome */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="font-body font-semibold"
                    style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem' }}
                  >
                    Nome{' '}
                    <abbr title="obrigatório" aria-label="campo obrigatório" style={{ textDecoration: 'none', color: 'var(--color-gold)' }}>
                      *
                    </abbr>
                  </label>
                  <input
                    ref={nameRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    aria-required="true"
                    aria-describedby="name-error"
                    aria-invalid={errors.name ? 'true' : undefined}
                    placeholder="Seu nome"
                    style={inputStyle(!!errors.name)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-purple)'
                      e.currentTarget.style.boxShadow = 'var(--glow-purple)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.name ? 'var(--color-error, #ef4444)' : 'var(--color-border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <span
                    id="name-error"
                    role="alert"
                    aria-live="polite"
                    className="font-body"
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-error, #ef4444)',
                      minHeight: '1.25rem',
                    }}
                  >
                    {errors.name ?? ''}
                  </span>
                </div>

                {/* E-mail */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className="font-body font-semibold"
                    style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem' }}
                  >
                    E-mail{' '}
                    <abbr title="obrigatório" aria-label="campo obrigatório" style={{ textDecoration: 'none', color: 'var(--color-gold)' }}>
                      *
                    </abbr>
                  </label>
                  <input
                    ref={emailRef}
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-required="true"
                    aria-describedby="email-error"
                    aria-invalid={errors.email ? 'true' : undefined}
                    placeholder="seu@email.com"
                    style={inputStyle(!!errors.email)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-purple)'
                      e.currentTarget.style.boxShadow = 'var(--glow-purple)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.email ? 'var(--color-error, #ef4444)' : 'var(--color-border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <span
                    id="email-error"
                    role="alert"
                    aria-live="polite"
                    className="font-body"
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-error, #ef4444)',
                      minHeight: '1.25rem',
                    }}
                  >
                    {errors.email ?? ''}
                  </span>
                </div>

                {/* Mensagem */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="font-body font-semibold"
                    style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem' }}
                  >
                    Mensagem{' '}
                    <abbr title="obrigatório" aria-label="campo obrigatório" style={{ textDecoration: 'none', color: 'var(--color-gold)' }}>
                      *
                    </abbr>
                  </label>
                  <textarea
                    ref={messageRef}
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    aria-required="true"
                    aria-describedby="message-error"
                    aria-invalid={errors.message ? 'true' : undefined}
                    placeholder="Olá Bruno, tenho uma proposta / pergunta / ideia..."
                    style={{
                      ...inputStyle(!!errors.message),
                      resize: 'vertical',
                      minHeight: '120px',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-purple)'
                      e.currentTarget.style.boxShadow = 'var(--glow-purple)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = errors.message ? 'var(--color-error, #ef4444)' : 'var(--color-border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <span
                    id="message-error"
                    role="alert"
                    aria-live="polite"
                    className="font-body"
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-error, #ef4444)',
                      minHeight: '1.25rem',
                    }}
                  >
                    {errors.message ?? ''}
                  </span>
                </div>
              </fieldset>

              {/* Botão de envio */}
              <button
                id="btn-send-message"
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="btn-primary w-full justify-center"
                style={{ marginTop: '0.5rem' }}
              >
                {submitting ? (
                  <>
                    <span
                      className="rounded-full border-2 border-transparent border-t-current animate-spin"
                      style={{ width: '1rem', height: '1rem' }}
                      aria-hidden="true"
                    />
                    Enviando…
                  </>
                ) : (
                  <>
                    Enviar mensagem
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>

              {/* Feedback para leitores de tela — aria-live="assertive" */}
              <div
                ref={feedbackRef}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                id="form-feedback"
                className="sr-only"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
