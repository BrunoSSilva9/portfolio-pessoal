// =============================================================================
// dateUtils — Utilitários de formatação de datas para Experiência Profissional
// =============================================================================

const MONTHS_PT: Record<number, string> = {
  0:  'Jan', 1:  'Fev', 2:  'Mar', 3:  'Abr',
  4:  'Mai', 5:  'Jun', 6:  'Jul', 7:  'Ago',
  8:  'Set', 9:  'Out', 10: 'Nov', 11: 'Dez',
}

/**
 * Converte "YYYY-MM" em objeto { year, month (0-indexed) }
 */
function parseYearMonth(dateStr: string): { year: number; month: number } {
  const [y, m] = dateStr.split('-').map(Number)
  return { year: y, month: m - 1 }
}

/**
 * Calcula o total de meses entre startDate e endDate (ou hoje).
 */
function diffInMonths(startDate: string, endDate: string | null): number {
  const start = parseYearMonth(startDate)
  const end = endDate
    ? parseYearMonth(endDate)
    : { year: new Date().getFullYear(), month: new Date().getMonth() }

  return (end.year - start.year) * 12 + (end.month - start.month)
}

/**
 * Formata a duração entre dois períodos em pt-BR.
 * Ex.: "1 ano 3 meses", "8 meses", "2 anos"
 */
export function formatDuration(startDate: string, endDate: string | null): string {
  const totalMonths = Math.max(0, diffInMonths(startDate, endDate))
  const years  = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const parts: string[] = []
  if (years > 0)  parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`)
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mês' : 'meses'}`)
  if (parts.length === 0) parts.push('menos de 1 mês')

  return parts.join(' ')
}

/**
 * Formata o intervalo de datas como "Mar 2024 — Dez 2024" ou "Jan 2025 — presente".
 */
export function formatDateRange(startDate: string, endDate: string | null): string {
  const start = parseYearMonth(startDate)
  const startLabel = `${MONTHS_PT[start.month]} ${start.year}`

  if (!endDate) return `${startLabel} — presente`

  const end = parseYearMonth(endDate)
  const endLabel = `${MONTHS_PT[end.month]} ${end.year}`
  return `${startLabel} — ${endLabel}`
}

/**
 * Retorna o atributo dateTime semântico ("YYYY-MM") de startDate.
 */
export function toDateTimeAttr(dateStr: string): string {
  return dateStr // já está em "YYYY-MM"
}
