import { render, screen, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders main layout components', async () => {
    await act(async () => {
      render(<App />)
    })
    expect(screen.getByRole('navigation', { name: /navegação principal/i })).toBeInTheDocument()
  })
})
