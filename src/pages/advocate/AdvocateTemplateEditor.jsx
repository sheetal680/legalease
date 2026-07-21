import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import toast from 'react-hot-toast'
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
  Save, Download, ArrowLeft, Loader2, User, Users, UserCheck, Tag,
  ChevronDown, ChevronRight,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

// ─── All template placeholders ───────────────────────────────────────────────
const PLACEHOLDERS = [
  '[ADVOCATE_NAME]', '[BAR_NUMBER]',
  '[ASSOCIATE_NAME]', '[ASSOCIATE_BAR_NUMBER]',
  '[CLIENT_NAME]', '[CLIENT_ADDRESS]', '[CLIENT_PHONE]', '[CLIENT_EMAIL]',
  '[CASE_NUMBER]', '[PLAINTIFF_DEFENDANT]', '[COURT_PLACE]', '[COURT_NAME]',
]

// ─── Sidebar panel identifiers ───────────────────────────────────────────────
const PANELS = [
  { id: 'client',     label: 'Client',     icon: User },
  { id: 'associate',  label: 'Associate',  icon: UserCheck },
  { id: 'profile',    label: 'My Profile', icon: Users },
  { id: 'placeholders', label: 'Placeholders', icon: Tag },
]

// ─── Replace placeholder tokens in editor HTML ───────────────────────────────
function replaceInEditor(editor, map) {
  if (!editor) return
  let html = editor.getHTML()
  for (const [token, value] of Object.entries(map)) {
    if (value) html = html.replaceAll(token, value)
  }
  editor.commands.setContent(html, false)
  toast.success('Fields auto-filled!')
}

// ─── Toolbar button ──────────────────────────────────────────────────────────
function TBtn({ active, onClick, title, children }) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); onClick() }}
      title={title}
      className={`p-2 rounded-lg transition-colors ${
        active ? 'bg-[#1e3a5f] text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-[#1e3a5f]'
      }`}
    >
      {children}
    </button>
  )
}

