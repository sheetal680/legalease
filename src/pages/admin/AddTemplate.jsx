import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { supabase } from '../../lib/supabase'

const PLACEHOLDERS = [
  '[CLIENT_NAME]', '[CLIENT_ADDRESS]', '[CLIENT_PHONE]', '[CLIENT_EMAIL]',
  '[CASE_NUMBER]', '[CASE_DESCRIPTION]', '[PARTY_TYPE]',
  '[COURT_NAME]', '[COURT_PLACE]',
  '[ADVOCATE_NAME]', '[BAR_NUMBER]', '[FIRM_NAME]',
  '[ASSOCIATE_NAME]', '[ASSOCIATE_BAR_NUMBER]', '[DATE]',
]

function ToolbarButton({ onClick, active, title, children }) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); onClick() }}
      title={title}
      className={`px-2.5 py-1.5 rounded text-sm font-medium transition-colors ${
        active
          ? 'bg-blue-900 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  )
}

function Toolbar({ editor }) {
  if (!editor) return null
  return (
    <div className="flex flex-wrap gap-1 p-2 border-b-2 border-gray-100 bg-gray-50 rounded-t-xl">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
        <span className="underline">U</span>
      </ToolbarButton>
      <div className="w-px bg-gray-200 mx-1" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
        &#8226;&#8212;
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">
        1&#8212;
      </ToolbarButton>
      <div className="w-px bg-gray-200 mx-1" />
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align left">
        &#8676;
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Center">
        &#8660;
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align right">
        &#8677;
      </ToolbarButton>
    </div>
  )
}

export default function AddTemplate() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '<p></p>',
    editorProps: {
      attributes: {
        class: 'prose max-w-none min-h-[300px] p-4 outline-none text-sm text-gray-800 focus:outline-none',
      },
    },
  })

  function insertPlaceholder(token) {
    if (!editor) return
    editor.chain().focus().insertContent(token).run()
  }

  async function submit(e) {
    e.preventDefault()
    if (!name.trim()) { toast.error('Template name is required'); return }
    const content = editor?.getHTML() ?? ''
    if (!content || content === '<p></p>') { toast.error('Template content cannot be empty'); return }

    setLoading(true)
    try {
      const { error } = await supabase.from('admin_templates').insert({ name: name.trim(), content })
      if (error) throw error
      toast.success('Template saved!')
      navigate('/admin')
    } catch (err) {
      toast.error(err.message || 'Failed to save template')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/admin')} className="text-sm text-gray-400 hover:text-blue-900 mb-6 block">← Back</button>
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Create Template</h1>
        <form onSubmit={submit} className="space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-6">
            <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">Template Name *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Vakalatnama, Bail Application"
              required
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-900 transition-colors disabled:opacity-60"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
            <div className="px-6 pt-5 pb-3">
              <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider mb-3">Placeholders</label>
              <div className="flex flex-wrap gap-1.5">
                {PLACEHOLDERS.map(token => (
                  <button
                    key={token}
                    type="button"
                    onClick={() => insertPlaceholder(token)}
                    disabled={loading}
                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-mono rounded border border-blue-200 transition-colors disabled:opacity-50"
                  >
                    {token}
                  </button>
                ))}
              </div>
            </div>
            <div className="mx-6 border-2 border-gray-200 rounded-xl overflow-hidden mb-6">
              <Toolbar editor={editor} />
              <EditorContent editor={editor} />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-900 text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-60 hover:bg-blue-800 transition-colors"
            >
              {loading ? 'Saving…' : 'Save Template'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              disabled={loading}
              className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3.5 rounded-xl text-sm disabled:opacity-60 hover:border-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
