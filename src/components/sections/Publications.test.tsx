import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Publications from './Publications'

describe('Publications', () => {
  it('renders publications section', () => {
    render(<Publications />)
    expect(screen.getByText(/Publicações/i)).toBeInTheDocument()
  })
})
