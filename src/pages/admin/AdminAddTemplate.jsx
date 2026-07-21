import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import toast from 'react-hot-toast'
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Loader2, FileText } from 'lucide-react'
import AdminLayout from './AdminLayout'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const PLACEHOLDERS = [
  '[ADVOCATE_NAME]',
  '[BAR_NUMBER]',
  '[ASSOCIATE_NAME]',
  '[ASSOCIATE_BAR_NUMBER]',
  '[CLIENT_NAME]',
  '[CLIENT_ADDRESS]',
  '[CLIENT_PHONE]',
  '[CLIENT_EMAIL]',
  '[CASE_NUMBER]',
  '[PLAINTIFF_DEFENDANT]',
  '[COURT_PLACE]',
  '[COURT_NAME]',
]

function ToolbarBtn({ active, onClick, title, children }) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); onClick() }}
      title={title}
      className={`p-2 rounded-lg transition-colors text-sm ${
        active
          ? 'bg-[#1e3a5f] text-white'
          : 'text-gray-500 hover:bg-gray-100 hover:text-[#1e3a5f]'
      }`}
    >
      {children}
    </button>
  )
}

export default function AdminAddTemplate() {
  const { user } = useAuth()
  const [name, setName]       = useState('')
  const [loading, setLoading] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '',
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[400px] p-4 prose prose-sm max-w-none font-serif leading-relaxed',
      },
    },
  })

  function insertPlaceholder(text) {
    if (!editor) return
    editor.chain().focus().insertContent(text).run()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) { toast.error('Template name is required.'); return }
    const content = editor?.getHTML() ?? ''
    if (!content || content === '<p></p>') { toast.error('Template content cannot be empty.'); return }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('admin_templates')
        .insert({ name: name.trim(), content, created_by: user.id })

      if (error) throw error

      toast.success('Template saved successfully!')
      setName('')
      editor?.commands.clearContent()
    } catch (err) {
      toast.error(err.message || 'Failed to save template.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1e3a5f]">Add Template</h1>
            <p className="text-gray-400 text-sm">
              Use placeholders like <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">[ADVOCATE_NAME]</code> that will be auto-filled when advocates use this template.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

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

          {/* Editor card */}
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-[#1e3a5f] transition-colors">

            {/* Placeholder chips */}
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border-b border-gray-200 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">Insert:</span>
              {PLACEHOLDERS.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => insertPlaceholder(p)}
                  className="shrink-0 text-[11px] font-mono font-semibold px-2.5 py-1 bg-white border border-[#1e3a5f]/20 hover:border-[#1e3a5f] hover:bg-[#1e3a5f]/5 text-[#1e3a5f] rounded-lg transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Toolbar */}
            {editor && (
              <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-gray-200 bg-white">
                <ToolbarBtn
                  active={editor.isActive('bold')}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn
                  active={editor.isActive('italic')}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn
                  active={editor.isActive('underline')}
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  title="Underline"
                >
                  <UnderlineIcon className="w-4 h-4" />
                </ToolbarBtn>
                <div className="w-px h-5 bg-gray-200 mx-1 self-center" />
                <ToolbarBtn
                  active={editor.isActive('bulletList')}
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn
                  active={editor.isActive('orderedList')}
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </ToolbarBtn>
              </div>
            )}

            {/* Editor body */}
            <div className="bg-white">
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !editor}
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
