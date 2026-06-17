import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import {
  Document, Packer,
  Paragraph, TextRun,
  Header, Footer,
  PageNumber, NumberFormat,
  AlignmentType, HeadingLevel,
  BorderStyle, Table, TableRow, TableCell, WidthType,
  convertInchesToTwip,
} from 'docx'
import { format } from 'date-fns'

// ─── Shared constants ─────────────────────────────────────────────────────────

const A4_W_MM  = 210
const A4_H_MM  = 297
const MARGIN   = 20   // mm on each side

// ─── PDF Export ───────────────────────────────────────────────────────────────

/**
 * Approximate conversion of an oklch() string to a safe hex color.
 *
 * html2canvas cannot parse oklch() (Tailwind v4 uses oklch extensively).
 * We approximate based on the lightness channel only — good enough for
 * legal document content which is mostly black text on white.
 */
function oklchToHex(oklchStr) {
  const m = oklchStr.match(/oklch\(\s*([\d.]+)(%?)\s/)
  if (!m) return '#1a1a1a'
  const raw = parseFloat(m[1])
  // lightness is 0–1 or 0–100
  const L = m[2] === '%' ? raw / 100 : raw
  if (L >= 0.92) return '#ffffff'
  if (L >= 0.75) return '#f8f9fa'
  if (L >= 0.55) return '#9ca3af'
  if (L >= 0.35) return '#374151'
  return '#1a1a1a'
}

/**
 * Walk an element tree and temporarily inline safe hex values wherever a
 * computed color property resolves to oklch(), which html2canvas cannot parse.
 * Returns a restore function.
 */
function patchOklchColors(root) {
  const patches = []

  function walk(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return

    const cs = window.getComputedStyle(el)
    const propsToCheck = ['color', 'backgroundColor', 'borderTopColor',
                          'borderRightColor', 'borderBottomColor', 'borderLeftColor']

    propsToCheck.forEach(prop => {
      const val = cs[prop]
      if (val && val.startsWith('oklch')) {
        const saved = el.style[prop]
        el.style[prop] = oklchToHex(val)
        patches.push(() => { el.style[prop] = saved })
      }
    })

    // Also fix any inline style that directly contains oklch
    const inlineStyle = el.getAttribute('style') || ''
    if (inlineStyle.includes('oklch')) {
      const fixed = inlineStyle.replace(/oklch\([^)]+\)/g, '#1a1a1a')
      el.setAttribute('style', fixed)
      patches.push(() => { el.setAttribute('style', inlineStyle) })
    }

    Array.from(el.children).forEach(walk)
  }

  walk(root)
  return () => patches.forEach(fn => fn())
}

/**
 * Temporarily strip highlight classes from an element so they don't
 * appear as coloured boxes in the PDF screenshot.
 */
function stripHighlights(root) {
  const spans = root.querySelectorAll('.autofill-field, .manual-field')
  const originals = []
  spans.forEach(el => {
    originals.push({ el, cls: el.className, style: el.getAttribute('style') || '' })
    el.className = ''
    el.removeAttribute('style')
  })
  return () => {
    originals.forEach(({ el, cls, style }) => {
      el.className = cls
      if (style) el.setAttribute('style', style)
      else el.removeAttribute('style')
    })
  }
}

/**
 * Load an image URL and return an HTMLImageElement (handles cross-origin).
 */
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload  = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
    img.src = url
  })
}

/**
 * Draw the letterhead block onto a jsPDF instance.
 * Returns the Y position (mm) after the last drawn element.
 */
