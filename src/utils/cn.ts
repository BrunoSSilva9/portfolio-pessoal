import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina classes Tailwind CSS de forma inteligente,
 * resolvendo conflitos e condicionais com clsx + tailwind-merge.
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-gold', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
