import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  Briefcase, Plus, X, Search, AlertCircle, Loader2,
  Info, ChevronDown,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { usePageTitle } from '../hooks/usePageTitle'
import Footer from '../components/Footer'

// ─── Constants ────────────────────────────────────────────────────────────────

const CASE_TYPES = [
  'Criminal', 'Civil', 'Family', 'Property',
  'Consumer', 'Corporate', 'Labour', 'Constitutional', 'Other',
]

const CASE_STATUSES = ['Active', 'Pending', 'Adjourned', 'Closed', 'Disposed']

const STATUS_STYLES = {
  Active:    'bg-green-50 text-green-700 border-green-200',
  Pending:   'bg-amber-50 text-amber-700 border-amber-200',
  Adjourned: 'bg-orange-50 text-orange-700 border-orange-200',
  Closed:    'bg-gray-100 text-gray-500 border-gray-200',
  Disposed:  'bg-blue-50 text-blue-700 border-blue-200',
}

const TYPE_STYLES = {
  Criminal:       'bg-red-50 text-red-700',
  Civil:          'bg-purple-50 text-purple-700',
  Family:         'bg-pink-50 text-pink-700',
  Property:       'bg-yellow-50 text-yellow-700',
  Consumer:       'bg-teal-50 text-teal-700',
  Corporate:      'bg-indigo-50 text-indigo-700',
  Labour:         'bg-lime-50 text-lime-700',
  Constitutional: 'bg-cyan-50 text-cyan-700',
  Other:          'bg-gray-100 text-gray-600',
}

