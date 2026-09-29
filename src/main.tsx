import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The production build is prerendered (src/entry-server.tsx), so take over that
// HTML. The dev server serves an empty root, so render from scratch there.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
