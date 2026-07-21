import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserCheck, PlusCircle, FileText, Users, ArrowRight, Scale } from 'lucide-react'
import AdvocateLayout from './advocate/AdvocateLayout'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function AdvocateHome() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [counts, setCounts]   = useState({ clients: 0, documents: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    Promise.all([
      supabase.from('advocate_clients').select('id', { count: 'exact', head: true }).eq('advocate_id', user.id),
      supabase.from('advocate_documents').select('id', { count: 'exact', head: true }).eq('advocate_id', user.id),
    ]).then(([clientsRes, docsRes]) => {
      setCounts({
        clients:   clientsRes.count ?? 0,
        documents: docsRes.count ?? 0,
      })
      setLoading(false)
    })
  }, [user])

  const name = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Advocate'

  const ACTIONS = [
    {
      icon:    UserCheck,
      label:   'Add Associate',
      desc:    'Register an associate advocate',
      to:      '/advocate/add-associate',
      accent:  '#c9a84c',
    },
    {
      icon:    PlusCircle,
      label:   'Add Client',
      desc:    'Add a new client and case details',
      to:      '/advocate/add-client',
      accent:  '#1e3a5f',
    },
    {
      icon:    FileText,
      label:   'Start Document',
      desc:    'Choose a client and pick a template',
      to:      '/advocate/clients',
      accent:  '#c9a84c',
    },
  ]

  return (
    <AdvocateLayout>
      <div className="max-w-3xl space-y-8">

        {/* Welcome header */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#1e3a5f] rounded-2xl flex items-center justify-center shrink-0">
            <Scale className="w-7 h-7 text-[#c9a84c]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">Welcome back, {name}</h1>
            <p className="text-gray-400 text-sm mt-0.5">Here's a quick look at your workspace.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="My Clients"
            value={loading ? '—' : counts.clients}
            icon={Users}
            onClick={() => navigate('/advocate/clients')}
          />
          <StatCard
            label="My Documents"
            value={loading ? '—' : counts.documents}
            icon={FileText}
            onClick={() => navigate('/advocate/documents')}
          />
        </div>

        {/* Quick actions */}
        <div>
          <p className="text-xs font-bold text-[#1e3a5f] uppercase tracking-widest mb-4">Quick Actions</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ACTIONS.map(({ icon: Icon, label, desc, to, accent }) => (
              <button
                key={to}
                onClick={() => navigate(to)}
                className="group text-left bg-white border-2 border-gray-100 hover:border-[#1e3a5f] rounded-2xl p-5 transition-all hover:shadow-sm"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${accent}18` }}
                >
                  <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <p className="text-sm font-bold text-[#1e3a5f]">{label}</p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-[#1e3a5f] opacity-0 group-hover:opacity-100 transition-opacity">
                  Go <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </AdvocateLayout>
  )
}

function StatCard({ label, value, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group bg-white border-2 border-gray-100 hover:border-[#1e3a5f] rounded-2xl p-5 text-left transition-all hover:shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
        <Icon className="w-4 h-4 text-gray-300 group-hover:text-[#1e3a5f] transition-colors" />
      </div>
      <p className="text-3xl font-bold text-[#1e3a5f]">{value}</p>
    </button>
  )
}
