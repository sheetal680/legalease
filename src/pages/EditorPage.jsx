import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { format, formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'
import { exportToPDF, exportToWord } from '../lib/exportDocument'
import {
  Bold, Italic, Underline as UnderlineIcon,
  AlignLeft, AlignCenter, AlignRight,
  CalendarDays, Type,
  Save, FileDown, ChevronLeft,
  PanelRightOpen, PanelRightClose,
  Loader2, CheckCircle2, Clock,
  FileText, X,
} from 'lucide-react'

import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'
import { fillTemplate } from '../lib/autofill'
import { templates as allTemplates } from '../templates/templateContent'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MANUAL_FIELD_LABELS = {
  CLIENT_NAME:      'Client Name',
  CLIENT_ADDRESS:   'Client Address',
  CASE_NUMBER:      'Case / FIR Number',
  COURT_NAME:       'Court Name',
  OPPOSING_PARTY:   'Opposing Party',
  CASE_DESCRIPTION: 'Case Description',
  AMOUNT:           'Amount (₹)',
  DATE_OF_HEARING:  'Date of Hearing',
}

function applyFieldValuesToHtml(html, fieldValues) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html')
  const root = doc.querySelector('div')

  Object.entries(fieldValues).forEach(([key, value]) => {
    root.querySelectorAll(`[data-field="${key}"]`).forEach(el => {
      if (value && value.trim()) {
        el.textContent = value
        el.className = 'autofill-field'
      } else {
        el.textContent = `[${key}]`
        el.className = 'manual-field'
      }
    })
  })

  return root.innerHTML
}