async function drawLetterhead(pdf, profile) {
  const leftX   = MARGIN
  const rightX  = A4_W_MM - MARGIN
  const centerX = A4_W_MM / 2
  let   y       = MARGIN

  // Lawyer name (large bold)
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(16)
  pdf.setTextColor(30, 58, 95)          // #1e3a5f
  pdf.text(profile.full_name || 'Advocate', centerX, y, { align: 'center' })
  y += 7

  // Designation + firm
  if (profile.designation || profile.firm_name) {
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    pdf.setTextColor(80, 80, 80)
    const line2 = [profile.designation, profile.firm_name].filter(Boolean).join('  ·  ')
    pdf.text(line2, centerX, y, { align: 'center' })
    y += 5
  }

  // Bar number
  if (profile.bar_number) {
    pdf.setFont('helvetica', 'italic')
    pdf.setFontSize(8)
    pdf.setTextColor(120, 120, 120)
    pdf.text(`Bar Council Enrolment No.: ${profile.bar_number}`, centerX, y, { align: 'center' })
    y += 5
  }

  // Contact line
  const contactParts = [
    profile.phone ? `✆ ${profile.phone}` : null,
    profile.email ? `✉ ${profile.email}` : null,
  ].filter(Boolean)
  if (contactParts.length) {
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(80, 80, 80)
    pdf.text(contactParts.join('   '), centerX, y, { align: 'center' })
    y += 4
  }

  // Address
  const addrParts = [
    profile.address_line1,
    profile.address_line2,
    [profile.city, profile.state, profile.pin_code].filter(Boolean).join(', '),
  ].filter(Boolean)
  if (addrParts.length) {
    pdf.setFontSize(7.5)
    pdf.setTextColor(120, 120, 120)
    addrParts.forEach(line => {
      pdf.text(line, centerX, y, { align: 'center' })
      y += 4
    })
  }

  y += 2

  // Gold divider
  pdf.setDrawColor(201, 168, 76)        // #c9a84c
  pdf.setLineWidth(0.6)
  pdf.line(leftX, y, rightX, y)
  y += 1

  // Thin navy underline
  pdf.setDrawColor(30, 58, 95)
  pdf.setLineWidth(0.2)
  pdf.line(leftX, y, rightX, y)
  y += 6

  return y
}

/**
 * Append a signature image at the bottom of the last page.
 */
async function appendSignature(pdf, signatureUrl) {
  try {
    const img    = await loadImage(signatureUrl)
    const sigH   = 20
    const maxW   = 60
    const aspect = img.naturalWidth / img.naturalHeight
    const sigW   = Math.min(maxW, sigH * aspect)
    const sigY   = A4_H_MM - MARGIN - sigH - 8
    const sigX   = MARGIN

    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(80, 80, 80)
    pdf.text('Authorised Signature:', sigX, sigY - 3)

    const canvas  = document.createElement('canvas')
    canvas.width  = img.naturalWidth
    canvas.height = img.naturalHeight
    canvas.getContext('2d').drawImage(img, 0, 0)
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', sigX, sigY, sigW, sigH)
  } catch {
    // Signature load failed silently — don't block export
  }
}

/**
 * Export the editor DOM element to a multi-page A4 PDF with a letterhead.
 *
 * @param {HTMLElement} editorElement  The white editor container div
 * @param {string}      documentTitle  Document file name (without extension)
 * @param {object}      lawyerProfile  lawyer_profiles row
 */
