import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, FilePlus, FileText, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import TemplateCard from '../components/TemplateCard'
import { getTemplatesForSpecialization } from '../templates/templateContent'
import { usePageTitle } from '../hooks/usePageTitle'
import Footer from '../components/Footer'

// Map specialization label → short tab label
function shortSpecLabel(spec) {
  if (!spec) return 'My Area'
  const MAP = {
    'Criminal Lawyer':                   'Criminal',
    'Financial / Corporate Lawyer':      'Financial',
    'Family Lawyer':                     'Family',
    'Civil Lawyer':                      'Civil',
    'Property / Real Estate Lawyer':     'Property',
    'Tax Lawyer':                        'Tax',
    'Immigration Lawyer':                'Immigration',
    'Intellectual Property (IP) Lawyer': 'IP',
    'Labour / Employment Lawyer':        'Labour',
    'Other':                             'Other',
  }
  return MAP[spec] ?? spec
}

function categoryFromSpec(spec) {
  const MAP = {
    'Criminal Lawyer':                   'criminal',
    'Financial / Corporate Lawyer':      'financial',
    'Family Lawyer':                     'family',
    'Civil Lawyer':                      'civil',
    'Property / Real Estate Lawyer':     'property',
    'Tax Lawyer':                        'tax',
    'Immigration Lawyer':                'immigration',
    'Intellectual Property (IP) Lawyer': 'ip',
    'Labour / Employment Lawyer':        'labour',
  }
  return MAP[spec] ?? null
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TemplatesPage() {
  const { profile } = useAuth()
  const navigate    = useNavigate()
  usePageTitle('Template Library')

  const specialization = profile?.specialization ?? null
  const specCategory   = categoryFromSpec(specialization)
  const specLabel      = shortSpecLabel(specialization)

  // All templates visible for this lawyer's specialization
  const allTemplates = useMemo(
    () => getTemplatesForSpecialization(specialization),
    [specialization]
  )

  // Tabs: All | General | [SpecCategory] | Blank
  const TABS = [
    { key: 'all',     label: 'All' },
    { key: 'general', label: 'General' },
    ...(specCategory && specCategory !== 'general'
      ? [{ key: specCategory, label: specLabel }]
      : []),
  ]

  const [activeTab, setActiveTab] = useState('all')
  const [query, setQuery]         = useState('')

  const displayed = useMemo(() => {
    let list = allTemplates
    if (activeTab !== 'all') list = list.filter(t => t.category === activeTab)
    const q = query.trim().toLowerCase()
    if (q) list = list.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    )
    return list
  }, [allTemplates, activeTab, query])

  function handleUseTemplate(template) {
    navigate(`/editor/new?templateId=${template.id}`)
  }

  function handleBlankDocument() {
    navigate('/editor/new')
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">

        {/* ── Page header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">Template Library</h1>
            <p className="text-sm text-gray-400 mt-1">
              {allTemplates.length} templates available
              {specialization ? ` for ${specialization}` : ''}
            </p>
          </div>

          {/* Blank document shortcut */}
          <button
            onClick={handleBlankDocument}
            className="flex items-center gap-2 border-2 border-dashed border-[#1e3a5f]/30 hover:border-[#1e3a5f] bg-white hover:bg-[#1e3a5f]/5 text-[#1e3a5f] text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
          >
            <FilePlus className="w-4 h-4" />
            Blank Document
          </button>
        </div>

        {/* ── Search + tabs row ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
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

          {/* Tab pills */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl p-1 flex-wrap">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-[#1e3a5f] text-white shadow-sm'
                    : 'text-gray-500 hover:text-[#1e3a5f] hover:bg-gray-50'
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 text-xs ${activeTab === tab.key ? 'text-blue-200' : 'text-gray-300'}`}>
                  {activeTab === tab.key || tab.key === 'all'
                    ? allTemplates.filter(t => tab.key === 'all' || t.category === tab.key).length
                    : allTemplates.filter(t => t.category === tab.key).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid ── */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Blank document card — always first when on "All" tab and no active search */}
            {activeTab === 'all' && !query && (
              <BlankCard onClick={handleBlankDocument} />
            )}
            {displayed.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                onUse={handleUseTemplate}
              />
            ))}
          </div>
        ) : (
          <EmptyState query={query} onClear={() => { setQuery(''); setActiveTab('all') }} />
        )}

      </div>
      <Footer />
    </div>
  )
}

// ─── Blank document card ──────────────────────────────────────────────────────

function BlankCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#1e3a5f] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center justify-center p-8 text-center min-h-[200px]"
    >
      <div className="w-12 h-12 bg-[#1e3a5f]/8 group-hover:bg-[#1e3a5f]/15 rounded-xl flex items-center justify-center mb-3 transition-colors">
        <FilePlus className="w-6 h-6 text-[#1e3a5f]" />
      </div>
      <p className="text-sm font-bold text-[#1e3a5f] mb-1">Blank Document</p>
      <p className="text-xs text-gray-400">Start from scratch with an empty editor</p>
    </button>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ query, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <FileText className="w-8 h-8 text-gray-300" />
      </div>
      <h3 className="text-base font-semibold text-gray-500 mb-1">
        {query ? `No templates match "${query}"` : 'No templates found'}
      </h3>
      <p className="text-sm text-gray-400 mb-5">
        {query ? 'Try a different search term or browse all templates.' : 'Try switching to a different tab.'}
      </p>
      <button
        onClick={onClear}
        className="text-sm font-semibold text-[#1e3a5f] border-2 border-[#1e3a5f]/20 hover:border-[#1e3a5f] px-5 py-2 rounded-xl transition-colors"
      >
        {query ? 'Clear search' : 'View all templates'}
      </button>
    </div>
  )
}
