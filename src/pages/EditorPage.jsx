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
  Loader2, CheckCircle2, Clock,
  FileText, Users, UserCircle, ChevronDown, X,
} from 'lucide-react'

import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'
import { fillTemplate } from '../lib/autofill'
import { templates as allTemplates } from '../templates/templateContent'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function replacePlaceholders(html, fieldMap) {
  let result = html
  Object.entries(fieldMap).forEach(([key, value]) => {
    if (!value) return
    const re = new RegExp(`\\[${key}\\]`, 'g')
    result = result.replace(re, value)
  })
  return result
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

// ─── ContextPanel ─────────────────────────────────────────────────────────────

function ContextPanel({ profile, userId, editor, selectedClient, setSelectedClient, mobileOpen, setMobileOpen }) {
  const [firmLawyers, setFirmLawyers]       = useState([])
  const [clients, setClients]               = useState([])
  const [selectedLawyer, setSelectedLawyer] = useState(null) // null = "Myself"
  const [lawyerOpen, setLawyerOpen]         = useState(false)
  const [clientOpen, setClientOpen]         = useState(false)
  const [clientSearch, setClientSearch]     = useState('')
  const lawyerRef = useRef(null)
  const clientRef = useRef(null)

  // Fetch firm lawyers and clients
  useEffect(() => {
    if (!userId) return
    supabase
      .from('firm_lawyers')
      .select('id, full_name, designation, phone, email, address, bar_council_number')
      .eq('firm_owner_id', userId)
      .then(({ data }) => setFirmLawyers(data || []))

    supabase
      .from('clients')
      .select('id, full_name, phone, address')
      .eq('firm_owner_id', userId)
      .order('full_name')
      .then(({ data }) => setClients(data || []))
  }, [userId])

  // Close dropdowns on outside click
  useEffect(() => {
    function onOutside(e) {
      if (lawyerRef.current && !lawyerRef.current.contains(e.target)) setLawyerOpen(false)
      if (clientRef.current && !clientRef.current.contains(e.target)) setClientOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  function lawyerFieldMap(lawyer) {
    if (!lawyer) {
      // Myself — use profile
      const addrParts = [profile?.address_line1, profile?.address_line2].filter(Boolean)
      const address = addrParts.length ? addrParts.join(', ') : (profile?.address || '')
      return {
        LAWYER_NAME:        profile?.full_name || '',
        LAWYER_FIRM:        profile?.firm_name || '',
        LAWYER_ADDRESS:     address,
        LAWYER_PHONE:       profile?.phone || '',
        LAWYER_EMAIL:       profile?.email || '',
        LAWYER_BAR_COUNCIL: profile?.bar_number || profile?.bar_council_number || '',
        FIRM_NAME:          profile?.firm_name || '',
        BAR_NUMBER:         profile?.bar_number || profile?.bar_council_number || '',
        CITY:               profile?.city || '',
        STATE:              profile?.state || '',
      }
    }
    return {
      LAWYER_NAME:        lawyer.full_name || '',
      LAWYER_FIRM:        profile?.firm_name || '',
      LAWYER_ADDRESS:     lawyer.address || '',
      LAWYER_PHONE:       lawyer.phone || '',
      LAWYER_EMAIL:       lawyer.email || '',
      LAWYER_BAR_COUNCIL: lawyer.bar_council_number || '',
      FIRM_NAME:          profile?.firm_name || '',
      BAR_NUMBER:         lawyer.bar_council_number || '',
      CITY:               profile?.city || '',
      STATE:              profile?.state || '',
    }
  }

  function applyLawyer(lawyer) {
    setSelectedLawyer(lawyer)
    setLawyerOpen(false)
    if (!editor) return
    const html = editor.getHTML()
    const updated = replacePlaceholders(html, lawyerFieldMap(lawyer))
    editor.commands.setContent(updated, false)
  }

  function applyClient(client) {
    setSelectedClient(client)
    setClientOpen(false)
    setClientSearch('')
    if (!editor || !client) return
    const html = editor.getHTML()
    const updated = replacePlaceholders(html, {
      CLIENT_NAME:    client.full_name || '',
      CLIENT_ADDRESS: client.address   || '',
    })
    editor.commands.setContent(updated, false)
  }

  const displayedLawyerName = selectedLawyer
    ? selectedLawyer.full_name
    : (profile?.full_name || 'Me')

  const filteredClients = clients.filter(c =>
    c.full_name.toLowerCase().includes(clientSearch.toLowerCase())
  )

  const panelContent = (
    <div className="flex flex-col h-full overflow-y-auto">

      {/* Mobile header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 lg:hidden">
        <span className="text-xs font-bold text-[#1e3a5f] uppercase tracking-wider">Context</span>
        <button onClick={() => setMobileOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-5 flex-1">

        {/* ── Lawyer section ── */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
            <UserCircle className="w-3 h-3" /> Lawyer
          </p>

          {/* Selected lawyer chip */}
          <div className="inline-flex items-center gap-1.5 bg-[#1e3a5f] text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-2 max-w-full">
            <span className="truncate">{displayedLawyerName}</span>
          </div>

          {/* Change lawyer dropdown */}
          <div ref={lawyerRef} className="relative">
            <button
              onClick={() => setLawyerOpen(p => !p)}
              className="w-full flex items-center justify-between gap-1 text-xs font-semibold text-[#1e3a5f] border-2 border-[#1e3a5f]/20 hover:border-[#1e3a5f] rounded-xl px-3 py-2 transition-colors bg-white"
            >
              Change Lawyer
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${lawyerOpen ? 'rotate-180' : ''}`} />
            </button>

            {lawyerOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                {/* Myself option */}
                <button
                  onClick={() => applyLawyer(null)}
                  className={`w-full text-left px-3 py-2.5 text-xs hover:bg-gray-50 transition-colors border-b border-gray-100 ${!selectedLawyer ? 'font-bold text-[#1e3a5f]' : 'text-gray-700'}`}
                >
                  <span className="font-semibold">Myself</span>
                  {profile?.full_name && <span className="text-gray-400 ml-1">— {profile.full_name}</span>}
                </button>

                {firmLawyers.length === 0 ? (
                  <p className="px-3 py-2.5 text-xs text-gray-400">No firm lawyers added yet.</p>
                ) : (
                  firmLawyers.map(fl => (
                    <button
                      key={fl.id}
                      onClick={() => applyLawyer(fl)}
                      className={`w-full text-left px-3 py-2.5 text-xs hover:bg-gray-50 transition-colors ${selectedLawyer?.id === fl.id ? 'font-bold text-[#1e3a5f]' : 'text-gray-700'}`}
                    >
                      <span className="font-semibold">{fl.full_name}</span>
                      {fl.designation && <span className="text-gray-400 block text-[10px]">{fl.designation}</span>}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* ── Client section ── */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
            <Users className="w-3 h-3" /> Client
          </p>

          {selectedClient ? (
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex-1 min-w-0 inline-flex items-center gap-1.5 bg-[#c9a84c] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="truncate">{selectedClient.full_name}</span>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-[10px] text-gray-400 hover:text-gray-600 shrink-0 underline"
                title="Clear client"
              >
                Clear
              </button>
            </div>
          ) : null}

          {clients.length === 0 ? (
            <p className="text-xs text-gray-400 leading-relaxed">
              No clients saved yet.{' '}
              <a href="/clients" className="text-[#1e3a5f] underline">Add clients</a>{' '}
              from the Clients page.
            </p>
          ) : (
            <div ref={clientRef} className="relative">
              <button
                onClick={() => setClientOpen(p => !p)}
                className="w-full flex items-center justify-between gap-1 text-xs font-semibold text-[#1e3a5f] border-2 border-[#1e3a5f]/20 hover:border-[#1e3a5f] rounded-xl px-3 py-2 transition-colors bg-white"
              >
                {selectedClient ? 'Change Client' : 'Select Client'}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${clientOpen ? 'rotate-180' : ''}`} />
              </button>

              {clientOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  {/* Search */}
                  <div className="p-2 border-b border-gray-100">
                    <input
                      type="text"
                      value={clientSearch}
                      onChange={e => setClientSearch(e.target.value)}
                      placeholder="Search clients…"
                      autoFocus
                      className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg outline-none focus:border-[#1e3a5f] transition-colors"
                    />
                  </div>

                  <div className="max-h-48 overflow-y-auto">
                    {filteredClients.length === 0 ? (
                      <p className="px-3 py-2.5 text-xs text-gray-400">No clients match.</p>
                    ) : (
                      filteredClients.map(c => (
                        <button
                          key={c.id}
                          onClick={() => applyClient(c)}
                          className={`w-full text-left px-3 py-2.5 text-xs hover:bg-gray-50 transition-colors ${selectedClient?.id === c.id ? 'font-bold text-[#1e3a5f]' : 'text-gray-700'}`}
                        >
                          <span className="font-semibold">{c.full_name}</span>
                          {c.phone && <span className="text-gray-400 block text-[10px]">{c.phone}</span>}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )

  return (
    <>
      {/* Desktop — always visible ≥1024px */}
      <div className="hidden lg:flex flex-col w-60 shrink-0 bg-white border-r border-gray-200 overflow-hidden">
        {panelContent}
      </div>

      {/* Mobile — slide-in overlay */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-30"
            onClick={() => setMobileOpen(false)}
          />
          <div className="lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl flex flex-col overflow-hidden">
            {panelContent}
          </div>
        </>
      )}
    </>
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

  const [editorReady, setEditorReady]   = useState(false)
  const [panelMobileOpen, setPanelMobileOpen] = useState(false)
  const [selectedClient, setSelectedClient]   = useState(null)

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
    onCreate: () => setEditorReady(true),
    onDestroy: () => setEditorReady(false),
    onUpdate: () => setIsDirty(true),
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
          editor.commands.setContent(data.content || '<p></p>', false)

        } else if (templateId) {
          const tmpl = allTemplates.find(t => t.id === templateId)
          if (!tmpl) throw new Error('Template not found')
          if (cancelled) return
          setTitle(tmpl.name)
          const filledHtml = fillTemplate(tmpl.content, profile, user?.email)
          editor.commands.setContent(filledHtml, false)

          // If a client was already selected, apply their placeholders too
          if (selectedClient) {
            const withClient = replacePlaceholders(filledHtml, {
              CLIENT_NAME:    selectedClient.full_name || '',
              CLIENT_ADDRESS: selectedClient.address   || '',
            })
            editor.commands.setContent(withClient, false)
          }

        } else {
          editor.commands.setContent('<p></p>', false)
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

  // ── Save ─────────────────────────────────────────────────────────────────────
  const save = useCallback(async (silent = false) => {
    if (!editor || !user) return

    if (!silent) setSaving(true)

    try {
      const content    = editor.getHTML()
      const clientName = selectedClient?.full_name || null

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
  }, [editor, user, title, status, templateId, savedDocId, selectedClient])

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

  // ── Loading state ────────────────────────────────────────────────────────────
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

        {/* Mobile context panel toggle */}
        <button
          onClick={() => setPanelMobileOpen(p => !p)}
          className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-[#1e3a5f] hover:bg-gray-100 transition-colors shrink-0"
          title="Lawyer & Client"
        >
          <Users className="w-4 h-4" />
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
        </div>
      </div>

      {/* ── Editor + left panel ──────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        <ContextPanel
          profile={profile}
          userId={user?.id}
          editor={editor}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          mobileOpen={panelMobileOpen}
          setMobileOpen={setPanelMobileOpen}
        />

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
      </div>

      <Footer />
    </div>
  )
}
