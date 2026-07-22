import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { supabase } from '../../lib/supabase'

export default function AddAdvocate() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', bar_council_number: '' })
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('create-advocate', {
        body: {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          bar_council_number: form.bar_council_number.trim() || null,
        }
      })
      if (error) throw error
      if (data?.error) throw new Error(data.error)
      toast.success('Advocate created!')
      setForm({ name: '', email: '', password: '', bar_council_number: '' })
    } catch (err) {
      toast.error(err.message || 'Failed to create advocate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <button onClick={() => navigate('/admin')} className="text-sm text-gray-400 hover:text-blue-900 mb-6 block">← Back</button>
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Add Advocate</h1>
        <form onSubmit={submit} className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-6 space-y-4">
          {[
            { label: 'Full Name', field: 'name', type: 'text', required: true, placeholder: 'e.g. Priya Sharma' },
            { label: 'Email', field: 'email', type: 'email', required: true, placeholder: 'priya@example.com' },
            { label: 'Bar Council Number (optional)', field: 'bar_council_number', type: 'text', required: false, placeholder: 'e.g. MH/1234/2020' },
          ].map(({ label, field, type, required, placeholder }) => (
            <div key={field}>
              <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">{label}</label>
              <input type={type} value={form[field]} onChange={set(field)} required={required} placeholder={placeholder} disabled={loading}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-900 transition-colors disabled:opacity-60" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} required placeholder="Min. 8 characters" disabled={loading}
                className="w-full px-4 py-3 pr-16 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-blue-900 transition-colors disabled:opacity-60" />
              <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-blue-900">
                {showPw ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-blue-900 text-white font-bold py-3.5 rounded-xl text-sm disabled:opacity-60">
            {loading ? 'Creating…' : 'Create Advocate Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
