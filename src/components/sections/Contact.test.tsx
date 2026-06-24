import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Contact from './Contact'

describe('Contact', () => {
  it('renders contact section', () => {
    render(<Contact />)
    expect(screen.getByText(/Contato/i)).toBeInTheDocument()
  })
})
