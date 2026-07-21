import { useState } from 'react'
import toast from 'react-hot-toast'
import { PlusCircle, Loader2 } from 'lucide-react'
import AdvocateLayout from './AdvocateLayout'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { COURT_CITIES, COURT_DATA } from '../../data/courts'

const PARTY_TYPES = ['Plaintiff', 'Defendant', 'Petitioner', 'Respondent', 'Appellant', 'Applicant']

const EMPTY = {
  name: '',
  address: '',
  phone: '',
  email: '',
  case_number: '',
  party_type: '',
  court_place: '',
  court_name: '',
}

export default function AdvocateAddClient() {
  const { user } = useAuth()
  const [form, setForm]       = useState(EMPTY)
  const [loading, setLoading] = useState(false)

  function set(field) {
    return e => {
      const value = e.target.value
      setForm(prev => {
        const next = { ...prev, [field]: value }
        // Reset court name when city changes
        if (field === 'court_place') next.court_name = ''
        return next
      })
    }
  }

  const availableCourts = form.court_place ? (COURT_DATA[form.court_place] ?? []) : []

  async function handleSubmit(e) {
    e.preventDefault()
    const { name, address, phone, case_number, party_type, court_place, court_name } = form
    if (!name.trim()) { toast.error('Client name is required.'); return }
    if (!case_number.trim()) { toast.error('Case number is required.'); return }
    if (!party_type) { toast.error('Party type is required.'); return }
    if (!court_place) { toast.error('Court city is required.'); return }
    if (!court_name) { toast.error('Court name is required.'); return }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('advocate_clients')
        .insert({
          advocate_id:      user.id,
          name:             form.name.trim(),
          address:          form.address.trim() || null,
          phone:            form.phone.trim() || null,
          email:            form.email.trim() || null,
          case_number:      form.case_number.trim(),
          party_type:       form.party_type,
          court_place:      form.court_place,
          court_name:       form.court_name,
        })

      if (error) throw error

      toast.success('Client added successfully!')
      setForm(EMPTY)
    } catch (err) {
      toast.error(err.message || 'Failed to add client.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdvocateLayout>
      <div className="max-w-2xl">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center">
            <PlusCircle className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1e3a5f]">Add Client</h1>
            <p className="text-gray-400 text-sm">Enter client and case details for document preparation.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Personal Details */}
          <Section title="Client Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name *" type="text" placeholder="e.g. Arjun Mehta"
                value={form.name} onChange={set('name')} disabled={loading} required />
              <Field label="Phone" type="tel" placeholder="+91 98765 43210"
                value={form.phone} onChange={set('phone')} disabled={loading} />
            </div>
            <Field label="Email" type="email" placeholder="client@example.com"
              value={form.email} onChange={set('email')} disabled={loading} />
            <div>
              <label className="block text-xs font-bold text-[#1e3a5f] uppercase tracking-wider mb-1.5">
                Address
              </label>
              <textarea
                rows={2}
                value={form.address}
                onChange={set('address')}
                disabled={loading}
                placeholder="Street, city, state, PIN"
                className="w-full text-sm px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#1e3a5f] transition-colors placeholder-gray-400 disabled:opacity-60 resize-none"
              />
            </div>
          </Section>

          {/* Case Details */}
          <Section title="Case Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Case Number *" type="text" placeholder="e.g. CS/1234/2024"
                value={form.case_number} onChange={set('case_number')} disabled={loading} required />
              <div>
                <label className="block text-xs font-bold text-[#1e3a5f] uppercase tracking-wider mb-1.5">
                  Party Type *
                </label>
                <select
                  value={form.party_type}
                  onChange={set('party_type')}
                  disabled={loading}
                  required
                  className="w-full text-sm px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#1e3a5f] transition-colors disabled:opacity-60 bg-white"
                >
                  <option value="">Select party type…</option>
                  {PARTY_TYPES.map(pt => (
                    <option key={pt} value={pt}>{pt}</option>
                  ))}
                </select>
              </div>
            </div>
          </Section>

          {/* Court Details */}
          <Section title="Court Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1e3a5f] uppercase tracking-wider mb-1.5">
                  Court City *
                </label>
                <select
                  value={form.court_place}
                  onChange={set('court_place')}
                  disabled={loading}
                  required
                  className="w-full text-sm px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#1e3a5f] transition-colors disabled:opacity-60 bg-white"
                >
                  <option value="">Select city…</option>
                  {COURT_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1e3a5f] uppercase tracking-wider mb-1.5">
                  Court Name *
                </label>
                <select
                  value={form.court_name}
                  onChange={set('court_name')}
                  disabled={loading || !form.court_place}
                  required
                  className="w-full text-sm px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#1e3a5f] transition-colors disabled:opacity-60 disabled:bg-gray-50 bg-white"
                >
                  <option value="">
                    {form.court_place ? 'Select court…' : 'Select city first'}
                  </option>
                  {availableCourts.map(court => (
                    <option key={court} value={court}>{court}</option>
                  ))}
                </select>
              </div>
            </div>
          </Section>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#142840] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
            {loading ? 'Saving…' : 'Add Client'}
          </button>
        </form>
      </div>
    </AdvocateLayout>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
      <h2 className="text-xs font-bold text-[#1e3a5f] uppercase tracking-widest">{title}</h2>
      {children}
    </div>
  )
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#1e3a5f] uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        {...props}
        className="w-full text-sm px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#1e3a5f] transition-colors placeholder-gray-400 disabled:opacity-60 disabled:bg-gray-50"
      />
    </div>
  )
}
