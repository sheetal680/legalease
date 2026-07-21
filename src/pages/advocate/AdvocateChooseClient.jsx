import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, ChevronRight, Loader2, PlusCircle, Search } from 'lucide-react'
import AdvocateLayout from './AdvocateLayout'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export default function AdvocateChooseClient() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [clients, setClients]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')

  useEffect(() => {
    if (!user) return
    supabase
      .from('advocate_clients')
      .select('*')
      .eq('advocate_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setClients(data)
        setLoading(false)
      })
  }, [user])

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.case_number?.toLowerCase().includes(search.toLowerCase()) ||
    c.court_name?.toLowerCase().includes(search.toLowerCase())
  )

  function choose(client) {
    navigate(`/advocate/templates?client=${client.id}`, { state: { client } })
  }

  return (
    <AdvocateLayout>
      <div className="max-w-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-[#c9a84c]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1e3a5f]">Choose Client</h1>
              <p className="text-gray-400 text-sm">Select a client to start drafting a document.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/advocate/add-client')}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#1e3a5f] border-2 border-[#1e3a5f]/20 hover:border-[#1e3a5f] px-4 py-2 rounded-xl transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            New Client
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, case number, or court…"
            className="w-full pl-11 pr-4 py-3 text-sm border-2 border-gray-200 rounded-xl outline-none focus:border-[#1e3a5f] transition-colors placeholder-gray-400"
          />
        </div>

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Loading clients…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">
              {clients.length === 0 ? 'No clients yet.' : 'No clients match your search.'}
            </p>
            {clients.length === 0 && (
              <button
                onClick={() => navigate('/advocate/add-client')}
                className="mt-4 text-sm font-semibold text-[#1e3a5f] underline underline-offset-2"
              >
                Add your first client
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(client => (
              <button
                key={client.id}
                onClick={() => choose(client)}
                className="w-full text-left border-2 border-gray-100 hover:border-[#1e3a5f] rounded-2xl p-5 transition-all group flex items-center gap-4 bg-white hover:shadow-sm"
              >
                {/* Avatar */}
                <div className="w-10 h-10 bg-[#1e3a5f]/5 group-hover:bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                  <span className="text-[#1e3a5f] font-bold text-sm">
                    {client.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[#1e3a5f] font-bold text-sm">{client.name}</p>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    {client.case_number && (
                      <span className="text-[11px] text-gray-400 font-mono">{client.case_number}</span>
                    )}
                    {client.party_type && (
                      <span className="text-[11px] font-semibold text-[#c9a84c] bg-[#c9a84c]/10 px-2 py-0.5 rounded-md">
                        {client.party_type}
                      </span>
                    )}
                    {client.court_name && (
                      <span className="text-[11px] text-gray-400 truncate">{client.court_name}</span>
                    )}
                  </div>
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
