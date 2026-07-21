import { useState } from 'react'
import toast from 'react-hot-toast'
import { UserCheck, Loader2 } from 'lucide-react'
import AdvocateLayout from './AdvocateLayout'
import { supabase } from '../../lib/supabase'

const EMPTY = { name: '', bar_council_number: '' }

export default function AdvocateAddAssociate() {
  const [form, setForm]       = useState(EMPTY)
  const [loading, setLoading] = useState(false)

  function set(field) {
    return e => setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { name, bar_council_number } = form
    if (!name.trim() || !bar_council_number.trim()) {
      toast.error('Both fields are required.')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('associates')
        .insert({ name: name.trim(), bar_council_number: bar_council_number.trim() })

      if (error) throw error

      toast.success('Associate added successfully!')
      setForm(EMPTY)
    } catch (err) {
      toast.error(err.message || 'Failed to add associate.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdvocateLayout>
      <div className="max-w-lg">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1e3a5f]">Add Associate</h1>
            <p className="text-gray-400 text-sm">Register an associate advocate to use in documents.</p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm space-y-5"
        >
          <Field
            label="Full Name"
            type="text"
            placeholder="e.g. Ravi Kumar"
            value={form.name}
            onChange={set('name')}
            disabled={loading}
            required
          />
          <Field
            label="Bar Council Number"
            type="text"
            placeholder="e.g. AP/2345/2021"
            value={form.bar_council_number}
            onChange={set('bar_council_number')}
            disabled={loading}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#142840] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-xl transition-colors mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserCheck className="w-4 h-4" />}
            {loading ? 'Adding…' : 'Add Associate'}
          </button>
        </form>
      </div>
    </AdvocateLayout>
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