const EMPTY_FORM = {
  case_title: '',
  case_type: '',
  cnr_number: '',
  client_id: '',
  assigned_lawyer_id: '',
  court_name: '',
  judge_name: '',
  filing_date: '',
  next_hearing_date: '',
  opposing_counsel: '',
  fir_number: '',
  police_station: '',
  case_status: 'Active',
  description: '',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isUrgent(dateStr) {
  if (!dateStr) return false
  const diff = (new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24)
  return diff >= 0 && diff <= 7
}

function fmtDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function FieldError({ msg }) {
  if (!msg) return null
  return <p className="text-xs text-red-500 mt-1">{msg}</p>
}

function Field({ label, required, tooltip, children }) {
  return (
    <div>
      <label className="flex items-center gap-1 text-xs font-semibold text-[#1e3a5f] mb-1.5">
        {label}
        {required && <span className="text-red-500">*</span>}
        {tooltip && (
          <span className="group relative inline-flex items-center">
            <Info className="w-3 h-3 text-gray-400 cursor-help" />
            <span className="pointer-events-none absolute left-5 top-0 z-10 w-52 rounded-lg bg-[#1e3a5f] text-white text-xs px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              {tooltip}
            </span>
          </span>
        )}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full text-sm px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors'

// ─── Searchable dropdown ──────────────────────────────────────────────────────

function SearchableSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const term = q.toLowerCase()
    return options.filter(o => o.label.toLowerCase().includes(term))
  }, [options, q])

  const selected = options.find(o => o.value === value)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(p => !p)}
        className={`${inputCls} flex items-center justify-between text-left ${!selected ? 'text-gray-400' : 'text-gray-800'}`}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => { setOpen(false); setQ('') }} />
          <div className="absolute z-30 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div className="p-2 border-b border-gray-100">
              <input
                autoFocus
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search…"
                className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-lg outline-none focus:border-[#1e3a5f]"
              />
            </div>
            <ul className="max-h-48 overflow-y-auto">
              {value && (
                <li>
                  <button type="button" onClick={() => { onChange(''); setOpen(false); setQ('') }}
                    className="w-full text-left text-xs px-3 py-2 text-gray-400 hover:bg-gray-50 italic">
                    Clear selection
                  </button>
                </li>
              )}
              {filtered.length === 0 ? (
                <li className="px-3 py-3 text-xs text-gray-400 text-center">No results</li>
              ) : filtered.map(o => (
                <li key={o.value}>
                  <button
                    type="button"
                    onClick={() => { onChange(o.value); setOpen(false); setQ('') }}
                    className={`w-full text-left text-sm px-3 py-2.5 transition-colors ${o.value === value ? 'bg-[#1e3a5f] text-white' : 'hover:bg-gray-50 text-gray-800'}`}
                  >
                    {o.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Add Case Modal ───────────────────────────────────────────────────────────

function AddCaseModal({ onClose, onAdded, clients, lawyers }) {
  const { user } = useAuth()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  function set(field, val) {
    setForm(prev => ({ ...prev, [field]: val }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const isCriminal = form.case_type === 'Criminal'

  const clientOptions = clients.map(c => ({ value: c.id, label: `${c.full_name} · ${c.phone}` }))

  const lawyerOptions = [
    { value: 'self', label: 'Self (You)' },
    ...lawyers.map(l => ({ value: l.id, label: `${l.full_name} · ${l.designation}` })),
  ]

  function validate() {
    const e = {}
    if (!form.case_title.trim()) e.case_title = 'Case title is required'
    if (!form.case_type)         e.case_type = 'Case type is required'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSaving(true)
    try {
      const { error } = await supabase.from('cases').insert({
        firm_owner_id:      user.id,
        case_title:         form.case_title.trim(),
        case_type:          form.case_type,
        cnr_number:         form.cnr_number.trim() || null,
        client_id:          form.client_id || null,
        assigned_lawyer_id: (form.assigned_lawyer_id && form.assigned_lawyer_id !== 'self') ? form.assigned_lawyer_id : null,
        court_name:         form.court_name.trim() || null,
        judge_name:         form.judge_name.trim() || null,
        filing_date:        form.filing_date || null,
        next_hearing_date:  form.next_hearing_date || null,
        opposing_counsel:   form.opposing_counsel.trim() || null,
        fir_number:         isCriminal ? (form.fir_number.trim() || null) : null,
        police_station:     isCriminal ? (form.police_station.trim() || null) : null,
        case_status:        form.case_status,
        description:        form.description.trim() || null,
      })
      if (error) throw error
      toast.success('Case added successfully')
      onAdded()
      onClose()
    } catch (err) {
      toast.error(err.message || 'Failed to add case')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-base font-bold text-[#1e3a5f]">Add Case</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

          {/* Case Title + Type */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Case Title" required>
              <input type="text" value={form.case_title} onChange={e => set('case_title', e.target.value)}
                placeholder="e.g. State vs. Ravi Kumar" className={inputCls} />
              <FieldError msg={errors.case_title} />
            </Field>
            <Field label="Case Type" required>
              <select value={form.case_type} onChange={e => set('case_type', e.target.value)} className={`${inputCls} bg-white`}>
                <option value="">Select…</option>
                {CASE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <FieldError msg={errors.case_type} />
            </Field>
          </div>

          {/* CNR + Status */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="CNR Number" tooltip="Court Number Record — unique identifier assigned by the court">
              <input type="text" value={form.cnr_number} onChange={e => set('cnr_number', e.target.value)}
                placeholder="e.g. DLHC01-123456-2024" className={inputCls} />
            </Field>
            <Field label="Status">
              <select value={form.case_status} onChange={e => set('case_status', e.target.value)} className={`${inputCls} bg-white`}>
                {CASE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          {/* Client + Lawyer */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Client">
              <SearchableSelect
                value={form.client_id}
                onChange={val => set('client_id', val)}
                options={clientOptions}
                placeholder="Search client…"
              />
            </Field>
            <Field label="Assigned Lawyer">
              <SearchableSelect
                value={form.assigned_lawyer_id}
                onChange={val => set('assigned_lawyer_id', val)}
                options={lawyerOptions}
                placeholder="Select lawyer…"
              />
            </Field>
          </div>

          {/* Court + Judge */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Court Name">
              <input type="text" value={form.court_name} onChange={e => set('court_name', e.target.value)}
                placeholder="e.g. Delhi High Court" className={inputCls} />
            </Field>
            <Field label="Judge Name">
              <input type="text" value={form.judge_name} onChange={e => set('judge_name', e.target.value)}
                placeholder="Hon'ble Justice…" className={inputCls} />
            </Field>
          </div>

          {/* Filing + Hearing Dates */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Filing Date">
              <input type="date" value={form.filing_date} onChange={e => set('filing_date', e.target.value)} className={inputCls} />
            </Field>
            <Field label="Next Hearing Date">
              <input type="date" value={form.next_hearing_date} onChange={e => set('next_hearing_date', e.target.value)} className={inputCls} />
            </Field>
          </div>

          {/* Opposing Counsel */}
          <Field label="Opposing Counsel">
            <input type="text" value={form.opposing_counsel} onChange={e => set('opposing_counsel', e.target.value)}
              placeholder="Adv. Name / Firm" className={inputCls} />
          </Field>

          {/* Criminal-only fields */}
          {isCriminal && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-red-50/60 rounded-xl border border-red-100">
              <Field label="FIR Number">
                <input type="text" value={form.fir_number} onChange={e => set('fir_number', e.target.value)}
                  placeholder="FIR No." className={inputCls} />
              </Field>
              <Field label="Police Station">
                <input type="text" value={form.police_station} onChange={e => set('police_station', e.target.value)}
                  placeholder="Police station name" className={inputCls} />
              </Field>
            </div>
          )}

          {/* Description */}
          <Field label="Description">
            <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)}
              placeholder="Brief facts of the case…" className={`${inputCls} resize-none`} />
          </Field>

        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold text-gray-600 border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving}
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-[#c9a84c] hover:bg-[#a8882f] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl transition-colors">
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {saving ? 'Adding…' : 'Add Case'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Case Card ────────────────────────────────────────────────────────────────

function CaseCard({ cas }) {
  const urgent = isUrgent(cas.next_hearing_date)

  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition-shadow ${urgent ? 'border-red-300' : 'border-gray-100'}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-[#1e3a5f] leading-tight truncate">{cas.case_title}</h3>
          {cas.client_name && (
            <p className="text-xs text-gray-400 mt-0.5 truncate">Client: {cas.client_name}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_STYLES[cas.case_type] ?? 'bg-gray-100 text-gray-600'}`}>
            {cas.case_type}
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${STATUS_STYLES[cas.case_status] ?? 'bg-gray-100 text-gray-500 border-gray-200'}`}>
            {cas.case_status}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-500">
        {cas.court_name && (
          <span><span className="text-gray-400">Court:</span> {cas.court_name}</span>
        )}
        {cas.next_hearing_date && (
          <span className={`flex items-center gap-1 font-medium ${urgent ? 'text-red-600' : ''}`}>
            {urgent && <AlertCircle className="w-3 h-3" />}
            <span className="text-gray-400 font-normal">Next:</span> {fmtDate(cas.next_hearing_date)}
            {urgent && <span className="text-red-500 font-semibold">(Urgent)</span>}
          </span>
        )}
        {cas.assigned_lawyer_name && (
          <span><span className="text-gray-400">Lawyer:</span> {cas.assigned_lawyer_name}</span>
        )}
      </div>
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function CaseSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded w-48" />
          <div className="h-3 bg-gray-100 rounded w-28" />
        </div>
        <div className="flex gap-2">
          <div className="h-5 bg-gray-100 rounded-full w-16" />
          <div className="h-5 bg-gray-100 rounded-full w-14" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="h-3 bg-gray-100 rounded w-32" />
        <div className="h-3 bg-gray-100 rounded w-24" />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CasesPage() {
  const { user } = useAuth()
  usePageTitle('My Cases')

  const [cases, setCases]     = useState([])
  const [clients, setClients] = useState([])
  const [lawyers, setLawyers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  // Filters
  const [statusF, setStatusF]   = useState('all')
  const [typeF, setTypeF]       = useState('all')
  const [lawyerF, setLawyerF]   = useState('all')

  // Fetch all data
  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [casesRes, clientsRes, lawyersRes] = await Promise.all([
        supabase
          .from('cases')
          .select('*, clients(full_name), firm_lawyers(full_name, designation)')
          .eq('firm_owner_id', user.id)
          .order('created_at', { ascending: false }),
        supabase.from('clients').select('id, full_name, phone').eq('firm_owner_id', user.id).order('full_name'),
        supabase.from('firm_lawyers').select('id, full_name, designation').eq('firm_owner_id', user.id).order('full_name'),
      ])
      if (casesRes.error) throw casesRes.error
      if (clientsRes.error) throw clientsRes.error
      if (lawyersRes.error) throw lawyersRes.error

      // Flatten join fields
      const enriched = (casesRes.data ?? []).map(c => ({
        ...c,
        client_name:          c.clients?.full_name ?? null,
        assigned_lawyer_name: c.firm_lawyers?.full_name ?? null,
      }))
      setCases(enriched)
      setClients(clientsRes.data ?? [])
      setLawyers(lawyersRes.data ?? [])
    } catch {
      toast.error('Could not load cases')
    } finally {
      setLoading(false)
    }
  }, [user.id])

  useEffect(() => { fetchAll() }, [fetchAll])

  // Filtered cases
  const filtered = useMemo(() => {
    return cases.filter(c => {
      if (statusF !== 'all' && c.case_status !== statusF) return false
      if (typeF   !== 'all' && c.case_type   !== typeF)   return false
      if (lawyerF !== 'all') {
        if (lawyerF === 'self' && c.assigned_lawyer_id !== null) return false
        if (lawyerF !== 'self' && c.assigned_lawyer_id !== lawyerF) return false
      }
      return true
    })
  }, [cases, statusF, typeF, lawyerF])

  const hasFilters = statusF !== 'all' || typeF !== 'all' || lawyerF !== 'all'

  const lawyerFilterOptions = [
    { value: 'all',  label: 'All Lawyers' },
    { value: 'self', label: 'Self (You)' },
    ...lawyers.map(l => ({ value: l.id, label: l.full_name })),
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">My Cases</h1>
            <p className="text-sm text-gray-400 mt-1">
              {loading ? 'Loading…' : `${filtered.length} case${filtered.length !== 1 ? 's' : ''}${hasFilters ? ' matching filters' : ''}`}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#a8882f] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Case
          </button>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 mb-6 flex flex-wrap gap-3 items-center">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />

          <select value={statusF} onChange={e => setStatusF(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors appearance-none cursor-pointer">
            <option value="all">All Statuses</option>
            {CASE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select value={typeF} onChange={e => setTypeF(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors appearance-none cursor-pointer">
            <option value="all">All Case Types</option>
            {CASE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select value={lawyerF} onChange={e => setLawyerF(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors appearance-none cursor-pointer">
            {lawyerFilterOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {hasFilters && (
            <button
              onClick={() => { setStatusF('all'); setTypeF('all'); setLawyerF('all') }}
              className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 border border-red-200 hover:border-red-300 px-3 py-2 rounded-lg transition-colors"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        {/* Cases grid */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <CaseSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Briefcase className="w-8 h-8 text-gray-300" />
            </div>
            {hasFilters ? (
              <>
                <h3 className="text-base font-semibold text-gray-500 mb-1">No cases match your filters</h3>
                <button
                  onClick={() => { setStatusF('all'); setTypeF('all'); setLawyerF('all') }}
                  className="text-sm font-semibold text-[#1e3a5f] mt-3 border-2 border-[#1e3a5f]/20 hover:border-[#1e3a5f] px-5 py-2 rounded-xl transition-colors"
                >
                  Clear filters
                </button>
              </>
            ) : (
              <>
                <h3 className="text-base font-semibold text-gray-500 mb-1">No cases yet</h3>
                <p className="text-sm text-gray-400 mb-4">Add your first case to get started.</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#a8882f] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add your first case
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(c => <CaseCard key={c.id} cas={c} />)}
          </div>
        )}

      </div>
      <Footer />

      {showModal && (
        <AddCaseModal
          onClose={() => setShowModal(false)}
          onAdded={fetchAll}
          clients={clients}
          lawyers={lawyers}
        />
      )}
    </div>
  )
}
