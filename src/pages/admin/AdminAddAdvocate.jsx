import { useState } from 'react'
import toast from 'react-hot-toast'
import { UserPlus, Loader2, Eye, EyeOff } from 'lucide-react'
import AdminLayout from './AdminLayout'
import { supabase } from '../../lib/supabase'

const EMPTY = { name: '', bar_council_number: '', email: '', password: '' }

export default function AdminAddAdvocate() {
  const [form, setForm]           = useState(EMPTY)
  const [loading, setLoading]     = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function set(field) {
    return e => setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const { name, bar_council_number, email, password } = form

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error('Name, email and password are required.')
      return
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('create-advocate', {
        body: {
          name:               name.trim(),
          bar_council_number: bar_council_number.trim() || null,
          email:              email.trim().toLowerCase(),
          password,
        },
      })

      if (error) throw error
      if (data?.error) throw new Error(data.error)

      toast.success('Advocate account created successfully!')
      setForm(EMPTY)
    } catch (err) {
      toast.error(err.message || 'Failed to create advocate.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-lg">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1e3a5f]">Add Advocate</h1>
            <p className="text-gray-400 text-sm">
              Creates a login account for the advocate on the platform.
            </p>
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
            placeholder="e.g. Priya Sharma"
            value={form.name}
            onChange={set('name')}
            disabled={loading}
            required
          />
          <Field
            label="Bar Council Number"
            type="text"
            placeholder="e.g. MH/1234/2020 (optional)"
            value={form.bar_council_number}
            onChange={set('bar_council_number')}
            disabled={loading}
          />
          <Field
            label="Email Address"
            type="email"
            placeholder="e.g. priya@example.com"
            value={form.email}
            onChange={set('email')}
            disabled={loading}
            required
            autoComplete="off"
          />

          {/* Password field with show/hide toggle */}
          <div>
            <label className="block text-xs font-bold text-[#1e3a5f] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={set('password')}
                disabled={loading}
                required
                autoComplete="new-password"
                className="w-full text-sm px-4 py-3 pr-11 border-2 border-gray-200 rounded-xl outline-none focus:border-[#1e3a5f] transition-colors placeholder-gray-400 disabled:opacity-60 disabled:bg-gray-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1e3a5f] transition-colors"
              >
                {showPassword
                  ? <EyeOff className="w-4 h-4" />
                  : <Eye className="w-4 h-4" />
                }
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#142840] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-xl transition-colors mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            {loading ? 'Creating Account…' : 'Create Advocate Account'}
          </button>
        </form>

      </div>
    </AdminLayout>
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