export async function exportToPDF(editorElement, documentTitle, lawyerProfile) {
  if (!editorElement) throw new Error('Editor element not found')

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  // Draw letterhead and get the Y offset where body content starts
  const bodyStartY = await drawLetterhead(pdf, lawyerProfile)

  // Strip highlight colours and patch oklch before screenshotting.
  // html2canvas cannot parse oklch() (used by Tailwind v4), so we
  // temporarily inline safe hex equivalents derived from computed styles.
  const restoreHighlights = stripHighlights(editorElement)
  const restoreOklch      = patchOklchColors(editorElement)

  let canvas
  try {
    canvas = await html2canvas(editorElement, {
      scale:           2,
      useCORS:         true,
      allowTaint:      true,
      backgroundColor: '#ffffff',
      logging:         false,
      removeContainer: true,
    })
  } finally {
    restoreOklch()
    restoreHighlights()
  }

  // Available body height on the first page (below letterhead) and subsequent pages
  const pageW      = A4_W_MM
  const bodyW      = pageW - MARGIN * 2
  const firstBodyH = A4_H_MM - bodyStartY - MARGIN
  const fullBodyH  = A4_H_MM - MARGIN * 2

  // Scale canvas to fit the content width
  const scale      = bodyW / (canvas.width / 2)
  const totalImgH  = (canvas.height / 2) * scale
  const pxPerMm    = (canvas.width / 2) / bodyW

  let remainingMm = totalImgH
  let srcYPx      = 0
  let isFirstPage = true

  while (remainingMm > 0) {
    const sliceHMm = isFirstPage ? firstBodyH : fullBodyH
    const destYMm  = isFirstPage ? bodyStartY : MARGIN
    const sliceHPx = Math.round(sliceHMm * pxPerMm)
    const actualPx = Math.min(sliceHPx, canvas.height - srcYPx)

    if (actualPx <= 0) break

    const slice = document.createElement('canvas')
    slice.width  = canvas.width
    slice.height = actualPx
    slice.getContext('2d').drawImage(canvas, 0, srcYPx, canvas.width, actualPx, 0, 0, canvas.width, actualPx)

    pdf.addImage(slice.toDataURL('image/png'), 'PNG', MARGIN, destYMm, bodyW, (actualPx / pxPerMm))

    srcYPx      += actualPx
    remainingMm -= sliceHMm

    if (remainingMm > 0) {
      pdf.addPage()
      isFirstPage = false
    }
  }

  // Append signature on the last page if available
  if (lawyerProfile?.signature_url) {
    await appendSignature(pdf, lawyerProfile.signature_url)
  }

  // Page numbers
  const totalPages = pdf.internal.getNumberOfPages()
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(7)
  pdf.setTextColor(160, 160, 160)
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i)
    pdf.text(
      `Page ${i} of ${totalPages}`,
      A4_W_MM / 2,
      A4_H_MM - MARGIN / 2,
      { align: 'center' },
    )
  }

  const fileName = (documentTitle || 'document').replace(/[^a-zA-Z0-9 _-]/g, '').trim() || 'document'
  pdf.save(`${fileName}.pdf`)
}

// ─── Word Export ──────────────────────────────────────────────────────────────

function nodeToRuns(node, inherited = {}) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent
    if (!text) return []
    return [new TextRun({ text, ...inherited })]
  }

  const tag  = node.tagName?.toLowerCase()
  const next = { ...inherited }

  if (tag === 'strong' || tag === 'b') next.bold    = true
  if (tag === 'em'     || tag === 'i') next.italics = true
  if (tag === 'u')                     next.underline = { type: 'single' }
  if (tag === 'br')                    return [new TextRun({ ...next, break: 1 })]
  if (!tag)                            return []

  return [...node.childNodes].flatMap(child => nodeToRuns(child, next))
}

function blockToParagraph(el) {
  const tag = el.tagName?.toLowerCase()
  if (!tag) return null

  const HEADING_MAP = {
    h1: HeadingLevel.HEADING_1,
    h2: HeadingLevel.HEADING_2,
    h3: HeadingLevel.HEADING_3,
    h4: HeadingLevel.HEADING_4,
  }

  const alignStr = el.style?.textAlign || el.getAttribute?.('data-text-align') || ''
  const alignment = alignStr === 'center' ? AlignmentType.CENTER
                  : alignStr === 'right'  ? AlignmentType.RIGHT
                  : alignStr === 'justify'? AlignmentType.JUSTIFIED
                  : AlignmentType.LEFT

  if (tag === 'p' || HEADING_MAP[tag]) {
    const runs = [...el.childNodes].flatMap(n => nodeToRuns(n))
    return new Paragraph({
      children:  runs.length ? runs : [new TextRun('')],
      heading:   HEADING_MAP[tag],
      alignment,
      spacing:   { after: 120 },
    })
  }

  if (tag === 'ul' || tag === 'ol') {
    return [...el.querySelectorAll('li')].map((li) =>
      new Paragraph({
        children:  [new TextRun(li.textContent || '')],
        bullet:    tag === 'ul' ? { level: 0 } : undefined,
        numbering: tag === 'ol' ? { reference: 'default-numbering', level: 0 } : undefined,
        spacing:   { after: 80 },
      })
    )
  }

  return [...el.children].flatMap(child => {
    const result = blockToParagraph(child)
    return result ? (Array.isArray(result) ? result : [result]) : []
  })
}

