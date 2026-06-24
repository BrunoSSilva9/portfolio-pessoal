import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary:  'var(--color-bg-tertiary)',
        },
        gold: {
          DEFAULT: 'var(--color-gold)',
          dim:     'var(--color-gold-dim)',
        },
        purple: {
          magic:     'var(--color-purple)',
          'magic-dim': 'var(--color-purple-dim)',
        },
        emerald: {
          magic:     'var(--color-emerald)',
          'magic-dim': 'var(--color-emerald-dim)',
        },
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary:  'var(--color-text-tertiary)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          accent:  'var(--color-border-accent)',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body:    ['Inter', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        'glow-gold':   'var(--glow-gold)',
        'glow-purple': 'var(--glow-purple)',
      },
      backgroundImage: {
        'gradient-radial-magic':
          'radial-gradient(ellipse at center, rgba(127,119,221,0.15) 0%, rgba(10,11,15,0) 70%)',
        'gradient-gold':
          'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dim) 100%)',
        'gradient-purple':
          'linear-gradient(135deg, var(--color-purple) 0%, var(--color-purple-dim) 100%)',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse_slow: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
        scroll_bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(6px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'fade-in-up':    'fadeInUp 0.6s ease-out both',
        'pulse-slow':    'pulse_slow 3s ease-in-out infinite',
        'scroll-bounce': 'scroll_bounce 1.5s ease-in-out infinite',
        shimmer:         'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
