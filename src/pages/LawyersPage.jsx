import { useEffect, useState, useCallback } from 'react'
import { Users, Plus, X, Phone, BadgeCheck, Briefcase, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { usePageTitle } from '../hooks/usePageTitle'
import Footer from '../components/Footer'

// ─── Constants ────────────────────────────────────────────────────────────────

const DESIGNATIONS = [
  'Associate',
  'Senior Associate',
  'Partner',
  'Of Counsel',
  'Consultant',
]

const SPECIALIZATIONS = [
  'Criminal Law', 'Civil Law', 'Family Law', 'Property Law',
  'Corporate Law', 'Consumer Law', 'Labour Law', 'Taxation',
  'Constitutional Law', 'Intellectual Property', 'Arbitration', 'Other',
]

const COURTS = [
  'Supreme Court', 'High Court', 'District Court', 'Sessions Court',
  'Magistrate Court', 'Family Court', 'Consumer Forum', 'Labour Court',
  'RERA Tribunal', 'NGT',
]

const EMPTY_FORM = {
  full_name: '',
  phone: '',
  bar_council_number: '',
  designation: '',
  enrollment_number: '',
  email: '',
  specialization: [],
  courts: [],
  experience_years: '',
  address: '',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toggle(arr, val) {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LawyerCard({ lawyer }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      {/* Name + designation */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="text-base font-bold text-[#1e3a5f] leading-tight">{lawyer.full_name}</h3>
          <p className="text-sm text-gray-400 mt-0.5">{lawyer.designation}</p>
        </div>
        <div className="w-10 h-10 bg-[#1e3a5f]/8 rounded-xl flex items-center justify-center shrink-0">
          <Briefcase className="w-5 h-5 text-[#1e3a5f]" />
        </div>
      </div>

      {/* Bar council + phone */}
      <div className="space-y-1.5 mb-3">
        <p className="flex items-center gap-1.5 text-xs text-gray-500">
          <BadgeCheck className="w-3.5 h-3.5 text-[#c9a84c] shrink-0" />
          <span className="font-medium text-gray-700">{lawyer.bar_council_number}</span>
        </p>
        <p className="flex items-center gap-1.5 text-xs text-gray-500">
          <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          {lawyer.phone}
        </p>
      </div>

      {/* Specialization tags */}
      {lawyer.specialization?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {lawyer.specialization.slice(0, 3).map(s => (
            <span key={s} className="text-xs bg-[#1e3a5f]/8 text-[#1e3a5f] font-medium px-2 py-0.5 rounded-full">
              {s}
            </span>
          ))}
          {lawyer.specialization.length > 3 && (
            <span className="text-xs text-gray-400">+{lawyer.specialization.length - 3} more</span>
          )}
        </div>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <Users className="w-8 h-8 text-gray-300" />
      </div>
      <h3 className="text-base font-semibold text-gray-500 mb-1">No lawyers added yet</h3>
      <p className="text-sm text-gray-400">Add your first lawyer to get started.</p>
    </div>
  )
}

function FieldError({ msg }) {
  if (!msg) return null
  return <p className="text-xs text-red-500 mt-1">{msg}</p>
}

function CheckGroup({ label, options, selected, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#1e3a5f] mb-2">{label}</label>
      <div className="grid grid-cols-2 gap-1.5">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => onChange(toggle(selected, opt))}
              className="w-3.5 h-3.5 accent-[#1e3a5f]"
            />
            <span className="text-xs text-gray-700 group-hover:text-[#1e3a5f]">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

// ─── Add Lawyer Modal ─────────────────────────────────────────────────────────

function AddLawyerModal({ onClose, onAdded }) {
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
    if (!form.full_name.trim())         e.full_name = 'Full name is required'
    if (!form.phone.trim())             e.phone = 'Phone number is required'
    if (!form.bar_council_number.trim()) e.bar_council_number = 'Bar Council Number is required'
    if (!form.designation)              e.designation = 'Designation is required'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSaving(true)
    try {
      const { error } = await supabase.from('firm_lawyers').insert({
        firm_owner_id:      user.id,
        full_name:          form.full_name.trim(),
        phone:              form.phone.trim(),
        bar_council_number: form.bar_council_number.trim(),
        designation:        form.designation,
        enrollment_number:  form.enrollment_number.trim() || null,
        email:              form.email.trim() || null,
        specialization:     form.specialization.length ? form.specialization : null,
        courts:             form.courts.length ? form.courts : null,
        experience_years:   form.experience_years ? Number(form.experience_years) : null,
        address:            form.address.trim() || null,
      })
      if (error) throw error
      toast.success('Lawyer added successfully')
      onAdded()
      onClose()
    } catch (err) {
      toast.error(err.message || 'Failed to add lawyer')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-base font-bold text-[#1e3a5f]">Add Lawyer</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

          {/* Row: Full Name + Designation */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.full_name}
                onChange={e => set('full_name', e.target.value)}
                placeholder="Adv. Ravi Kumar"
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
              />
              <FieldError msg={errors.full_name} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">
                Designation <span className="text-red-500">*</span>
              </label>
              <select
                value={form.designation}
                onChange={e => set('designation', e.target.value)}
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors bg-white"
              >
                <option value="">Select…</option>
                {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <FieldError msg={errors.designation} />
            </div>
          </div>

          {/* Row: Phone + Bar Council */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
              />
              <FieldError msg={errors.phone} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">
                Bar Council No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.bar_council_number}
                onChange={e => set('bar_council_number', e.target.value)}
                placeholder="AP/1234/2020"
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
              />
              <FieldError msg={errors.bar_council_number} />
            </div>
          </div>

          {/* Row: Enrollment + Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">Enrollment Number</label>
              <input
                type="text"
                value={form.enrollment_number}
                onChange={e => set('enrollment_number', e.target.value)}
                placeholder="Optional"
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="lawyer@firm.com"
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
              />
            </div>
          </div>

          {/* Experience + Address */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">Years of Experience</label>
              <input
                type="number"
                min="0"
                max="60"
                value={form.experience_years}
                onChange={e => set('experience_years', e.target.value)}
                placeholder="e.g. 5"
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1e3a5f] mb-1.5">Office Address</label>
              <textarea
                rows={2}
                value={form.address}
                onChange={e => set('address', e.target.value)}
                placeholder="Optional"
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl outline-none resize-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
              />
            </div>
          </div>

          {/* Specialization */}
          <CheckGroup
            label="Specialization"
            options={SPECIALIZATIONS}
            selected={form.specialization}
            onChange={val => set('specialization', val)}
          />

          {/* Courts */}
          <CheckGroup
            label="Courts Practiced In"
            options={COURTS}
            selected={form.courts}
            onChange={val => set('courts', val)}
          />
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-gray-600 border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-[#c9a84c] hover:bg-[#a8882f] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
          >
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {saving ? 'Adding…' : 'Add Lawyer'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LawyersPage() {
  const { user } = useAuth()
  usePageTitle('My Lawyers')

  const [lawyers, setLawyers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const fetchLawyers = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('firm_lawyers')
        .select('*')
        .eq('firm_owner_id', user.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      setLawyers(data ?? [])
    } catch (err) {
      toast.error('Could not load lawyers')
    } finally {
      setLoading(false)
    }
  }, [user.id])

  useEffect(() => { fetchLawyers() }, [fetchLawyers])

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">My Lawyers</h1>
            <p className="text-sm text-gray-400 mt-1">
              {loading ? 'Loading…' : `${lawyers.length} lawyer${lawyers.length !== 1 ? 's' : ''} in your firm`}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#a8882f] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Lawyer
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
                <div className="flex justify-between mb-3">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32" />
                    <div className="h-3 bg-gray-100 rounded w-20" />
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-xl" />
                </div>
                <div className="space-y-2 mb-3">
                  <div className="h-3 bg-gray-100 rounded w-40" />
                  <div className="h-3 bg-gray-100 rounded w-28" />
                </div>
                <div className="flex gap-1.5">
                  <div className="h-5 bg-gray-100 rounded-full w-20" />
                  <div className="h-5 bg-gray-100 rounded-full w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : lawyers.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {lawyers.map(l => <LawyerCard key={l.id} lawyer={l} />)}
          </div>
        )}

      </div>

      <Footer />

      {showModal && (
        <AddLawyerModal
          onClose={() => setShowModal(false)}
          onAdded={fetchLawyers}
        />
      )}
    </div>
  )
}
