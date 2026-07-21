import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { FileText, Loader2 } from 'lucide-react'
import AdminLayout from './AdminLayout'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const PLACEHOLDERS = [
  '[ADVOCATE_NAME]',
  '[BAR_NUMBER]',
  '[CLIENT_NAME]',
  '[CLIENT_ADDRESS]',
  '[CLIENT_PHONE]',
  '[CASE_NUMBER]',
  '[COURT_NAME]',
  '[COURT_PLACE]',
]

export default function AdminAddTemplate() {
  const { user } = useAuth()
  const [name, setName]       = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef(null)

  function insertPlaceholder(placeholder) {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end   = el.selectionEnd
    const next  = content.slice(0, start) + placeholder + content.slice(end)
    setContent(next)
    // Restore cursor after the inserted text
    requestAnimationFrame(() => {
      el.focus()
      const pos = start + placeholder.length
      el.setSelectionRange(pos, pos)
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim())    { toast.error('Template name is required.'); return }
    if (!content.trim()) { toast.error('Template content cannot be empty.'); return }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('admin_templates')
        .insert({ name: name.trim(), content: content.trim(), created_by: user.id })

      if (error) throw error

      toast.success('Template saved successfully!')
      setName('')
      setContent('')
    } catch (err) {
      toast.error(err.message || 'Failed to save template.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1e3a5f]">Add Template</h1>
            <p className="text-gray-400 text-sm">
              Paste your template text and insert placeholders where needed.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Template Name */}
          <div>
            <label className="block text-xs font-bold text-[#1e3a5f] uppercase tracking-wider mb-1.5">
              Template Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Bail Application, Legal Notice"
              disabled={loading}
              required
              className="w-full text-sm px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#1e3a5f] transition-colors placeholder-gray-400 disabled:opacity-60"
            />
          </div>

          {/* Textarea + chips */}
          <div>
            <label className="block text-xs font-bold text-[#1e3a5f] uppercase tracking-wider mb-1.5">
              Template Content
            </label>

            {/* Placeholder chips */}
            <div className="flex flex-wrap gap-2 mb-2">
              {PLACEHOLDERS.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => insertPlaceholder(p)}
                  className="text-[11px] font-mono font-semibold px-2.5 py-1 bg-white border border-[#1e3a5f]/20 hover:border-[#1e3a5f] hover:bg-[#1e3a5f]/5 text-[#1e3a5f] rounded-lg transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            <textarea
              ref={textareaRef}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Paste or type your template here…"
              disabled={loading}
              rows={18}
              className="w-full text-sm font-mono px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#1e3a5f] transition-colors placeholder-gray-400 disabled:opacity-60 resize-y leading-relaxed"
              style={{ minHeight: 400 }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#142840] disabled:opacity-60 disabled:cursor-not-allowed text-[#c9a84c] font-bold text-sm px-8 py-3.5 rounded-xl transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
            {loading ? 'Saving…' : 'Save Template'}
          </button>

        </form>
      </div>
    </AdminLayout>
  )
}
