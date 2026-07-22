import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const PLACEHOLDERS = ['[ADVOCATE_NAME]','[BAR_NUMBER]','[CLIENT_NAME]','[CLIENT_ADDRESS]','[CASE_NUMBER]','[COURT_NAME]']

export default function AddTemplate() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)

  function insert(p) {
    const el = ref.current
    if (!el) return
    const s = el.selectionStart, e = el.selectionEnd
    setContent(content.slice(0, s) + p + content.slice(e))
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(s + p.length, s + p.length) })
  }

  async function submit(e) {
    e.preventDefault()
    if (!name.trim() || !content.trim()) { toast.error('Name and content required'); return }
    setLoading(true)
    try {
      const { error } = await supabase.from('admin_templates').insert({ name: name.trim(), content: content.trim(), created_by: user.id })
      if (error) throw error
      toast.success('Template saved!')
      setName(''); setContent('')
    } catch (err) {
      toast.error(err.message || 'Failed to save template')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate('/admin')} className="text-sm text-gray-400 hover:text-blue-900 mb-6 block">← Back</button>
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Add Template</h1>
        <form onSubmit={submit} className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">Template Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Bail Application" required disabled={loading}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-900 transition-colors disabled:opacity-60" />
          </div>
          <div>
            <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Placeholders</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {PLACEHOLDERS.map(p => (
                <button key={p} type="button" onClick={() => insert(p)}
                  className="text-xs font-mono px-2.5 py-1 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-900 rounded-lg transition-colors">
                  {p}
                </button>
              ))}
            </div>
            <textarea ref={ref} value={content} onChange={e => setContent(e.target.value)} placeholder="Paste or type your template here…" required disabled={loading} rows={16}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-mono outline-none focus:border-blue-900 transition-colors disabled:opacity-60 resize-y" />
          </div>
          <button type="submit" disabled={loading}
            className="bg-blue-900 text-white font-bold px-8 py-3.5 rounded-xl text-sm disabled:opacity-60">
            {loading ? 'Saving…' : 'Save Template'}
          </button>
        </form>
      </div>
    </div>
  )
}
