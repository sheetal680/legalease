import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  UserCircle, Plus, X, Search, Phone, Mail,
  Briefcase, ChevronDown, ChevronUp, Loader2,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { usePageTitle } from '../hooks/usePageTitle'
import Footer from '../components/Footer'

// ─── Constants ────────────────────────────────────────────────────────────────

const REFERRAL_OPTIONS = ['Walk-in', 'Referral', 'Online', 'Existing Client', 'Other']

const EMPTY_FORM = {
  full_name: '',
  phone: '',
  email: '',
  address: '',
  date_of_birth: '',
  occupation: '',
  aadhar_number: '',
  pan_number: '',
  referral_source: '',
  notes: '',
}

const CASE_STATUS_COLORS = {
  Active:    'bg-green-50 text-green-700 border-green-200',
  Pending:   'bg-amber-50 text-amber-700 border-amber-200',
  Adjourned: 'bg-orange-50 text-orange-700 border-orange-200',
  Closed:    'bg-gray-100 text-gray-500 border-gray-200',
  Disposed:  'bg-blue-50 text-blue-700 border-blue-200',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function FieldError({ msg }) {
  if (!msg) return null
  return <p className="text-xs text-red-500 mt-1">{msg}</p>
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = 'w-full text-sm px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors'

// ─── Add Client Modal ─────────────────────────────────────────────────────────

function AddClientModal({ onClose, onAdded }) {
  const { user } = useAuth()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  function set(field, val) {
    setForm(prev => ({ ...prev, [field]: val }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.full_name.trim()) e.full_name = 'Full name is required'
    if (!form.phone.trim())     e.phone = 'Phone number is required'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSaving(true)
    try {
      const { error } = await supabase.from('clients').insert({
        firm_owner_id:   user.id,
        full_name:       form.full_name.trim(),
        phone:           form.phone.trim(),
        email:           form.email.trim() || null,
        address:         form.address.trim() || null,
        date_of_birth:   form.date_of_birth || null,
        occupation:      form.occupation.trim() || null,
        aadhar_number:   form.aadhar_number.trim() || null,
        pan_number:      form.pan_number.trim() || null,
        referral_source: form.referral_source || null,
        notes:           form.notes.trim() || null,
      })
      if (error) throw error
      toast.success('Client added successfully')
      onAdded()
      onClose()
    } catch (err) {
      toast.error(err.message || 'Failed to add client')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-base font-bold text-[#1e3a5f]">Add Client</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name" required>
              <input type="text" value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="Rajesh Kumar" className={inputCls} />
              <FieldError msg={errors.full_name} />
            </Field>
            <Field label="Phone" required>
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" className={inputCls} />
              <FieldError msg={errors.phone} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Email">
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="client@email.com" className={inputCls} />
            </Field>
            <Field label="Date of Birth">
              <input type="date" value={form.date_of_birth} onChange={e => set('date_of_birth', e.target.value)} className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Occupation">
              <input type="text" value={form.occupation} onChange={e => set('occupation', e.target.value)} placeholder="Business owner" className={inputCls} />
            </Field>
            <Field label="Referral Source">
              <select value={form.referral_source} onChange={e => set('referral_source', e.target.value)} className={`${inputCls} bg-white`}>
                <option value="">Select…</option>
                {REFERRAL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Aadhar Number">
              <input type="text" value={form.aadhar_number} onChange={e => set('aadhar_number', e.target.value)} placeholder="XXXX XXXX XXXX" maxLength={14} className={inputCls} />
            </Field>
            <Field label="PAN Number">
              <input type="text" value={form.pan_number} onChange={e => set('pan_number', e.target.value.toUpperCase())} placeholder="ABCDE1234F" maxLength={10} className={inputCls} />
            </Field>
          </div>

          <Field label="Address">
            <textarea rows={2} value={form.address} onChange={e => set('address', e.target.value)} placeholder="Full address" className={`${inputCls} resize-none`} />
          </Field>

          <Field label="Notes">
            <textarea rows={3} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Any additional notes…" className={`${inputCls} resize-none`} />
          </Field>

        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold text-gray-600 border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-[#c9a84c] hover:bg-[#a8882f] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl transition-colors">
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {saving ? 'Adding…' : 'Add Client'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Client Cases Panel ───────────────────────────────────────────────────────

function ClientCasesPanel({ client }) {
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('cases')
          .select('id, case_title, case_type, court_name, next_hearing_date, case_status')
          .eq('client_id', client.id)
          .order('created_at', { ascending: false })
        if (error) throw error
        setCases(data ?? [])
      } catch {
        toast.error('Could not load cases')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [client.id])

  if (loading) {
    return (
      <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
        {[1, 2].map(i => <div key={i} className="h-10 bg-gray-100 rounded-xl animate-pulse" />)}
      </div>
    )
  }

  if (cases.length === 0) {
    return (
      <div className="mt-4 pt-4 border-t border-gray-100 text-center py-4">
        <p className="text-xs text-gray-400">No cases linked to this client yet.</p>
      </div>
    )
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Cases</p>
      {cases.map(c => (
        <div key={c.id} className="flex items-center justify-between gap-2 p-2.5 bg-gray-50 rounded-xl">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#1e3a5f] truncate">{c.case_title}</p>
            <p className="text-xs text-gray-400 truncate">{c.case_type}{c.court_name ? ` · ${c.court_name}` : ''}</p>
          </div>
          <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border ${CASE_STATUS_COLORS[c.case_status] ?? 'bg-gray-100 text-gray-500 border-gray-200'}`}>
            {c.case_status}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Client Card ──────────────────────────────────────────────────────────────

function ClientCard({ client }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-[#1e3a5f] truncate">{client.full_name}</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
            <p className="flex items-center gap-1 text-xs text-gray-500">
              <Phone className="w-3 h-3 text-gray-400 shrink-0" />
              {client.phone}
            </p>
            {client.email && (
              <p className="flex items-center gap-1 text-xs text-gray-500">
                <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                <span className="truncate max-w-[160px]">{client.email}</span>
              </p>
            )}
            {client.occupation && (
              <p className="flex items-center gap-1 text-xs text-gray-500">
                <Briefcase className="w-3 h-3 text-gray-400 shrink-0" />
                {client.occupation}
              </p>
            )}
          </div>
        </div>

        {/* Toggle cases */}
        <button
          onClick={() => setExpanded(p => !p)}
          className="flex items-center gap-1 text-xs font-semibold text-[#1e3a5f] px-3 py-1.5 rounded-xl border border-[#1e3a5f]/20 hover:bg-[#1e3a5f]/5 transition-colors shrink-0"
        >
          Cases
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && <ClientCasesPanel client={client} />}
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded w-40" />
          <div className="h-3 bg-gray-100 rounded w-28" />
        </div>
        <div className="h-8 w-20 bg-gray-100 rounded-xl" />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClientsPage() {
  const { user } = useAuth()
  usePageTitle('Clients')

  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)

  const fetchClients = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('firm_owner_id', user.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      setClients(data ?? [])
    } catch {
      toast.error('Could not load clients')
    } finally {
      setLoading(false)
    }
  }, [user.id])

  useEffect(() => { fetchClients() }, [fetchClients])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return clients
    return clients.filter(c =>
      c.full_name.toLowerCase().includes(q) ||
      c.phone.includes(q)
    )
  }, [clients, query])

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">Clients</h1>
            <p className="text-sm text-gray-400 mt-1">
              {loading ? 'Loading…' : `${clients.length} client${clients.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#a8882f] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or phone…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors shadow-sm"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <UserCircle className="w-8 h-8 text-gray-300" />
            </div>
            {query ? (
              <>
                <h3 className="text-base font-semibold text-gray-500 mb-1">No clients match "{query}"</h3>
                <button onClick={() => setQuery('')} className="text-sm text-[#1e3a5f] font-semibold mt-2">Clear search</button>
              </>
            ) : (
              <>
                <h3 className="text-base font-semibold text-gray-500 mb-1">No clients yet</h3>
                <p className="text-sm text-gray-400">Add your first client to get started.</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(c => <ClientCard key={c.id} client={c} />)}
          </div>
        )}

      </div>
      <Footer />

      {showModal && (
        <AddClientModal onClose={() => setShowModal(false)} onAdded={fetchClients} />
      )}
    </div>
  )
}
