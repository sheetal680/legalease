import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, FilePlus, FileText, X } from 'lucide-react'
import TemplateCard from '../components/TemplateCard'
import { templates as allTemplates } from '../templates/templateContent'
import { usePageTitle } from '../hooks/usePageTitle'
import Footer from '../components/Footer'

export default function TemplatesPage() {
  const navigate = useNavigate()
  usePageTitle('Template Library')

  const [query, setQuery] = useState('')

  const displayed = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allTemplates
    return allTemplates.filter(t => t.name.toLowerCase().includes(q))
  }, [query])

  function handleUseTemplate(template) {
    navigate(`/editor/new?templateId=${template.id}`)
  }

  function handleBlankDocument() {
    navigate('/editor/new')
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">Template Library</h1>
            <p className="text-sm text-gray-400 mt-1">
              {displayed.length} template{displayed.length !== 1 ? 's' : ''}{query ? ' matching search' : ' available'}
            </p>
          </div>
          <button
            onClick={handleBlankDocument}
            className="flex items-center gap-2 border-2 border-dashed border-[#1e3a5f]/30 hover:border-[#1e3a5f] bg-white hover:bg-[#1e3a5f]/5 text-[#1e3a5f] text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
          >
            <FilePlus className="w-4 h-4" />
            Blank Document
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates by name…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors shadow-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Grid */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {!query && <BlankCard onClick={handleBlankDocument} />}
            {displayed.map(template => (
              <TemplateCard key={template.id} template={template} onUse={handleUseTemplate} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-base font-semibold text-gray-500 mb-1">No templates match "{query}"</h3>
            <p className="text-sm text-gray-400 mb-5">Try a different search term.</p>
            <button
              onClick={() => setQuery('')}
              className="text-sm font-semibold text-[#1e3a5f] border-2 border-[#1e3a5f]/20 hover:border-[#1e3a5f] px-5 py-2 rounded-xl transition-colors"
            >
              Clear search
            </button>
          </div>
        )}

      </div>
      <Footer />
    </div>
  )
}

function BlankCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#1e3a5f] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center justify-center p-8 text-center min-h-[160px]"
    >
      <div className="w-10 h-10 bg-[#1e3a5f]/8 group-hover:bg-[#1e3a5f]/15 rounded-xl flex items-center justify-center mb-3 transition-colors">
        <FilePlus className="w-5 h-5 text-[#1e3a5f]" />
      </div>
      <p className="text-sm font-bold text-[#1e3a5f] mb-1">Blank Document</p>
      <p className="text-xs text-gray-400">Start from scratch</p>
    </button>
  )
}