function detectRemainingFields(html) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const fields = new Set()
  doc.querySelectorAll('.manual-field[data-field]').forEach(el => {
    const key = el.getAttribute('data-field')
    if (key) fields.add(key)
  })
  return [...fields]
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function isValidUUID(str) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function ToolbarButton({ active, disabled, onClick, title, children }) {
  return (
    <button
      onMouseDown={e => { e.preventDefault(); onClick() }}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed ${
        active
          ? 'bg-[#1e3a5f] text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-[#1e3a5f]'
      }`}
    >
      {children}
    </button>
  )
}

function Separator() {
  return <div className="w-px h-5 bg-gray-200 mx-1 self-center" />
}

function Toolbar({ editor }) {
  if (!editor) return null

  function insertDate() {
    editor.chain().focus().insertContent(format(new Date(), 'dd MMMM yyyy')).run()
  }

  const wordCount = countWords(editor.getText())

  return (
    <div className="flex items-center flex-wrap gap-0.5 px-3 py-2 bg-white border-b border-gray-200 sticky top-0 z-10">

      <select
        value={
          editor.isActive('heading', { level: 1 }) ? 'h1'
          : editor.isActive('heading', { level: 2 }) ? 'h2'
          : editor.isActive('heading', { level: 3 }) ? 'h3'
          : 'p'
        }
        onChange={e => {
          const val = e.target.value
          if (val === 'p') editor.chain().focus().setParagraph().run()
          else editor.chain().focus().toggleHeading({ level: parseInt(val[1]) }).run()
        }}
        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 outline-none focus:border-[#1e3a5f] mr-1"
      >
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="p">Normal</option>
      </select>

      <Separator />

      <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
        <Bold className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
        <Italic className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
        <UnderlineIcon className="w-4 h-4" />
      </ToolbarButton>

      <Separator />

      <ToolbarButton active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Align Left">
        <AlignLeft className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Align Center">
        <AlignCenter className="w-4 h-4" />
      </ToolbarButton>
      <ToolbarButton active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Align Right">
        <AlignRight className="w-4 h-4" />
      </ToolbarButton>

      <Separator />

      <ToolbarButton active={false} onClick={insertDate} title="Insert today's date">
        <span className="flex items-center gap-1 text-xs font-medium px-0.5">
          <CalendarDays className="w-3.5 h-3.5" /> Date
        </span>
      </ToolbarButton>

      <div className="ml-auto flex items-center gap-1 text-xs text-gray-400 pr-1">
        <Type className="w-3.5 h-3.5" />
        {wordCount} word{wordCount !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

// ─── Manual fields sidebar ────────────────────────────────────────────────────

function FieldsSidebar({ fields, values, onChange, onClose }) {
  const remaining = fields.filter(f => !values[f]?.trim())

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200 overflow-y-auto">
      <div className="px-4 py-4 border-b border-gray-100 shrink-0 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-[#1e3a5f]">Fill in Details</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {remaining.length === 0
              ? 'All fields complete ✓'
              : `${remaining.length} field${remaining.length !== 1 ? 's' : ''} remaining`}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors shrink-0 mt-0.5"
            title="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {fields.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 px-4 py-10 text-center">
          <CheckCircle2 className="w-8 h-8 text-green-400 mb-2" />
          <p className="text-sm text-gray-400">No manual fields detected</p>
        </div>
      ) : (
        <div className="p-4 space-y-4 flex-1">
          {fields.map(key => {
            const label = MANUAL_FIELD_LABELS[key] || key.replace(/_/g, ' ')
            const isFilled = Boolean(values[key]?.trim())
            const isMultiline = key === 'CASE_DESCRIPTION' || key === 'CLIENT_ADDRESS'

            return (
              <div key={key}>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#1e3a5f] mb-1.5">
                  {isFilled
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    : <span className="w-3.5 h-3.5 rounded-full border-2 border-[#c9a84c] shrink-0" />}
                  {label}
                </label>
                {isMultiline ? (
                  <textarea
                    rows={3}
                    value={values[key] || ''}
                    onChange={e => onChange(key, e.target.value)}
                    placeholder={`Enter ${label.toLowerCase()}…`}
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none resize-none
                      focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
                  />
                ) : (
                  <input
                    type={key === 'DATE_OF_HEARING' ? 'date' : 'text'}
                    value={values[key] || ''}
                    onChange={e => onChange(key, e.target.value)}
                    placeholder={`Enter ${label.toLowerCase()}…`}
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg outline-none
                      focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
                  />
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Main EditorPage ──────────────────────────────────────────────────────────

export default function EditorPage() {
  const { documentId: docIdParam } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, profile } = useAuth()

  const templateId = searchParams.get('templateId')
  const isNew      = docIdParam === 'new'

  // ── Core state ──────────────────────────────────────────────────────────────
  const [title, setTitle]             = useState('Untitled Document')
  const [status, setStatus]           = useState('draft')
  const [savedDocId, setSavedDocId]   = useState(isNew ? null : docIdParam)
  const [saving, setSaving]           = useState(false)
  const [lastSavedAt, setLastSavedAt] = useState(null)
  const [isDirty, setIsDirty]         = useState(false)
  const [initialising, setInitialising] = useState(true)

  // editorReady: true only after TipTap's onCreate fires (view fully attached)
  const [editorReady, setEditorReady] = useState(false)

  const [sidebarOpen, setSidebarOpen]   = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  )
  const [manualFields, setManualFields] = useState([])
  const [fieldValues, setFieldValues]   = useState({})

  const [exportingPdf, setExportingPdf]   = useState(false)
  const [exportingWord, setExportingWord] = useState(false)

  // Page title
  useEffect(() => {
    document.title = `LegalEase — ${title || 'Editor'}`
  }, [title])

  // Warn before navigating away with unsaved changes
  useEffect(() => {
    const handler = (e) => {
      if (!isDirty) return
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [isDirty])

  const editorContainerRef = useRef(null)
  const autoSaveRef = useRef(null)

  // ── TipTap editor ────────────────────────────────────────────────────────────
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[calc(100vh-220px)] focus:outline-none p-10 font-serif leading-relaxed',
      },
    },
    onCreate: () => {
      setEditorReady(true)
    },
    onDestroy: () => {
      setEditorReady(false)
    },
    onUpdate: ({ editor: ed }) => {
      setIsDirty(true)
      const fields = detectRemainingFields(ed.getHTML())
      setManualFields(fields)
    },
  })

  // ── Load content — wait until editor is truly ready AND profile is loaded ────
  useEffect(() => {
    if (!editorReady || !editor || !profile) return

    let cancelled = false

    async function init() {
      setInitialising(true)
      try {
        if (!isNew && docIdParam) {
          const { data, error } = await supabase
            .from('documents')
            .select('*')
            .eq('id', docIdParam)
            .eq('user_id', user.id)
            .single()

          if (cancelled) return
          if (error || !data) throw new Error('Document not found')

          setTitle(data.title || 'Untitled Document')
          setStatus(data.status || 'draft')

          const content = data.content || '<p></p>'
          editor.commands.setContent(content, false)

          const savedFields = detectRemainingFields(content)
          setManualFields(savedFields)

        } else if (templateId) {
          const tmpl = allTemplates.find(t => t.id === templateId)
          if (!tmpl) throw new Error('Template not found')

          if (cancelled) return
          setTitle(tmpl.name)

          const filledHtml = fillTemplate(tmpl.content, profile)
          editor.commands.setContent(filledHtml, false)

          const fields = detectRemainingFields(filledHtml)
          setManualFields(fields)

        } else {
          editor.commands.setContent('<p></p>', false)
          setManualFields([])
        }
      } catch (err) {
        if (!cancelled) toast.error(err.message || 'Could not load document')
      } finally {
        if (!cancelled) {
          setInitialising(false)
          setIsDirty(false)
        }
      }
    }

    init()
    return () => { cancelled = true }
  }, [editorReady, profile]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sidebar field change → update editor spans ───────────────────────────────
  function handleFieldChange(key, value) {
    const newValues = { ...fieldValues, [key]: value }
    setFieldValues(newValues)

    if (!editor) return
    const currentHtml = editor.getHTML()
    const updatedHtml = applyFieldValuesToHtml(currentHtml, { [key]: value })
    editor.commands.setContent(updatedHtml, false)
    setIsDirty(true)
  }

  // ── Save ─────────────────────────────────────────────────────────────────────
  const save = useCallback(async (silent = false) => {
    if (!editor || !user) return

    if (!silent) setSaving(true)

    try {
      const content    = editor.getHTML()
      const clientName = fieldValues.CLIENT_NAME?.trim() || null

      const payload = {
        user_id:     user.id,
        template_id: templateId && isValidUUID(templateId) ? templateId : null,
        title:       title.trim() || 'Untitled Document',
        client_name: clientName,
        content,
        status,
        updated_at:  new Date().toISOString(),
      }

      if (savedDocId) {
        const { error } = await supabase
          .from('documents')
          .update(payload)
          .eq('id', savedDocId)
        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('documents')
          .insert({ ...payload, created_at: new Date().toISOString() })
          .select('id')
          .single()
        if (error) throw error
        setSavedDocId(data.id)
        window.history.replaceState({}, '', `/editor/${data.id}`)
      }

      setLastSavedAt(new Date())
      setIsDirty(false)
      if (!silent) toast.success('Document saved!')
    } catch (err) {
      if (!silent) toast.error(err.message || 'Save failed')
      else console.error('Auto-save failed:', err.message)
    } finally {
      if (!silent) setSaving(false)
    }
  }, [editor, user, title, status, templateId, savedDocId, fieldValues])

  // ── Auto-save every 60 seconds ───────────────────────────────────────────────
  useEffect(() => {
    autoSaveRef.current = setInterval(() => {
      if (isDirty) save(true)
    }, 60_000)
    return () => clearInterval(autoSaveRef.current)
  }, [isDirty, save])

  // ── Export PDF ───────────────────────────────────────────────────────────────
  async function handleExportPDF() {
    if (!editorContainerRef.current || !profile) return
    setExportingPdf(true)
    try {
      await exportToPDF(editorContainerRef.current, title, profile)
      setStatus('exported')
      toast.success('PDF downloaded!')
    } catch (err) {
      toast.error(err.message || 'PDF export failed')
      console.error('PDF export error:', err)
    } finally {
      setExportingPdf(false)
    }
  }

  // ── Export Word ──────────────────────────────────────────────────────────────
  async function handleExportWord() {
    if (!editor || !profile) return
    setExportingWord(true)
    try {
      await exportToWord(editor.getHTML(), title, profile)
      setStatus('exported')
      toast.success('Word document exported successfully')
    } catch (err) {
      toast.error(err.message || 'Word export failed')
      console.error(err)
    } finally {
      setExportingWord(false)
    }
  }

  // ── Back navigation ──────────────────────────────────────────────────────────
  function handleBack() {
    if (isDirty) {
      if (!window.confirm('You have unsaved changes. Leave without saving?')) return
    }
    navigate('/templates')
  }

  // ── Last saved display ───────────────────────────────────────────────────────
  function lastSavedLabel() {
    if (saving || !lastSavedAt) return null
    return formatDistanceToNow(lastSavedAt, { addSuffix: true })
  }

  // ── Loading state — show until editor is attached AND data is loaded ─────────
  if (!editorReady || initialising) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">
              {!editorReady ? 'Starting editor…' : 'Loading document…'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f9fa] overflow-hidden">

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <div className="shrink-0 bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-3 shadow-sm">

        <button
          onClick={handleBack}
          className="p-1.5 rounded-lg text-gray-400 hover:text-[#1e3a5f] hover:bg-gray-100 transition-colors shrink-0"
          title="Back to Templates"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={title}
          onChange={e => { setTitle(e.target.value); setIsDirty(true) }}
          className="flex-1 min-w-0 text-sm font-semibold text-[#1e3a5f] bg-transparent border-0 outline-none border-b-2 border-transparent hover:border-gray-200 focus:border-[#1e3a5f] py-0.5 transition-colors truncate"
          placeholder="Untitled Document"
        />

        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
            status === 'exported'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            {status === 'exported' ? <CheckCircle2 className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
            {status === 'exported' ? 'Exported' : 'Draft'}
          </span>

          <div className="flex items-center gap-1 text-xs text-gray-400 min-w-[120px]">
            {saving ? (
              <><Loader2 className="w-3 h-3 animate-spin" /> Saving…</>
            ) : lastSavedAt ? (
              <><Clock className="w-3 h-3" /> Saved {lastSavedLabel()}</>
            ) : isDirty ? (
              <span className="text-amber-500">Unsaved changes</span>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Save — only disabled while actively saving, never for isDirty */}
          <button
            onClick={() => save(false)}
            disabled={saving}
            className="flex items-center gap-1.5 bg-[#1e3a5f] hover:bg-[#142840] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{saving ? 'Saving…' : 'Save'}</span>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={exportingPdf}
            className="flex items-center gap-1.5 border-2 border-[#c9a84c] hover:bg-[#c9a84c]/10 disabled:opacity-50 text-[#a8882f] text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
            title="Export as PDF"
          >
            {exportingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">PDF</span>
          </button>

          <button
            onClick={handleExportWord}
            disabled={exportingWord}
            className="flex items-center gap-1.5 border-2 border-gray-200 hover:border-[#1e3a5f] hover:bg-[#1e3a5f]/5 disabled:opacity-50 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
            title="Export as Word (.docx)"
          >
            {exportingWord ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Word</span>
          </button>

          <button
            onClick={() => setSidebarOpen(p => !p)}
            className="p-2 rounded-lg text-gray-400 hover:text-[#1e3a5f] hover:bg-gray-100 transition-colors"
            title={sidebarOpen ? 'Hide panel' : 'Show fill-in panel'}
          >
            {sidebarOpen
              ? <PanelRightClose className="w-4 h-4" />
              : <PanelRightOpen className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── Editor + sidebar ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden relative">

        <div className="flex-1 flex flex-col overflow-hidden">
          <Toolbar editor={editor} />

          <div className="flex-1 overflow-y-auto bg-gray-300 px-2 sm:px-4 py-4 sm:py-6">
            <div
              ref={editorContainerRef}
              className="max-w-[210mm] mx-auto bg-white shadow-md min-h-[297mm]"
            >
              {editor && <EditorContent editor={editor} />}
            </div>
          </div>
        </div>

        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/40 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {sidebarOpen && (
          <div className="fixed md:relative inset-y-0 right-0 z-40 md:z-auto w-72 md:w-64 xl:w-72 shrink-0 overflow-hidden flex flex-col border-l border-gray-200 shadow-xl md:shadow-none">
            <FieldsSidebar
              fields={manualFields}
              values={fieldValues}
              onChange={handleFieldChange}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        )}

        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden fixed bottom-6 right-6 z-30 w-14 h-14 bg-[#c9a84c] hover:bg-[#a8882f] text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
            title="Fill in details"
          >
            <PanelRightOpen className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Footer — shrink-0 so it doesn't compress the editor area */}
      <Footer />
    </div>
  )
}
