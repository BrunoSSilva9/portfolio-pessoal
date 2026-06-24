import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SkillBar } from './SkillBar'

describe('SkillBar', () => {
  it('renders skill name and progress', () => {
    const mockSkill = { name: 'React', percent: 90, icon: '', color: '', level: 'Avançado' as any, category: 'Frontend' as any }
    render(<SkillBar skill={mockSkill} delay={0} />)
    expect(screen.getByRole('progressbar', { name: /React/i })).toBeInTheDocument()
  })
})