function htmlToDocxParagraphs(html) {
  const parser = new DOMParser()
  const doc    = parser.parseFromString(html, 'text/html')
  const paras  = [...doc.body.children].flatMap(el => {
    const result = blockToParagraph(el)
    return result ? (Array.isArray(result) ? result : [result]) : []
  })
  return paras.length ? paras : [new Paragraph({ children: [new TextRun('')] })]
}

function buildWordHeader(profile) {
  const children = []

  children.push(new Paragraph({
    children: [new TextRun({
      text:  profile.full_name || 'Advocate',
      bold:  true,
      size:  28,
      color: '1e3a5f',
    })],
    alignment: AlignmentType.CENTER,
    spacing:   { after: 40 },
  }))

  const line2 = [profile.designation, profile.firm_name].filter(Boolean).join('  ·  ')
  if (line2) {
    children.push(new Paragraph({
      children: [new TextRun({ text: line2, size: 20, color: '444444' })],
      alignment: AlignmentType.CENTER,
      spacing:   { after: 40 },
    }))
  }

  if (profile.bar_number) {
    children.push(new Paragraph({
      children: [new TextRun({ text: `Bar Council Enrolment No.: ${profile.bar_number}`, size: 16, color: '888888', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing:   { after: 40 },
    }))
  }

  const contact = [
    profile.phone ? `✆ ${profile.phone}` : null,
    profile.email ? `✉ ${profile.email}` : null,
  ].filter(Boolean).join('    ')
  if (contact) {
    children.push(new Paragraph({
      children: [new TextRun({ text: contact, size: 16, color: '555555' })],
      alignment: AlignmentType.CENTER,
      spacing:   { after: 40 },
    }))
  }

  const addr = [
    profile.address_line1,
    profile.address_line2,
    [profile.city, profile.state, profile.pin_code].filter(Boolean).join(', '),
  ].filter(Boolean).join(', ')
  if (addr) {
    children.push(new Paragraph({
      children: [new TextRun({ text: addr, size: 14, color: '888888' })],
      alignment: AlignmentType.CENTER,
      spacing:   { after: 80 },
    }))
  }

  children.push(new Paragraph({
    children: [],
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: 'c9a84c' },
    },
    spacing: { after: 160 },
  }))

  return children
}

/**
 * Export document content to a .docx file with letterhead header + page footer.
 */
export async function exportToWord(html, documentTitle, lawyerProfile) {
  const bodyParagraphs  = htmlToDocxParagraphs(html)
  const letterheadParas = buildWordHeader(lawyerProfile)

  const footerParagraph = new Paragraph({
    children: [
      new TextRun({ text: 'Page ', size: 14, color: '888888' }),
      new TextRun({ children: [PageNumber.CURRENT], size: 14, color: '888888' }),
      new TextRun({ text: ' of ', size: 14, color: '888888' }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 14, color: '888888' }),
      new TextRun({ text: `    ·    Generated by LegalEase on ${format(new Date(), 'dd MMMM yyyy')}`, size: 14, color: 'aaaaaa' }),
    ],
    alignment: AlignmentType.CENTER,
  })

  const doc = new Document({
    creator:     lawyerProfile?.full_name || 'LegalEase',
    title:       documentTitle,
    description: `Generated by LegalEase — ${format(new Date(), 'dd MMMM yyyy')}`,
    numbering: {
      config: [{
        reference: 'default-numbering',
        levels: [{ level: 0, format: NumberFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT }],
      }],
    },
    sections: [{
      properties: {
        page: {
          margin: {
            top:    convertInchesToTwip(0.79),
            bottom: convertInchesToTwip(0.79),
            left:   convertInchesToTwip(0.79),
            right:  convertInchesToTwip(0.79),
          },
        },
      },
      headers: {
        default: new Header({ children: letterheadParas }),
      },
      footers: {
        default: new Footer({ children: [footerParagraph] }),
      },
      children: bodyParagraphs,
    }],
  })

  const blob   = await Packer.toBlob(doc)
  const url    = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href     = url
  anchor.download = `${(documentTitle || 'document').replace(/[^a-zA-Z0-9 _-]/g, '').trim() || 'document'}.docx`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
