// Runs after `vite build` and `vite build --ssr` (see package.json): renders the
// app to HTML and writes it into dist/index.html. See src/entry-server.tsx.
import { readFile, rm, writeFile } from 'node:fs/promises'

const ssrDir = new URL('../dist-ssr/', import.meta.url)
const page = new URL('../dist/index.html', import.meta.url)
const placeholder = '<div id="root"></div>'

const { render } = await import(new URL('entry-server.js', ssrDir).href)
const html = await readFile(page, 'utf8')

if (!html.includes(placeholder)) {
  throw new Error(`prerender: ${placeholder} not found in dist/index.html`)
}

// A replacer function, not a string: a string replacement would treat any `$&`
// or `$1` in the rendered markup as a pattern.
await writeFile(page, html.replace(placeholder, () => `<div id="root">${render()}</div>`))
await rm(ssrDir, { recursive: true, force: true })

console.log('prerender: wrote dist/index.html')
