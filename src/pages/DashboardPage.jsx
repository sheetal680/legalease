import { useEffect, useState, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  FileText, FilePlus, FolderOpen, Clock,
  Pencil, Trash2, Download, ArrowRight,
  Calendar, TrendingUp, AlertCircle,
} from 'lucide-react'
import { format, startOfMonth } from 'date-fns'
import toast from 'react-hot-toast'

import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { getTemplatesForSpecialization } from '../templates/templateContent'
import { exportToPDF } from '../lib/exportDocument'
import { usePageTitle } from '../hooks/usePageTitle'
import Footer from '../components/Footer'

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const cfg = status === 'exported'
    ? 'bg-green-50 text-green-700 border-green-200'
    : 'bg-amber-50 text-amber-700 border-amber-200'
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg}`}>
      {status === 'exported' ? 'Exported' : 'Draft'}
    </span>
  )
}

// ─── Skeleton blocks ──────────────────────────────────────────────────────────

function Skeleton({ className }) {
  return <div className={`bg-gray-200 rounded-lg animate-pulse ${className}`} />
}

function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="w-9 h-9 rounded-xl" />
        <Skeleton className="w-12 h-6 rounded" />
      </div>
      <Skeleton className="w-16 h-7 rounded mb-1" />
      <Skeleton className="w-24 h-4 rounded" />
    </div>
  )
}

function DocRowSkeleton() {
  return (
    <tr>
      {[120, 90, 80, 70, 60, 60].map((w, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className={`h-4 rounded`} style={{ width: w }} />
        </td>
      ))}
    </tr>
  )
}

function TemplateSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <Skeleton className="w-10 h-10 rounded-xl mb-4" />
      <Skeleton className="w-3/4 h-4 rounded mb-2" />
      <Skeleton className="w-full h-3 rounded mb-1" />
      <Skeleton className="w-2/3 h-3 rounded mb-4" />
      <Skeleton className="w-full h-8 rounded-xl" />
    </div>
  )
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, value, label, accent }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent ?? 'bg-[#1e3a5f]/10'}`}>
          <Icon className={`w-5 h-5 ${accent ? 'text-white' : 'text-[#1e3a5f]'}`} />
        </div>
      </div>
      <p className="text-3xl font-black text-[#1e3a5f] leading-none mb-1">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  usePageTitle('Dashboard')

  const [docs, setDocs]       = useState([])
  const [stats, setStats]     = useState({ total: 0, thisMonth: 0, drafts: 0 })
  const [loading, setLoading] = useState(true)

  // Quick template shortcuts (top 3 for their specialization)
  const quickTemplates = getTemplatesForSpecialization(profile?.specialization)
    .filter(t => t.category !== 'general')
    .slice(0, 3)
    .concat(
      getTemplatesForSpecialization(profile?.specialization)
        .filter(t => t.category === 'general')
    )
    .slice(0, 3)

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('id, title, template_id, client_name, status, created_at, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (error) throw error

      const all       = data || []
      const monthStart = startOfMonth(new Date()).toISOString()

      setDocs(all.slice(0, 5))
      setStats({
        total:     all.length,
        thisMonth: all.filter(d => d.created_at >= monthStart).length,
        drafts:    all.filter(d => d.status === 'draft').length,
      })
    } catch (err) {
      toast.error('Could not load documents')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => { fetchData() }, [fetchData])

  // ── Delete doc ─────────────────────────────────────────────────────────────
  async function handleDelete(doc) {
    if (!window.confirm(`Delete "${doc.title}"? This cannot be undone.`)) return
    try {
      const { error } = await supabase.from('documents').delete().eq('id', doc.id)
      if (error) throw error
      toast.success('Document deleted')
      fetchData()
    } catch (err) {
      toast.error('Delete failed')
    }
  }

  // ── Download PDF ────────────────────────────────────────────────────────────
  async function handleDownloadPDF(doc) {
    const toastId = toast.loading('Preparing PDF…')
    try {
      // Fetch full content
      const { data, error } = await supabase
        .from('documents')
        .select('content')
        .eq('id', doc.id)
        .single()
      if (error || !data) throw new Error('Could not load document content')

      // Render into a hidden div, then export
      const container = document.createElement('div')
      container.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;padding:40px;font-family:serif;line-height:1.8;'
      container.innerHTML = data.content || ''
      document.body.appendChild(container)

      await exportToPDF(container, doc.title, profile)
      document.body.removeChild(container)
      toast.success('PDF downloaded', { id: toastId })
    } catch (err) {
      toast.error(err.message || 'PDF export failed', { id: toastId })
    }
  }

  // ── Greeting ──────────────────────────────────────────────────────────────
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = profile?.full_name?.split(' ')[0] ?? 'Counsellor'

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 flex-1 w-full">

        {/* ── Welcome banner ──────────────────────────────────────────────── */}
        <div className="bg-[#1e3a5f] rounded-2xl px-6 py-7 sm:px-8 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg overflow-hidden relative">
          {/* Decorative circles */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
          <div className="absolute -right-4 -bottom-6 w-24 h-24 bg-[#c9a84c]/20 rounded-full pointer-events-none" />

          <div className="relative z-10">
            <p className="text-blue-300 text-sm font-medium mb-1">{greeting}</p>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
              {profile?.full_name ?? 'Welcome back'}
            </h1>
            <p className="text-blue-200 text-sm">
              {[profile?.specialization, profile?.firm_name].filter(Boolean).join('  ·  ')}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:items-end gap-3">
            <div className="flex items-center gap-1.5 text-blue-200 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(), 'EEEE, dd MMMM yyyy')}
            </div>
            <button
              onClick={() => navigate('/templates')}
              className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#a8882f] text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-md"
            >
              <FilePlus className="w-4 h-4" />
              New Document
            </button>
          </div>
        </div>

        {/* ── Stats row ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {loading ? (
            <><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /></>
          ) : (
            <>
              <StatCard icon={FolderOpen} value={stats.total}     label="Total Documents" />
              <StatCard icon={TrendingUp} value={stats.thisMonth} label="Created this month" accent="bg-[#c9a84c]" />
              <StatCard icon={Clock}      value={stats.drafts}    label="Drafts pending" />
            </>
          )}
        </div>

        {/* ── Recent documents ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1e3a5f]" />
              <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide">Recent Documents</h2>
            </div>
            <Link to="/cases" className="flex items-center gap-1 text-xs font-semibold text-[#c9a84c] hover:text-[#a8882f] transition-colors">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden md:table-cell">Client</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden sm:table-cell">Last Modified</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <><DocRowSkeleton /><DocRowSkeleton /><DocRowSkeleton /></>
                ) : docs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-gray-300" />
                        </div>
                        <p className="text-sm text-gray-400">No documents yet.</p>
                        <button
                          onClick={() => navigate('/templates')}
                          className="text-xs font-semibold text-[#1e3a5f] border-2 border-[#1e3a5f]/20 hover:border-[#1e3a5f] px-4 py-1.5 rounded-lg transition-colors"
                        >
                          Create your first document
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  docs.map(doc => (
                    <tr key={doc.id} className="hover:bg-gray-50/60 transition-colors group">
                      {/* Title */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => navigate(`/editor/${doc.id}`)}
                          className="text-sm font-semibold text-[#1e3a5f] hover:text-[#2a5298] text-left truncate max-w-[180px] block transition-colors"
                        >
                          {doc.title || 'Untitled'}
                        </button>
                      </td>
                      {/* Client */}
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-xs text-gray-500 truncate block max-w-[120px]">
                          {doc.client_name || <span className="text-gray-300 italic">—</span>}
                        </span>
                      </td>
                      {/* Date */}
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-xs text-gray-400">
                          {doc.updated_at
                            ? format(new Date(doc.updated_at), 'dd MMM yyyy')
                            : '—'}
                        </span>
                      </td>
                      {/* Status */}
                      <td className="px-4 py-3">
                        <StatusBadge status={doc.status} />
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* Open */}
                          <button
                            onClick={() => navigate(`/editor/${doc.id}`)}
                            title="Open editor"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#1e3a5f] hover:bg-gray-100 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          {/* Download PDF */}
                          <button
                            onClick={() => handleDownloadPDF(doc)}
                            title="Download PDF"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#c9a84c] hover:bg-amber-50 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(doc)}
                            title="Delete document"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Quick template shortcuts ─────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide flex items-center gap-2">
              <FileText className="w-4 h-4" /> Quick Templates
            </h2>
            <Link to="/templates" className="flex items-center gap-1 text-xs font-semibold text-[#c9a84c] hover:text-[#a8882f] transition-colors">
              Browse all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {loading ? (
              <><TemplateSkeleton /><TemplateSkeleton /><TemplateSkeleton /></>
            ) : (
              quickTemplates.map(tmpl => (
                <QuickTemplateCard
                  key={tmpl.id}
                  template={tmpl}
                  onUse={() => navigate(`/editor/new?templateId=${tmpl.id}`)}
                />
              ))
            )}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