// ─── Sidebar info row ─────────────────────────────────────────────────────────
function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-xs text-[#1e3a5f] font-medium mt-0.5 break-words">{value}</p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AdvocateTemplateEditor() {
  const { user, profile } = useAuth()
  const navigate          = useNavigate()
  const [searchParams]    = useSearchParams()
  const location          = useLocation()

  const templateId = searchParams.get('template')
  const clientId   = searchParams.get('client')

  // ── State ─────────────────────────────────────────────────────────────────
  const [docName, setDocName]         = useState(location.state?.templateName || 'Untitled Document')
  const [client, setClient]           = useState(location.state?.client ?? null)
  const [associates, setAssociates]   = useState([])
  const [selectedAssoc, setSelectedAssoc] = useState(null)
  const [templateLoaded, setTemplateLoaded] = useState(false)
  const [saving, setSaving]           = useState(false)
  const [panel, setPanel]             = useState('client')
  const [existingDocId, setExistingDocId] = useState(null)

  // ── TipTap editor ─────────────────────────────────────────────────────────
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '',
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[500px] p-6 prose prose-sm max-w-none font-serif leading-relaxed text-gray-800',
      },
    },
  })

  // ── Load client (if not in nav state) ────────────────────────────────────
  useEffect(() => {
    if (!client && clientId) {
      supabase
        .from('advocate_clients').select('*')
        .eq('id', clientId).maybeSingle()
        .then(({ data }) => { if (data) setClient(data) })
    }
  }, [clientId, client])

  // ── Load template content ─────────────────────────────────────────────────
  useEffect(() => {
    if (!templateId || !editor || templateLoaded) return
    supabase
      .from('admin_templates').select('name, content')
      .eq('id', templateId).maybeSingle()
      .then(({ data }) => {
        if (data) {
          if (!location.state?.templateName) setDocName(data.name)
          editor.commands.setContent(data.content, false)
          setTemplateLoaded(true)
        }
      })
  }, [templateId, editor, templateLoaded, location.state])

  // ── Load associates ───────────────────────────────────────────────────────
  useEffect(() => {
    supabase
      .from('associates').select('id, name, bar_council_number')
      .order('name')
      .then(({ data }) => { if (data) setAssociates(data) })
  }, [])

  // ── Auto-fill helpers ─────────────────────────────────────────────────────
  const fillClient = useCallback(() => {
    if (!client) { toast.error('No client selected.'); return }
    replaceInEditor(editor, {
      '[CLIENT_NAME]':         client.name,
      '[CLIENT_ADDRESS]':      client.address || '',
      '[CLIENT_PHONE]':        client.phone || '',
      '[CLIENT_EMAIL]':        client.email || '',
      '[CASE_NUMBER]':         client.case_number || '',
      '[PLAINTIFF_DEFENDANT]': client.party_type || '',
      '[COURT_PLACE]':         client.court_place || '',
      '[COURT_NAME]':          client.court_name || '',
    })
  }, [editor, client])

  const fillAssociate = useCallback(() => {
    if (!selectedAssoc) { toast.error('Select an associate first.'); return }
    replaceInEditor(editor, {
      '[ASSOCIATE_NAME]':       selectedAssoc.name,
      '[ASSOCIATE_BAR_NUMBER]': selectedAssoc.bar_council_number,
    })
  }, [editor, selectedAssoc])

  const fillProfile = useCallback(() => {
    if (!profile?.full_name && !profile?.bar_number) {
      toast.error('Your profile is incomplete. Please update it first.')
      return
    }
    replaceInEditor(editor, {
      '[ADVOCATE_NAME]': profile?.full_name || '',
      '[BAR_NUMBER]':    profile?.bar_number || '',
    })
  }, [editor, profile])

  const insertPlaceholder = useCallback((text) => {
    if (!editor) return
    editor.chain().focus().insertContent(text).run()
  }, [editor])

  // ── Save document ─────────────────────────────────────────────────────────
  async function saveDoc(status) {
    if (!docName.trim()) { toast.error('Document name is required.'); return }
    const content = editor?.getHTML() ?? ''
    if (!content || content === '<p></p>') { toast.error('Document is empty.'); return }

    setSaving(true)
    try {
      if (existingDocId) {
        // Update existing
        const { error } = await supabase
          .from('advocate_documents')
          .update({ name: docName.trim(), content, status, updated_at: new Date().toISOString() })
          .eq('id', existingDocId)
        if (error) throw error
      } else {
        // Insert new
        const { data, error } = await supabase
          .from('advocate_documents')
          .insert({
            advocate_id: user.id,
            template_id: templateId || null,
            name:        docName.trim(),
            content,
            status,
          })
          .select('id')
          .single()
        if (error) throw error
        if (data) setExistingDocId(data.id)
      }

      toast.success(status === 'draft' ? 'Draft saved!' : 'Document exported!')
    } catch (err) {
      toast.error(err.message || 'Failed to save document.')
    } finally {
      setSaving(false)
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden bg-white">

      {/* ── Left: editor area ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Top bar */}
        <header className="shrink-0 flex items-center gap-3 px-5 py-3 border-b border-gray-100 bg-white">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg text-gray-400 hover:text-[#1e3a5f] hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Doc name */}
          <input
            type="text"
            value={docName}
            onChange={e => setDocName(e.target.value)}
            placeholder="Document name…"
            className="flex-1 text-sm font-semibold text-[#1e3a5f] border-0 outline-none bg-transparent placeholder-gray-300 min-w-0"
          />

          {/* Save / Export */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => saveDoc('draft')}
              disabled={saving}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#1e3a5f] border-2 border-[#1e3a5f]/20 hover:border-[#1e3a5f] px-3.5 py-2 rounded-xl transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save Draft
            </button>
            <button
              onClick={() => saveDoc('exported')}
              disabled={saving}
              className="flex items-center gap-1.5 text-xs font-bold bg-[#1e3a5f] hover:bg-[#142840] text-[#c9a84c] px-3.5 py-2 rounded-xl transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              Export
            </button>
          </div>
        </header>

        {/* Formatting toolbar */}
        {editor && (
          <div className="shrink-0 flex items-center gap-0.5 px-4 py-1.5 border-b border-gray-100 bg-white">
            <TBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
              <Bold className="w-4 h-4" />
            </TBtn>
            <TBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
              <Italic className="w-4 h-4" />
            </TBtn>
            <TBtn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
              <UnderlineIcon className="w-4 h-4" />
            </TBtn>
            <div className="w-px h-5 bg-gray-200 mx-1 self-center" />
            <TBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">
              <List className="w-4 h-4" />
            </TBtn>
            <TBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered List">
              <ListOrdered className="w-4 h-4" />
            </TBtn>
          </div>
        )}

        {/* Editor body */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-3xl mx-auto my-6 bg-white shadow-sm rounded-xl border border-gray-100 min-h-[600px]">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

      {/* ── Right: sidebar ──────────────────────────────────────────────── */}
      <aside className="w-72 shrink-0 border-l border-gray-100 flex flex-col bg-white overflow-hidden">

        {/* Panel tabs */}
        <div className="grid grid-cols-4 border-b border-gray-100">
          {PANELS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPanel(id)}
              title={label}
              className={`flex flex-col items-center gap-1 py-3 text-[10px] font-bold transition-colors border-b-2 ${
                panel === id
                  ? 'border-[#1e3a5f] text-[#1e3a5f]'
                  : 'border-transparent text-gray-400 hover:text-[#1e3a5f]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto p-4">

          {/* ── CLIENT panel ─────────────────────────────────────────────── */}
          {panel === 'client' && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-[#1e3a5f] uppercase tracking-widest">Client Details</p>
              {client ? (
                <>
                  <div className="space-y-3 bg-gray-50 rounded-xl p-3">
                    <InfoRow label="Name"         value={client.name} />
                    <InfoRow label="Case Number"  value={client.case_number} />
                    <InfoRow label="Party Type"   value={client.party_type} />
                    <InfoRow label="Court"        value={client.court_name} />
                    <InfoRow label="Court City"   value={client.court_place} />
                    <InfoRow label="Address"      value={client.address} />
                    <InfoRow label="Phone"        value={client.phone} />
                    <InfoRow label="Email"        value={client.email} />
                  </div>
                  <button
                    onClick={fillClient}
                    className="w-full text-xs font-bold bg-[#1e3a5f] hover:bg-[#142840] text-[#c9a84c] py-2.5 rounded-xl transition-colors"
                  >
                    Auto-fill Client Fields
                  </button>
                </>
              ) : (
                <p className="text-xs text-gray-400">No client selected. Go back and choose a client first.</p>
              )}
            </div>
          )}

          {/* ── ASSOCIATE panel ───────────────────────────────────────────── */}
          {panel === 'associate' && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-[#1e3a5f] uppercase tracking-widest">Select Associate</p>
              {associates.length === 0 ? (
                <p className="text-xs text-gray-400">No associates found. Add one from the sidebar.</p>
              ) : (
                <>
                  <div className="relative">
                    <select
                      value={selectedAssoc?.id ?? ''}
                      onChange={e => {
                        const found = associates.find(a => a.id === e.target.value) || null
                        setSelectedAssoc(found)
                      }}
                      className="w-full text-xs px-3 py-2.5 border-2 border-gray-200 rounded-xl outline-none focus:border-[#1e3a5f] transition-colors bg-white appearance-none pr-8"
                    >
                      <option value="">Choose associate…</option>
                      {associates.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>

                  {selectedAssoc && (
                    <div className="space-y-3 bg-gray-50 rounded-xl p-3">
                      <InfoRow label="Name"             value={selectedAssoc.name} />
                      <InfoRow label="Bar Council No."  value={selectedAssoc.bar_council_number} />
                    </div>
                  )}

                  <button
                    onClick={fillAssociate}
                    disabled={!selectedAssoc}
                    className="w-full text-xs font-bold bg-[#1e3a5f] hover:bg-[#142840] disabled:opacity-40 text-[#c9a84c] py-2.5 rounded-xl transition-colors"
                  >
                    Auto-fill Associate Fields
                  </button>
                </>
              )}
            </div>
          )}

          {/* ── MY PROFILE panel ──────────────────────────────────────────── */}
          {panel === 'profile' && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-[#1e3a5f] uppercase tracking-widest">My Profile</p>
              {profile ? (
                <>
                  <div className="space-y-3 bg-gray-50 rounded-xl p-3">
                    <InfoRow label="Full Name"    value={profile.full_name} />
                    <InfoRow label="Bar Number"   value={profile.bar_number} />
                    <InfoRow label="Firm"         value={profile.firm_name} />
                    <InfoRow label="Designation"  value={profile.designation} />
                    <InfoRow label="Phone"        value={profile.phone} />
                    <InfoRow label="Email"        value={profile.email} />
                  </div>
                  <button
                    onClick={fillProfile}
                    className="w-full text-xs font-bold bg-[#1e3a5f] hover:bg-[#142840] text-[#c9a84c] py-2.5 rounded-xl transition-colors"
                  >
                    Auto-fill My Details
                  </button>
                </>
              ) : (
                <div>
                  <p className="text-xs text-gray-400 mb-3">Profile not set up. Auto-fill won't work until your profile is complete.</p>
                  <div className="space-y-2 bg-gray-50 rounded-xl p-3">
                    <InfoRow label="Name"       value={user?.user_metadata?.full_name} />
                    <InfoRow label="Email"      value={user?.email} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── PLACEHOLDERS panel ────────────────────────────────────────── */}
          {panel === 'placeholders' && (
            <div className="space-y-3">
              <p className="text-xs font-bold text-[#1e3a5f] uppercase tracking-widest">Insert Placeholder</p>
              <p className="text-[11px] text-gray-400">Click any token to insert it at the cursor.</p>
              <div className="flex flex-wrap gap-2">
                {PLACEHOLDERS.map(p => (
                  <button
                    key={p}
                    onClick={() => insertPlaceholder(p)}
                    className="text-[11px] font-mono font-semibold px-2.5 py-1 bg-white border border-[#1e3a5f]/20 hover:border-[#1e3a5f] hover:bg-[#1e3a5f]/5 text-[#1e3a5f] rounded-lg transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </aside>
    </div>
  )
}
