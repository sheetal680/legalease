// Receives rendered PDFs from the browser harness and writes them to disk.
//
//   node scripts/blankFormsCollector.js
//
// The PDFs have to be produced in a browser: the renderer in the lawyer app
// (src/lib/documentExport.js) parses HTML with DOMParser and loads the
// embedded Noto Sans Telugu face as an ES module. Reimplementing either in
// Node would mean a second renderer that drifts from the live one — the exact
// thing this exercise is meant to check. So the real renderer runs where it
// normally runs, and this just catches the bytes.

import { createServer } from 'http'
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs'
import { join } from 'path'

const OUT = 'D:/CHACHI/LegalEase/blank-forms'
const PORT = 8099

if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true })
mkdirSync(join(OUT, 'forms'), { recursive: true })

let written = 0
const manifest = []

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return }

  const chunks = []
  req.on('data', c => chunks.push(c))
  req.on('end', () => {
    const body = Buffer.concat(chunks)
    const url = new URL(req.url, 'http://localhost')

    if (url.pathname === '/pdf') {
      const file = url.searchParams.get('file')
      writeFileSync(join(OUT, 'forms', file), body)
      written++
      console.log(`  [${String(written).padStart(2)}] ${file}  ${(body.length / 1024).toFixed(0)} KB`)
      res.writeHead(200); res.end('ok'); return
    }

    if (url.pathname === '/manifest') {
      // Replace by index rather than append: the harness page can be loaded
      // more than once against the same collector, and appending would leave
      // a manifest with every template in it twice.
      for (const entry of JSON.parse(body.toString('utf8'))) {
        const at = manifest.findIndex(m => m.index === entry.index)
        if (at >= 0) manifest[at] = entry; else manifest.push(entry)
      }
      manifest.sort((a, b) => a.index - b.index)
      writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 1))
      console.log(`\nManifest received: ${manifest.length} templates`)
      res.writeHead(200); res.end('ok'); return
    }

    if (url.pathname === '/done') {
      res.writeHead(200); res.end('ok')
      console.log(`\nCollector finished. ${written} PDF(s) in ${OUT}/forms`)
      setTimeout(() => server.close(() => process.exit(0)), 200)
      return
    }

    res.writeHead(404); res.end('no')
  })
})

server.listen(PORT, () => console.log(`Collector listening on :${PORT}, writing to ${OUT}\n`))
