import { useEffect, useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, X, ChevronUp, ChevronDown, ChevronsUpDown,
  Pencil, Copy, Download, Trash2,
  FilePlus, FileText, SlidersHorizontal,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import { format, startOfWeek, startOfMonth, subMonths, isAfter } from 'date-fns'
import toast from 'react-hot-toast'

import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { exportToPDF } from '../lib/exportDocument'
import { templates as allTemplates } from '../templates/templateContent'
import { usePageTitle } from '../hooks/usePageTitle'
import Footer from '../components/Footer'

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10

const STATUS_OPTIONS = [
  { value: 'all',      label: 'All Statuses' },
  { value: 'draft',    label: 'Draft' },
  { value: 'exported', label: 'Exported' },
]

const DATE_OPTIONS = [
  { value: 'all',     label: 'All Time' },
  { value: 'week',    label: 'This Week' },
  { value: 'month',   label: 'This Month' },
  { value: '3months', label: 'Last 3 Months' },
]

const CATEGORY_OPTIONS = [
  { value: 'all',         label: 'All Categories' },
  { value: 'general',     label: 'General' },
  { value: 'criminal',    label: 'Criminal' },
  { value: 'financial',   label: 'Financial' },
  { value: 'family',      label: 'Family' },
  { value: 'property',    label: 'Property' },
  { value: 'tax',         label: 'Tax' },
  { value: 'civil',       label: 'Civil' },
  { value: 'immigration', label: 'Immigration' },
  { value: 'ip',          label: 'IP' },
  { value: 'labour',      label: 'Labour' },
]

const SORTABLE_COLS = ['title', 'client_name', 'created_at', 'updated_at', 'status']

// ─── Helpers ──────────────────────────────────────────────────────────────────

function templateCategory(templateId) {
  return allTemplates.find(t => t.id === templateId)?.category ?? null
}

function templateName(templateId) {
  return allTemplates.find(t => t.id === templateId)?.name ?? '—'
}

function dateFloor(range) {
  const now = new Date()
  if (range === 'week')    return startOfWeek(now, { weekStartsOn: 1 })
  if (range === 'month')   return startOfMonth(now)
  if (range === '3months') return subMonths(now, 3)
  return null
}

// ─── UI atoms ─────────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  return status === 'exported' ? (
    <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border bg-green-50 text-green-700 border-green-200">
      Exported
    </span>
  ) : (
    <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border bg-amber-50 text-amber-700 border-amber-200">
      Draft
    </span>
  )
}

function SortIcon({ col, sortCol, sortDir }) {
  if (col !== sortCol) return <ChevronsUpDown className="w-3 h-3 text-gray-300 ml-1 inline" />
  return sortDir === 'asc'
    ? <ChevronUp   className="w-3 h-3 text-[#1e3a5f] ml-1 inline" />
    : <ChevronDown className="w-3 h-3 text-[#1e3a5f] ml-1 inline" />
}

function Skeleton({ className }) {
  return <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
}

function RowSkeleton() {
  return (
    <tr>
      {[160, 120, 100, 90, 90, 70, 80].map((w, i) => (
        <td key={i} className="px-4 py-3.5">
          <Skeleton className="h-4 rounded" style={{ width: w }} />
        </td>
      ))}
    </tr>
  )
}

// ─── Select component ─────────────────────────────────────────────────────────

function FilterSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors appearance-none pr-7 cursor-pointer"
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CasesPage() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  usePageTitle('My Cases')

  // Raw data
  const [allDocs, setAllDocs]   = useState([])
  const [loading, setLoading]   = useState(true)

  // Filters
  const [query, setQuery]       = useState('')
  const [statusF, setStatusF]   = useState('all')
  const [dateF, setDateF]       = useState('all')
  const [categoryF, setCategoryF] = useState('all')

  // Sort
  const [sortCol, setSortCol]   = useState('updated_at')
  const [sortDir, setSortDir]   = useState('desc')

  // Pagination
  const [page, setPage]         = useState(1)

  // Row actions in-flight
  const [duplicating, setDuplicating] = useState(null)  // doc id
  const [downloading, setDownloading] = useState(null)  // doc id
  const [deleting, setDeleting]       = useState(null)  // doc id

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchDocs = useCallback(async () => {
    if (!user) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('id, title, template_id, client_name, status, created_at, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (error) throw error
      setAllDocs(data || [])
    } catch (err) {
      toast.error('Could not load documents')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => { fetchDocs() }, [fetchDocs])

  // ── Filter + Sort ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const floor = dateFloor(dateF)
    const q     = query.trim().toLowerCase()

    return allDocs
      .filter(d => {
        if (q && !d.title?.toLowerCase().includes(q) && !d.client_name?.toLowerCase().includes(q)) return false
        if (statusF !== 'all' && d.status !== statusF) return false
        if (floor && !isAfter(new Date(d.created_at), floor)) return false
        if (categoryF !== 'all' && templateCategory(d.template_id) !== categoryF) return false
        return true
      })
      .sort((a, b) => {
        let av = a[sortCol] ?? ''
        let bv = b[sortCol] ?? ''
        if (typeof av === 'string') av = av.toLowerCase()
        if (typeof bv === 'string') bv = bv.toLowerCase()
        if (av < bv) return sortDir === 'asc' ? -1 :  1
        if (av > bv) return sortDir === 'asc' ?  1 : -1
        return 0
      })
  }, [allDocs, query, statusF, dateF, categoryF, sortCol, sortDir])

  // Reset to page 1 on filter change
  useEffect(() => { setPage(1) }, [query, statusF, dateF, categoryF, sortCol, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageDocs   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // ── Sort toggle ────────────────────────────────────────────────────────────
  function toggleSort(col) {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }

  // ── Clear filters ──────────────────────────────────────────────────────────
  const hasFilters = query || statusF !== 'all' || dateF !== 'all' || categoryF !== 'all'
  function clearFilters() {
    setQuery(''); setStatusF('all'); setDateF('all'); setCategoryF('all')
  }

  // ── Duplicate ──────────────────────────────────────────────────────────────
  async function handleDuplicate(doc) {
    setDuplicating(doc.id)
    try {
      // Fetch full content
      const { data: full, error: fetchErr } = await supabase
        .from('documents')
        .select('content')
        .eq('id', doc.id)
        .single()
      if (fetchErr) throw fetchErr

      const { error: insertErr } = await supabase
        .from('documents')
        .insert({
          user_id:     user.id,
          template_id: doc.template_id,
          title:       `Copy of ${doc.title || 'Untitled'}`,
          client_name: doc.client_name,
          content:     full.content,
          status:      'draft',
          created_at:  new Date().toISOString(),
          updated_at:  new Date().toISOString(),
        })
      if (insertErr) throw insertErr

      toast.success('Document duplicated')
      fetchDocs()
    } catch (err) {
      toast.error('Duplicate failed')
    } finally {
      setDuplicating(null)
    }
  }

  // ── Download PDF ───────────────────────────────────────────────────────────
  async function handleDownloadPDF(doc) {
    setDownloading(doc.id)
    const tid = toast.loading('Preparing PDF…')
    try {
      const { data: full, error } = await supabase
        .from('documents')
        .select('content')
        .eq('id', doc.id)
        .single()
      if (error || !full) throw new Error('Could not load content')

      const container = document.createElement('div')
      container.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;padding:40px;font-family:serif;line-height:1.8;'
      container.innerHTML = full.content || ''
      document.body.appendChild(container)
      await exportToPDF(container, doc.title, profile)
      document.body.removeChild(container)

      toast.success('PDF downloaded', { id: tid })
    } catch (err) {
      toast.error(err.message || 'PDF export failed', { id: tid })
    } finally {
      setDownloading(null)
    }
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  async function handleDelete(doc) {
    if (!window.confirm(`Permanently delete "${doc.title || 'Untitled'}"?\nThis cannot be undone.`)) return
    setDeleting(doc.id)
    try {
      const { error } = await supabase.from('documents').delete().eq('id', doc.id)
      if (error) throw error
      toast.success('Document deleted')
      fetchDocs()
    } catch {
      toast.error('Delete failed')
    } finally {
      setDeleting(null)
    }
  }

  // ── Th helper ─────────────────────────────────────────────────────────────
  function Th({ col, label, hidden }) {
    const sortable = SORTABLE_COLS.includes(col)
    return (
      <th
        className={`px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap select-none ${
          sortable ? 'cursor-pointer hover:text-[#1e3a5f] transition-colors' : ''
        } ${hidden || ''}`}
        onClick={() => sortable && toggleSort(col)}
      >
        {label}
        {sortable && <SortIcon col={col} sortCol={sortCol} sortDir={sortDir} />}
      </th>
    )
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 flex-1 w-full">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">My Cases</h1>
            <p className="text-sm text-gray-400 mt-1">
              {loading ? 'Loading…' : `${filtered.length} document${filtered.length !== 1 ? 's' : ''}${hasFilters ? ' matching filters' : ''}`}
            </p>
          </div>
          <button
            onClick={() => navigate('/templates')}
            className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#a8882f] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <FilePlus className="w-4 h-4" /> New Document
          </button>
        </div>

        {/* ── Search + Filters ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or client name…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter group */}
            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
              <FilterSelect value={statusF}   onChange={setStatusF}   options={STATUS_OPTIONS} />
              <FilterSelect value={dateF}     onChange={setDateF}     options={DATE_OPTIONS} />
              <FilterSelect value={categoryF} onChange={setCategoryF} options={CATEGORY_OPTIONS} />
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 border border-red-200 hover:border-red-300 px-3 py-2 rounded-lg transition-colors"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile card list (sm:hidden) ── */}
        <div className="sm:hidden space-y-3">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3 animate-pulse">
                <div className="flex justify-between"><div className="h-4 bg-gray-200 rounded w-2/3"/><div className="h-5 bg-gray-200 rounded-full w-16"/></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"/>
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-gray-200 rounded w-20"/>
                  <div className="flex gap-1">{[1,2,3,4].map(j=><div key={j} className="w-7 h-7 bg-gray-200 rounded-lg"/>)}</div>
                </div>
              </div>
            ))
          ) : pageDocs.length === 0 ? (
            <EmptyState hasFilters={hasFilters} onClear={clearFilters} onNew={() => navigate('/templates')} />
          ) : (
            pageDocs.map(doc => (
              <MobileDocCard
                key={doc.id}
                doc={doc}
                onEdit={() => navigate(`/editor/${doc.id}`)}
                onDuplicate={() => handleDuplicate(doc)}
                onDownload={() => handleDownloadPDF(doc)}
                onDelete={() => handleDelete(doc)}
                duplicating={duplicating === doc.id}
                downloading={downloading === doc.id}
                deleting={deleting === doc.id}
              />
            ))
          )}
          {/* Mobile pagination */}
          {!loading && filtered.length > PAGE_SIZE && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-gray-400">{(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE,filtered.length)} of {filtered.length}</p>
              <div className="flex gap-1">
                <PaginationBtn disabled={page===1} onClick={()=>setPage(p=>p-1)} title="Prev"><ChevronLeft className="w-4 h-4"/></PaginationBtn>
                <PaginationBtn disabled={page===totalPages} onClick={()=>setPage(p=>p+1)} title="Next"><ChevronRight className="w-4 h-4"/></PaginationBtn>
              </div>
            </div>
          )}
        </div>

        {/* ── Desktop table (hidden on mobile) ── */}
        <div className="hidden sm:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <Th col="title"       label="Title" />
                  <Th col="template_id" label="Template"     hidden="hidden lg:table-cell" />
                  <Th col="client_name" label="Client"       hidden="hidden md:table-cell" />
                  <Th col="created_at"  label="Created"      hidden="hidden sm:table-cell" />
                  <Th col="updated_at"  label="Modified"     hidden="hidden sm:table-cell" />
                  <Th col="status"      label="Status" />
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <><RowSkeleton /><RowSkeleton /><RowSkeleton /><RowSkeleton /><RowSkeleton /></>
                ) : pageDocs.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <EmptyState hasFilters={hasFilters} onClear={clearFilters} onNew={() => navigate('/templates')} />
                    </td>
                  </tr>
                ) : (
                  pageDocs.map(doc => (
                    <tr key={doc.id} className="hover:bg-gray-50/60 transition-colors group">

                      {/* Title */}
                      <td className="px-4 py-3.5 max-w-[200px]">
                        <button
                          onClick={() => navigate(`/editor/${doc.id}`)}
                          className="text-sm font-semibold text-[#1e3a5f] hover:text-[#2a5298] text-left truncate block w-full transition-colors"
                        >
                          {doc.title || 'Untitled'}
                        </button>
                      </td>

                      {/* Template */}
                      <td className="px-4 py-3.5 hidden lg:table-cell max-w-[160px]">
                        <span className="text-xs text-gray-500 truncate block">
                          {doc.template_id ? templateName(doc.template_id) : <span className="text-gray-300 italic">Blank</span>}
                        </span>
                      </td>

                      {/* Client */}
                      <td className="px-4 py-3.5 hidden md:table-cell max-w-[130px]">
                        <span className="text-xs text-gray-500 truncate block">
                          {doc.client_name || <span className="text-gray-300 italic">—</span>}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="px-4 py-3.5 hidden sm:table-cell whitespace-nowrap">
                        <span className="text-xs text-gray-400">
                          {doc.created_at ? format(new Date(doc.created_at), 'dd MMM yyyy') : '—'}
                        </span>
                      </td>

                      {/* Modified */}
                      <td className="px-4 py-3.5 hidden sm:table-cell whitespace-nowrap">
                        <span className="text-xs text-gray-400">
                          {doc.updated_at ? format(new Date(doc.updated_at), 'dd MMM yyyy') : '—'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <StatusBadge status={doc.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">

                          {/* Edit */}
                          <ActionBtn
                            title="Open in editor"
                            onClick={() => navigate(`/editor/${doc.id}`)}
                            className="hover:text-[#1e3a5f] hover:bg-[#1e3a5f]/8"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </ActionBtn>

                          {/* Duplicate */}
                          <ActionBtn
                            title="Duplicate document"
                            loading={duplicating === doc.id}
                            onClick={() => handleDuplicate(doc)}
                            className="hover:text-blue-600 hover:bg-blue-50"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </ActionBtn>

                          {/* Download PDF */}
                          <ActionBtn
                            title="Download as PDF"
                            loading={downloading === doc.id}
                            onClick={() => handleDownloadPDF(doc)}
                            className="hover:text-[#c9a84c] hover:bg-amber-50"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </ActionBtn>

                          {/* Delete */}
                          <ActionBtn
                            title="Delete document"
                            loading={deleting === doc.id}
                            onClick={() => handleDelete(doc)}
                            className="hover:text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </ActionBtn>

                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {!loading && filtered.length > PAGE_SIZE && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/40">
              <p className="text-xs text-gray-400">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <PaginationBtn
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  title="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </PaginationBtn>

                {/* Page number pills */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                  .reduce((acc, n, idx, arr) => {
                    if (idx > 0 && n - arr[idx - 1] > 1) acc.push('…')
                    acc.push(n)
                    return acc
                  }, [])
                  .map((n, i) =>
                    n === '…' ? (
                      <span key={`ellipsis-${i}`} className="px-1 text-gray-300 text-xs">…</span>
                    ) : (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                          n === page
                            ? 'bg-[#1e3a5f] text-white'
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {n}
                      </button>
                    )
                  )}

                <PaginationBtn
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  title="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </PaginationBtn>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ─── Action button ────────────────────────────────────────────────────────────

function ActionBtn({ children, onClick, title, className, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      title={title}
      className={`p-1.5 rounded-lg text-gray-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin block" />
      ) : children}
    </button>
  )
}

// ─── Pagination button ────────────────────────────────────────────────────────

function PaginationBtn({ children, onClick, disabled, title }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-[#1e3a5f] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  )
}

// ─── Mobile document card ─────────────────────────────────────────────────────

function MobileDocCard({ doc, onEdit, onDuplicate, onDownload, onDelete, duplicating, downloading, deleting }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <button
          onClick={onEdit}
          className="text-sm font-semibold text-[#1e3a5f] text-left leading-snug flex-1 min-w-0"
        >
          <span className="line-clamp-2">{doc.title || 'Untitled'}</span>
        </button>
        <StatusBadge status={doc.status} />
      </div>
      {doc.client_name && (
        <p className="text-xs text-gray-500 mb-1">
          <span className="text-gray-400">Client:</span> {doc.client_name}
        </p>
      )}
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-gray-400">
          {doc.updated_at ? format(new Date(doc.updated_at), 'dd MMM yyyy') : '—'}
        </p>
        <div className="flex items-center gap-1">
          <ActionBtn title="Edit" onClick={onEdit} className="hover:text-[#1e3a5f] hover:bg-gray-100">
            <Pencil className="w-3.5 h-3.5" />
          </ActionBtn>
          <ActionBtn title="Duplicate" loading={duplicating} onClick={onDuplicate} className="hover:text-blue-600 hover:bg-blue-50">
            <Copy className="w-3.5 h-3.5" />
          </ActionBtn>
          <ActionBtn title="Download PDF" loading={downloading} onClick={onDownload} className="hover:text-[#c9a84c] hover:bg-amber-50">
            <Download className="w-3.5 h-3.5" />
          </ActionBtn>
          <ActionBtn title="Delete" loading={deleting} onClick={onDelete} className="hover:text-red-500 hover:bg-red-50">
            <Trash2 className="w-3.5 h-3.5" />
          </ActionBtn>
        </div>
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ hasFilters, onClear, onNew }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <FileText className="w-8 h-8 text-gray-300" />
      </div>
      {hasFilters ? (
        <>
          <h3 className="text-base font-semibold text-gray-500 mb-1">No documents match your filters</h3>
          <p className="text-sm text-gray-400 mb-5">Try adjusting your search or filters.</p>
          <button
            onClick={onClear}
            className="text-sm font-semibold text-[#1e3a5f] border-2 border-[#1e3a5f]/20 hover:border-[#1e3a5f] px-5 py-2 rounded-xl transition-colors"
          >
            Clear all filters
          </button>
        </>
      ) : (
        <>
          <h3 className="text-base font-semibold text-gray-500 mb-1">No documents yet</h3>
          <p className="text-sm text-gray-400 mb-5">Start by creating a document from a template or from scratch.</p>
          <button
            onClick={onNew}
            className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#a8882f] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <FilePlus className="w-4 h-4" /> Create your first document
          </button>
        </>
      )}
    </div>
  )
}