// ─── Quick template card ──────────────────────────────────────────────────────

const CATEGORY_COLORS = {
  general:     'bg-blue-50 text-blue-700 border-blue-200',
  criminal:    'bg-red-50 text-red-700 border-red-200',
  financial:   'bg-green-50 text-green-700 border-green-200',
  family:      'bg-pink-50 text-pink-700 border-pink-200',
  property:    'bg-amber-50 text-amber-700 border-amber-200',
  tax:         'bg-orange-50 text-orange-700 border-orange-200',
  civil:       'bg-indigo-50 text-indigo-700 border-indigo-200',
  immigration: 'bg-teal-50 text-teal-700 border-teal-200',
  ip:          'bg-purple-50 text-purple-700 border-purple-200',
  labour:      'bg-cyan-50 text-cyan-700 border-cyan-200',
}

function QuickTemplateCard({ template, onUse }) {
  const badgeCls = CATEGORY_COLORS[template.category] ?? 'bg-gray-50 text-gray-600 border-gray-200'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-[#1e3a5f] to-[#2a5298]" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="w-9 h-9 bg-[#1e3a5f]/8 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-[#1e3a5f]" />
          </div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${badgeCls}`}>
            {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
          </span>
        </div>
        <h3 className="text-sm font-bold text-[#1e3a5f] mb-1.5 leading-snug">{template.name}</h3>
        <p className="text-xs text-gray-400 leading-relaxed flex-1 mb-4 line-clamp-2">{template.description}</p>
        <button
          onClick={onUse}
          className="w-full bg-[#c9a84c] hover:bg-[#a8882f] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          Use Template <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
