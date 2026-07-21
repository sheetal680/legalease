import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { FileText, ChevronRight, Loader2, Search, ArrowLeft } from 'lucide-react'
import AdvocateLayout from './AdvocateLayout'
import { supabase } from '../../lib/supabase'

export default function AdvocateChooseTemplate() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const clientId = searchParams.get('client')
  // Client data passed via navigation state (preferred) or fetched below
  const [client, setClient] = useState(location.state?.client ?? null)

  const [templates, setTemplates] = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')

  // Fetch client if not in state
  useEffect(() => {
    if (!client && clientId) {
      supabase
        .from('advocate_clients')
        .select('*')
        .eq('id', clientId)
        .maybeSingle()
        .then(({ data }) => { if (data) setClient(data) })
    }
  }, [clientId, client])

  // Fetch templates
  useEffect(() => {
    supabase
      .from('admin_templates')
      .select('id, name, created_at')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setTemplates(data)
        setLoading(false)
      })
  }, [])

  const filtered = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  function choose(template) {
    navigate(
      `/advocate/editor?template=${template.id}&client=${clientId}`,
      { state: { client, templateName: template.name } }
    )
  }

  return (
    <AdvocateLayout>
      <div className="max-w-2xl">

        {/* Back + Header */}
        <button
          onClick={() => navigate('/advocate/clients')}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#1e3a5f] mb-5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to clients
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1e3a5f]">Choose Template</h1>
            <p className="text-gray-400 text-sm">
              {client ? (
                <>For client: <strong className="text-[#1e3a5f]">{client.name}</strong></>
              ) : (
                'Select a document template to begin.'
              )}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative my-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search templates…"
            className="w-full pl-11 pr-4 py-3 text-sm border-2 border-gray-200 rounded-xl outline-none focus:border-[#1e3a5f] transition-colors placeholder-gray-400"
          />
        </div>

        {/* Templates list */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Loading templates…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">
              {templates.length === 0
                ? 'No templates available yet. Ask your admin to add templates.'
                : 'No templates match your search.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(template => (
              <button
                key={template.id}
                onClick={() => choose(template)}
                className="w-full text-left border-2 border-gray-100 hover:border-[#1e3a5f] rounded-2xl p-5 transition-all group flex items-center gap-4 bg-white hover:shadow-sm"
              >
                <div className="w-10 h-10 bg-[#c9a84c]/10 group-hover:bg-[#c9a84c]/20 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                  <FileText className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1e3a5f] font-bold text-sm">{template.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(template.created_at).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    })}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#1e3a5f] shrink-0 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>
    </AdvocateLayout>
  )
}
