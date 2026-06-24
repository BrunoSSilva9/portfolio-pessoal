import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import './styles/accessibility.css'
import App from './App'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Elemento #root não encontrado no DOM.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
