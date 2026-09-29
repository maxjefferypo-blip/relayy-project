import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

/**
 * Build-time render of the page to static HTML, written into dist/index.html by
 * scripts/prerender.mjs. Crawlers that don't run JavaScript (most AI crawlers,
 * link-preview bots, Bing at times) otherwise see an empty <div id="root">.
 * main.tsx then hydrates it rather than rendering from scratch.
 */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
